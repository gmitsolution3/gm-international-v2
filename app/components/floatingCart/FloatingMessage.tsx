"use client";

import { useState } from "react";
import { LiveChat } from "../messanging/LiveChatMain";
import { QueryTab } from "../queryTab/QueryTabMain";

export default function FloatingMessageUpdate() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"query" | "chat">("query");

  return (
    <div className="fixed bottom-6 right-6 z-50 inline-flex flex-col items-end font-sans pointer-events-none">
      <div
        className={`mb-4 w-80 md:w-130 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out transform origin-bottom-right ${
          isOpen
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-75 opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        {/* Header with Gradient */}
        <div className="bg-linear-to-r from-gray-900 via-red-950 to-red-900 p-4 flex justify-between items-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-black/20 to-transparent" />
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
            <div className="pointer-events-auto">
              <h3 className="font-semibold text-sm">
                GM International Support
              </h3>
              <p className="text-xs text-gray-300">Get our support instantly</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors relative z-10 pointer-events-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button
            onClick={() => setActiveTab("query")}
            className={`flex-1 py-3 text-sm font-medium transition-all duration-200 pointer-events-auto ${
              activeTab === "query"
                ? "text-red-700 bg-white border-b-2 border-red-600"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 inline-block mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            Query
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex-1 py-3 text-sm font-medium transition-all duration-200 pointer-events-auto ${
              activeTab === "chat"
                ? "text-red-700 bg-white border-b-2 border-red-600"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 inline-block mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25S3 16.556 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
              />
            </svg>
            Live Chat
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 h-120 bg-gray-50 overflow-hidden pointer-events-auto">
          {activeTab === "query" ? <QueryTab /> : <LiveChat />}
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center  gap-2 bg-linear-to-r from-gray-900 via-red-950 to-red-900 hover:from-gray-800 hover:via-red-900 hover:to-red-800 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 group pointer-events-auto ${
          isOpen ? "rotate-90" : ""
        }`}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 animate-bounce"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25S3 16.556 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
              />
            </svg>
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out font-medium text-sm whitespace-nowrap">
              Chat with us
            </span>
          </>
        )}
      </button>
    </div>
  );
}
