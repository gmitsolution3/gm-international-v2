import { useSession } from "next-auth/react";
import { useEffect, useRef, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8080";

interface Message {
  _id?: string;
  chatId?: string;
  senderId: string;
  senderRole: "user" | "admin";
  text: string;
  time?: string;
  createdAt?: string;
}

interface ChatRequest {
  chatId: string;
  userId: string;
  userName?: string;
  phone?: string;
  message: string;
  createdAt: string;
}

interface PendingChat {
  _id: string;
  userId: {
    _id: string;
    name?: string;
    phone?: string;
    email?: string;
  };
  status: string;
  createdAt: string;
  lastMessage?: string;
}

const customRole = ["admin", "office_admin"];

// Business hours check
const isBusinessHours = () => {
  const now = new Date();
  const hours = now.getHours();
  const day = now.getDay(); // 0 = Sunday, 6 = Saturday

  // Friday (5 in JS) is weekend in Bangladesh
  if (day === 5) return false;

  // Business hours: 10 AM - 7 PM
  return hours >= 10 && hours < 19;
};

export const LiveChat = () => {
  const { data: session } = useSession();
  const user = session?.user as any;
  const userId = user?.id || "anonymous";
  const userRole = user?.userRole || "user";
  const isAdmin = customRole.includes(userRole);
  const adminEmail = isAdmin ? user?.email : "";
  const adminId = isAdmin ? user?.id : "";

  // State management
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [chatStatus, setChatStatus] = useState<
    "idle" | "waiting" | "active" | "closed"
  >("idle");
  const [pendingRequests, setPendingRequests] = useState<PendingChat[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [activeChats, setActiveChats] = useState<any[]>([]);
  const [showAcceptMessage, setShowAcceptMessage] = useState(false);
  const [showKnockForm, setShowKnockForm] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [onlineAdmins, setOnlineAdmins] = useState(false);
  const [unreadBadge, setUnreadBadge] = useState(0);

  const socketRef = useRef<Socket | null>(null);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Helper function to get current time
  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  // Request notification permission for admins
  useEffect(() => {
    if (isAdmin && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, [isAdmin]);

  // Socket connection and event handlers
  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
      query: {
        userId: userId,
        role: userRole,
        adminEmail: adminEmail,
        adminId: adminId,
      },
    });

    socketRef.current = socket;

    // Connection events
    socket.on("connect", () => {
      console.log("Connected to chat server:", socket.id);
      setIsConnected(true);

      // Reconnect handling
      if (isAdmin) {
        socket.emit("getActiveChats", { adminId });
        socket.on("pendingChats", (chats) => {
          console.log("PENDING RECEIVED", chats);
          setPendingRequests(chats);
        });
      }
      if (!isAdmin && userId) {
        socket.emit("checkExistingChat", { userId });
      }
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from chat server");
      setIsConnected(false);
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
      setIsConnected(false);
    });

    // Admin events
    if (isAdmin) {
      socket.on("newChatRequest", (data: ChatRequest) => {
        setPendingRequests((prev) => {
          // Avoid duplicates
          const exists = prev.find((req) => req._id === data.chatId);
          if (exists) return prev;
          return [
            ...prev,
            {
              _id: data.chatId,
              userId: {
                _id: data.userId,
                name: data.userName,
                phone: data.phone,
              },
              status: "pending",
              createdAt: data.createdAt,
            },
          ];
        });

        setUnreadBadge((prev) => prev + 1);

        if (Notification.permission === "granted") {
          new Notification("নতুন চ্যাট রিকোয়েস্ট", {
            body: `${data.userName || "একজন ইউজার"} সাহায্য চাচ্ছে`,
            icon: "/favicon.ico",
          });
        }
      });

      socket.on("pendingChats", (chats: PendingChat[]) => {
        setPendingRequests(chats);
        setUnreadBadge(chats.length);
      });

      socket.on("chatTaken", (data: { chatId: string; adminId: string }) => {
        setPendingRequests((prev) =>
          prev.filter((req) => req._id !== data.chatId),
        );
        setUnreadBadge((prev) => Math.max(0, prev - 1));
      });

      socket.on("activeChats", (chats: any[]) => {
        setActiveChats(chats);
      });

      socket.on("adminNotification", (data) => {
        setUnreadBadge((prev) => prev + 1);

        if (Notification.permission === "granted") {
          new Notification(data.title, {
            body: data.body,
          });
        }

        socket.emit("getActiveChats", { adminId });
      });
    }

    // User events
    if (!isAdmin) {
      socket.on("chatAccepted", (data: { chatId: string; adminId: string }) => {
        setChatId(data.chatId);
        setChatStatus("active");
        setShowAcceptMessage(true);

        setTimeout(() => {
          setShowAcceptMessage(false);
        }, 3000);

        socket.emit("loadChatHistory", { chatId: data.chatId });
      });

      socket.on("existingChat", (data: { chatId: string; status: string }) => {
        if (data.status === "accepted") {
          setChatId(data.chatId);
          setChatStatus("active");
          socket.emit("loadChatHistory", { chatId: data.chatId });
        } else if (data.status === "pending") {
          setChatId(data.chatId);
          setChatStatus("waiting");
          setMessages([
            {
              senderId: "system",
              senderRole: "admin",
              text: "একজন এডমিনের জন্য অপেক্ষা করা হচ্ছে...",
              time: getCurrentTime(),
            },
          ]);
        }
      });
    }

    // Message receiving (common for both)
    socket.on("receiveMessage", (message: Message) => {
      setMessages((prev) => {
        // Check if message already exists (prevent duplicates)
        const messageExists = prev.some(
          (msg) =>
            msg.text === message.text &&
            msg.senderId === message.senderId &&
            msg.time === message.time,
        );

        if (messageExists) {
          return prev;
        }

        return [
          ...prev,
          {
            ...message,
            time: message.time || getCurrentTime(),
          },
        ];
      });
    });

    // Chat history loaded
    socket.on(
      "chatHistory",
      (data: { chatId: string; messages: Message[] }) => {
        setMessages(
          data.messages.map((msg) => ({
            ...msg,
            time:
              msg.time ||
              new Date(msg.createdAt || Date.now()).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }),
          })),
        );
      },
    );

    // Typing indicator
    socket.on(
      "userTyping",
      (data: { userId: string; userName?: string; isTyping: boolean }) => {
        if (data.userId !== userId) {
          setIsTyping(data.isTyping);
        }
      },
    );

    return () => {
      socket.disconnect();
    };
  }, [userId, userRole, isAdmin, adminId]);

  // Cleanup typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  // Auto scroll to bottom when messages or typing status changes
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when chat becomes active
  useEffect(() => {
    if (chatStatus === "active") {
      inputRef.current?.focus();
    }
  }, [chatStatus]);

  // Check if any admin is online periodically
  useEffect(() => {
    if (!isAdmin) {
      const checkAdminStatus = () => {
        // This is a simple check - you could enhance it
        setOnlineAdmins(isBusinessHours());
      };

      checkAdminStatus();
      const interval = setInterval(checkAdminStatus, 30000); // Check every 30 seconds

      return () => clearInterval(interval);
    }
  }, [isAdmin]);

  // User knocks to start chat
  const handleUserKnock = () => {
    if (!socketRef.current || !userId) return;

    if (!userName.trim() || !userPhone.trim()) {
      alert("অনুগ্রহ করে আপনার নাম এবং ফোন নম্বর দিন");
      return;
    }

    socketRef.current.emit("userKnock", {
      userId,
      userName: userName.trim(),
      phone: userPhone.trim(),
    });

    setShowKnockForm(false);
    setChatStatus("waiting");
    setMessages([
      {
        senderId: "system",
        senderRole: "admin",
        text: "একজন এডমিনের জন্য অপেক্ষা করা হচ্ছে...",
        time: getCurrentTime(),
      },
    ]);
  };

  // Admin accepts a chat request
  const handleAcceptChat = (chatId: string) => {
    if (!socketRef.current || !adminId) return;

    socketRef.current.emit("adminAcceptChat", { chatId, adminId });
    setChatId(chatId);
    setChatStatus("active");

    // Remove from pending
    setPendingRequests((prev) => prev.filter((req) => req._id !== chatId));
    setUnreadBadge((prev) => Math.max(0, prev - 1));

    socketRef.current.emit("loadChatHistory", { chatId });
  };

  // Handle typing indicator
  const handleTyping = useCallback(() => {
    if (!socketRef.current || !chatId) return;

    socketRef.current.emit("typing", {
      chatId,
      userId: isAdmin ? adminId : userId,
      userName: user?.name || (isAdmin ? "Admin" : "User"),
      isTyping: true,
    });

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(() => {
      if (socketRef.current) {
        socketRef.current.emit("typing", {
          chatId,
          userId: isAdmin ? adminId : userId,
          isTyping: false,
        });
      }
    }, 2000);

    setTypingTimeout(timeout);
  }, [socketRef, chatId, isAdmin, adminId, userId, user, typingTimeout]);

  // Send message
  const handleSendMessage = () => {
    if (!messageInput.trim() || !socketRef.current || !chatId) return;

    const messageData = {
      chatId,
      senderId: isAdmin ? adminId : userId,
      senderRole: isAdmin ? "admin" : "user",
      text: messageInput.trim(),
    };

    socketRef.current.emit("sendMessage", messageData);
    setMessageInput("");

    // Stop typing indicator
    if (socketRef.current) {
      socketRef.current.emit("typing", {
        chatId,
        userId: isAdmin ? adminId : userId,
        isTyping: false,
      });
    }

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Typing Animation Component
  const TypingIndicator = () => (
    <div className="flex items-start mb-3 ml-2">
      <div className="bg-gray-100 rounded-2xl rounded-tl-none px-3 py-2 flex items-center space-x-1 shadow-sm">
        <div
          className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        ></div>
        <div
          className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        ></div>
        <div
          className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        ></div>
      </div>
      <span className="text-[10px] text-gray-400 ml-1.5 self-end mb-0.5">
        typing...
      </span>
    </div>
  );

  // Admin Interface
  if (isAdmin) {
    return (
      <div className="flex flex-col h-full bg-gray-50 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="px-3 py-2 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div
                className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"} animate-pulse`}
              />
              <h3 className="font-medium text-sm text-gray-800">
                {isConnected ? "Live Chat" : "Connecting..."}
              </h3>
              {/* Pending badge */}
              {pendingRequests.length > 0 && chatStatus !== "active" && (
                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold animate-pulse">
                  {pendingRequests.length}
                </span>
              )}
            </div>
            {chatStatus === "active" && chatId && (
              <button
                onClick={() => {
                  setChatId(null);
                  setChatStatus("idle");
                  setMessages([]);
                  socketRef.current?.emit("getActiveChats", { adminId });
                }}
                className="text-xs text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Lists Container */}
          {!chatId && (
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {/* Pending Requests - Show FIRST */}
              {pendingRequests.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
                    Pending Requests ({pendingRequests.length})
                  </h3>
                  {pendingRequests.map((request) => (
                    <div
                      key={request._id}
                      className="bg-red-50 p-3 rounded-lg border border-red-200 animate-fadeIn hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {request.userId?.name || "Anonymous User"}
                          </p>
                          {request.userId?.phone && (
                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                              </svg>
                              {request.userId.phone}
                            </p>
                          )}
                          <p className="text-[10px] text-gray-400 mt-1">
                            {new Date(request.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleAcceptChat(request._id)}
                          className="bg-green-500 text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-green-600 transition-all hover:shadow-md active:scale-95"
                        >
                          Accept
                        </button>
                      </div>
                      {request.lastMessage && (
                        <p className="text-xs text-gray-600 bg-white/50 p-1.5 rounded">
                          {request.lastMessage}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Active Chats List */}
              {activeChats.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Active Chats ({activeChats.length})
                  </h3>
                  {activeChats.map((chat) => (
                    <button
                      key={chat._id}
                      onClick={() => {
                        setChatId(chat._id);
                        setChatStatus("active");
                        socketRef.current?.emit("loadChatHistory", {
                          chatId: chat._id,
                        });
                      }}
                      className="w-full text-left p-3 bg-white hover:bg-blue-50 rounded-lg border border-gray-200 transition-all hover:shadow-sm"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-800">
                          {chat.userId?.name || "User"}:{" "}
                          {chat.userId?.phone || ""}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {new Date(
                            chat.updatedAt || chat.lastMessageAt,
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      {chat.lastMessage && (
                        <p className="text-xs text-gray-500 mt-1 truncate">
                          {chat.lastMessage}
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* No chats state */}
              {!activeChats.length && pendingRequests.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 py-8">
                  <svg
                    className="w-10 h-10 text-gray-300 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <p className="text-sm">No active chats or requests</p>
                </div>
              )}
            </div>
          )}

          {/* Active Chat Messages */}
          {chatStatus === "active" && chatId && (
            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${msg.senderRole === "admin" ? "items-end" : "items-start"} animate-fadeIn`}
                >
                  <span className="text-[10px] text-gray-400 mb-0.5 px-1">
                    {msg.senderRole === "admin" ? "You" : "User"}
                  </span>
                  <div
                    className={`px-3 py-2 rounded-xl max-w-[85%] shadow-sm text-xs ${
                      msg.senderRole === "admin"
                        ? "bg-linear-to-r from-gray-900 via-red-950 to-red-900 text-white rounded-tr-md"
                        : "bg-white text-gray-800 border border-gray-200 rounded-tl-md"
                    }`}
                    style={{
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                    }}
                  >
                    {msg.text}
                  </div>
                  {msg.time && (
                    <span className="text-[10px] text-gray-400 mt-0.5 px-1">
                      {msg.time}
                    </span>
                  )}
                </div>
              ))}

              {isTyping && <TypingIndicator />}
              <div ref={chatBottomRef} />
            </div>
          )}

          {/* Input Area for Active Chat */}
          {chatStatus === "active" && chatId && (
            <div className="p-2.5 bg-white border-t border-gray-200">
              <div className="flex items-end gap-1.5">
                <div className="flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={messageInput}
                    onChange={(e) => {
                      setMessageInput(e.target.value);
                      handleTyping();
                    }}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-100 transition-all text-gray-800 placeholder-gray-400 bg-gray-50"
                    disabled={!isConnected}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!isConnected || !messageInput.trim()}
                  className="bg-linear-to-r from-gray-900 via-red-950 to-red-900 text-white p-2 rounded-lg transition-all duration-200 flex items-center justify-center hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // User Interface
  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2 bg-linear-to-r from-gray-900 via-red-950 to-red-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div
              className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-400" : "bg-red-400"} animate-pulse`}
            />
            <h3 className="font-medium text-white text-sm">
              {isConnected ? "Live Support" : "Connecting..."}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {!isBusinessHours() && (
              <span className="text-[10px] text-yellow-300 bg-yellow-900/50 px-2 py-0.5 rounded-full">
                Off Hours
              </span>
            )}
            <span className="text-[10px] text-gray-300">
              {chatStatus === "active"
                ? "Online"
                : chatStatus === "waiting"
                  ? "Waiting..."
                  : isBusinessHours()
                    ? "Available"
                    : "Unavailable"}
            </span>
          </div>
        </div>
      </div>

      {/* Business Hours / Hotline Info */}
      {chatStatus === "idle" && (
        <div className="px-3 py-2 space-y-2">
          {/* Business Hours Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5 text-xs">
            <div className="flex items-start gap-2">
              <svg
                className="w-4 h-4 text-blue-500 shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="font-medium text-blue-800">আমাদের সাপোর্ট সময়</p>
                <p className="text-blue-600 mt-0.5">
                  সকাল ১০টা - সন্ধ্যা ৭টা (শুক্রবার বন্ধ)
                </p>
                {!isBusinessHours() && (
                  <p className="text-yellow-600 mt-1 font-medium">
                    এখন আমাদের সাপোর্ট বন্ধ আছে। অনুগ্রহ করে সাপোর্ট সময়ের
                    মধ্যে যোগাযোগ করুন।
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Hotline Number */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-2.5 text-xs">
            <div className="flex items-start gap-2">
              <svg
                className="w-4 h-4 text-green-500 shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <div>
                <p className="font-medium text-green-800">
                  জরুরী প্রয়োজনে কল করুন
                </p>
                <a
                  href="tel:01896042360"
                  className="text-green-600 font-bold text-sm hover:text-green-700 transition-colors mt-0.5 inline-block"
                >
                  01896-042360
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Accept Message */}
      {showAcceptMessage && (
        <div className="mx-3 mt-2 bg-green-50 border border-green-200 text-green-700 px-3 py-1.5 rounded-lg text-xs animate-fadeIn flex items-center gap-1.5">
          <svg
            className="w-3.5 h-3.5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>অ্যাডমিন আপনার চ্যাট রিকোয়েস্ট গ্রহণ করেছে!</span>
        </div>
      )}

      {/* Chat Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {(chatStatus === "active" || chatStatus === "waiting") && (
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${msg.senderRole === "user" ? "items-end" : "items-start"} animate-fadeIn`}
              >
                <span className="text-[10px] text-gray-400 mb-0.5 px-1">
                  {msg.senderRole === "user" ? "You" : "Support"}
                </span>
                <div
                  className={`px-3 py-2 rounded-xl max-w-[85%] shadow-sm text-xs ${
                    msg.senderRole === "user"
                      ? "bg-linear-to-r from-gray-900 via-red-950 to-red-900 text-white rounded-tr-md"
                      : "bg-gray-100 text-gray-800 rounded-tl-md"
                  }`}
                  style={{
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {msg.text}
                </div>
                {msg.time && (
                  <span className="text-[10px] text-gray-400 mt-0.5 px-1">
                    {msg.time}
                  </span>
                )}
              </div>
            ))}

            {isTyping && <TypingIndicator />}
            <div ref={chatBottomRef} />
          </div>
        )}

        {/* Knock Form or Start Button */}
        {chatStatus === "idle" && (
          <div className="flex-1 flex items-center justify-center p-3">
            {!showKnockForm ? (
              <div className="text-center space-y-3">
                <button
                  onClick={() => setShowKnockForm(true)}
                  disabled={!isConnected}
                  className="bg-linear-to-r from-gray-900 via-red-950 to-red-900 text-white px-5 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Start Live Chat
                </button>
                {isBusinessHours() && (
                  <p className="text-[10px] text-green-600">
                    ● Support available now
                  </p>
                )}
              </div>
            ) : (
              <div className="w-full max-w-xs space-y-3">
                <h4 className="text-sm font-semibold text-gray-800 text-center">
                  আপনার তথ্য দিন
                </h4>
                <input
                  type="text"
                  placeholder="আপনার নাম"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-100"
                />
                <input
                  type="tel"
                  placeholder="ফোন নম্বর"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-100"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowKnockForm(false)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUserKnock}
                    disabled={
                      !isConnected || !userName.trim() || !userPhone.trim()
                    }
                    className="flex-1 bg-linear-to-r from-gray-900 via-red-950 to-red-900 text-white px-3 py-2 rounded-lg text-xs font-medium hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Start Chat
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Area */}
      {(chatStatus === "active" || chatStatus === "waiting") && (
        <div className="p-2.5 border-t border-gray-100 bg-white">
          <div className="flex items-end gap-1.5">
            <div className="flex-1">
              <input
                ref={inputRef}
                type="text"
                value={messageInput}
                onChange={(e) => {
                  setMessageInput(e.target.value);
                  handleTyping();
                }}
                onKeyDown={handleKeyPress}
                placeholder={
                  chatStatus === "waiting"
                    ? "Waiting for admin..."
                    : "Type your message..."
                }
                className={`w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-100 transition-all text-gray-800 placeholder-gray-400 ${
                  chatStatus === "waiting"
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-gray-50"
                }`}
                disabled={!isConnected || chatStatus === "waiting"}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={
                !isConnected || !messageInput.trim() || chatStatus === "waiting"
              }
              className="bg-linear-to-r from-gray-900 via-red-950 to-red-900 text-white p-2 rounded-lg transition-all duration-200 flex items-center justify-center hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
