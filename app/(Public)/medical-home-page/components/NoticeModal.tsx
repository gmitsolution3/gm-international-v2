"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X, ChevronDown, ChevronUp, Maximize2, Minimize2 } from "lucide-react";
import { useState } from "react";

export const NoticeModal = ({
  isOpen,
  setIsOpen,
  noticeData,
  loading,
}: any) => {
  // ✅ safe fallback
  const notices = noticeData || [];
  const [expandedAll, setExpandedAll] = useState(false);
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleNotice = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const toggleAllNotices = () => {
    if (expandedAll) {
      setOpenIndexes([]);
    } else {
      setOpenIndexes(notices.map((_: any, index: number) => index));
    }
    setExpandedAll(!expandedAll);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-2xl rounded-xl bg-white p-6 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10 pb-2 border-b border-gray-200">
            <DialogTitle className="text-xl font-bold text-red-600">
              {loading ? "Loading..." : "Notices"}
            </DialogTitle>

            <div className="flex items-center gap-2">
              {!loading && notices.length > 0 && (
                <button
                  onClick={toggleAllNotices}
                  className="text-xs text-gray-500 hover:text-red-600 transition-colors px-2 py-1 rounded-md hover:bg-gray-100 flex items-center gap-1"
                >
                  {expandedAll ? (
                    <>
                      <Minimize2 className="w-3 h-3" />
                      Collapse All
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-3 h-3" />
                      Expand All
                    </>
                  )}
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-gray-100 p-1 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4">
                  <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : notices.length > 0 ? (
            <div className="space-y-3">
              {notices.map((notice: any, index: number) => {
                const isOpen = openIndexes.includes(index);
                return (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md"
                  >
                    {/* Title Bar - Clickable */}
                    <button
                      onClick={() => toggleNotice(index)}
                      className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                    >
                      <div className="flex-1 pr-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {notice.title}
                        </h3>
                        {notice.createdAt && (
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(notice.createdAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="shrink-0">
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-gray-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-600" />
                        )}
                      </div>
                    </button>

                    {/* Collapsible Content */}
                    <div
                      className={`transition-all duration-300 ease-in-out ${
                        isOpen
                          ? "max-h-500 opacity-100"
                          : "max-h-0 opacity-0"
                      } overflow-hidden`}
                    >
                      <div className="p-4 pt-2">
                        <div
                          className="prose max-w-none text-gray-700"
                          dangerouslySetInnerHTML={{
                            __html: notice.description,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📢</div>
              <p className="text-gray-500">No notices available</p>
              <p className="text-sm text-gray-400 mt-1">
                Check back later for updates
              </p>
            </div>
          )}

          {/* Footer with notice count */}
          {!loading && notices.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-400 text-center">
                Total {notices.length} notice{notices.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
};