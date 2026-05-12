// components/ViewUmrahBookedSkeleton.tsx
"use client";

import React from "react";

// ─── Base Skeleton Pulse ───────────────────────────────────────────────────────

const Sk = ({
  className = "",
  rounded = "rounded-md",
}: {
  className?: string;
  rounded?: string;
}) => (
  <div
    className={`bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 bg-size-[400%_100%] animate-[shimmer_1.6s_ease-in-out_infinite] ${rounded} ${className}`}
  />
);

// ─── Reusable skeleton pieces ──────────────────────────────────────────────────

/** Mimics <InfoCard> */
const SkInfoCard = ({ className = "" }: { className?: string }) => (
  <div
    className={`flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100 ${className}`}
  >
    <Sk className="w-10 h-10 shrink-0" rounded="rounded-lg" />
    <div className="flex-1 space-y-2 pt-0.5">
      <Sk className="h-3 w-1/3" />
      <Sk className="h-4 w-2/3" />
    </div>
  </div>
);

/** Mimics <SectionHeader> */
const SkSectionHeader = ({
  subtitleWidth = "w-48",
}: {
  subtitleWidth?: string;
}) => (
  <div className="flex items-center gap-3 mb-4">
    <Sk className="w-12 h-12 shrink-0" rounded="rounded-xl" />
    <div className="space-y-2">
      <Sk className="h-5 w-40" />
      <Sk className={`h-3 ${subtitleWidth}`} />
    </div>
  </div>
);

/** Mimics <DocumentCard> */
const SkDocumentCard = () => (
  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
    <div className="p-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Sk className="w-4 h-4" rounded="rounded" />
        <Sk className="h-3.5 w-20" />
      </div>
      <Sk className="w-7 h-7" rounded="rounded-lg" />
    </div>
    <div className="p-2">
      <Sk className="w-full h-32" rounded="rounded-lg" />
    </div>
  </div>
);

/** Card wrapper */
const SkCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden ${className}`}
  >
    <div className="p-6">{children}</div>
  </div>
);

// ─── Main Skeleton ─────────────────────────────────────────────────────────────

const ViewUmrahBookedSkeleton: React.FC = () => {
  return (
    <>
      {/* Inject shimmer keyframe globally (once) */}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
      `}</style>

      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
        {/* ── Sticky Header ── */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              {/* back btn */}
              <Sk className="h-9 w-44" rounded="rounded-lg" />
              {/* action btns */}
              <div className="flex items-center gap-3">
                <Sk className="h-9 w-36 hidden sm:block" rounded="rounded-lg" />
                <Sk className="h-9 w-24" rounded="rounded-lg" />
                <Sk className="h-9 w-36" rounded="rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* ── Status Banner ── */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Sk className="w-16 h-16 shrink-0" rounded="rounded-full" />
                  <div className="space-y-2.5">
                    <Sk className="h-7 w-52" />
                    <div className="flex items-center gap-2">
                      <Sk className="h-6 w-24" rounded="rounded-full" />
                      <Sk className="h-6 w-16" rounded="rounded-full" />
                      <Sk className="h-4 w-32" rounded="rounded" />
                    </div>
                  </div>
                </div>
                <Sk className="h-4 w-28" rounded="rounded" />
              </div>
            </div>
          </div>

          {/* ── Main Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ── Left Column (2/3) ── */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <SkCard>
                <SkSectionHeader subtitleWidth="w-56" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <SkInfoCard
                      key={i}
                      className={i === 6 || i === 7 ? "" : ""}
                    />
                  ))}
                </div>
              </SkCard>

              {/* Contact Information */}
              <SkCard>
                <SkSectionHeader subtitleWidth="w-44" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <SkInfoCard key={i} />
                  ))}
                  <SkInfoCard className="sm:col-span-2" />
                </div>
              </SkCard>

              {/* Medical Information */}
              <SkCard>
                <SkSectionHeader subtitleWidth="w-52" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <SkInfoCard key={i} />
                  ))}
                  <SkInfoCard className="sm:col-span-2" />
                </div>
              </SkCard>

              {/* Travel Information */}
              <SkCard>
                <SkSectionHeader subtitleWidth="w-60" />
                {/* Package Banner */}
                <div className="bg-linear-to-r from-red-50 to-red-100 rounded-xl p-4 mb-4 flex justify-between">
                  <div className="space-y-2">
                    <Sk className="h-3.5 w-28" />
                    <Sk className="h-6 w-40" />
                  </div>
                  <div className="space-y-2 text-right">
                    <Sk className="h-3.5 w-24" />
                    <Sk className="h-8 w-32" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <SkInfoCard key={i} />
                  ))}
                </div>
                {/* Hotel cards */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200 space-y-2">
                    <div className="flex items-center gap-2">
                      <Sk className="w-5 h-5" rounded="rounded" />
                      <Sk className="h-4 w-28" />
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <Sk key={i} className="w-4 h-4" rounded="rounded" />
                      ))}
                    </div>
                    <Sk className="h-3.5 w-20" />
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 space-y-2">
                    <div className="flex items-center gap-2">
                      <Sk className="w-5 h-5" rounded="rounded" />
                      <Sk className="h-4 w-28" />
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <Sk key={i} className="w-4 h-4" rounded="rounded" />
                      ))}
                    </div>
                    <Sk className="h-3.5 w-20" />
                  </div>
                </div>
              </SkCard>

              {/* Companions */}
              <SkCard>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <Sk className="w-12 h-12 shrink-0" rounded="rounded-xl" />
                    <div className="space-y-2">
                      <Sk className="h-5 w-32" />
                      <Sk className="h-3 w-44" />
                    </div>
                  </div>
                  <Sk className="h-9 w-36" rounded="rounded-lg" />
                </div>
                {/* Companion cards */}
                <div className="space-y-4">
                  {Array.from({ length: 2 }).map((_, ci) => (
                    <div
                      key={ci}
                      className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Sk
                            className="w-12 h-12 shrink-0"
                            rounded="rounded-full"
                          />
                          <div className="space-y-2">
                            <Sk className="h-4 w-32" />
                            <Sk className="h-3 w-20" />
                          </div>
                        </div>
                        <Sk className="h-4 w-6" rounded="rounded" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                        <SkInfoCard />
                        <SkInfoCard />
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <Sk className="h-3 w-24" />
                        <Sk className="h-8 w-28" rounded="rounded-lg" />
                      </div>
                      <Sk className="w-full h-40" rounded="rounded-lg" />
                    </div>
                  ))}
                </div>
              </SkCard>
            </div>

            {/* ── Right Column (1/3) ── */}
            <div className="space-y-6">
              {/* Payment Details */}
              <SkCard>
                <SkSectionHeader subtitleWidth="w-48" />
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <Sk className="h-3.5 w-20" />
                      <Sk className="h-5 w-24" rounded="rounded-full" />
                    </div>
                  ))}
                  {/* Payment screenshot */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <Sk className="h-3 w-32" />
                      <Sk className="h-8 w-28" rounded="rounded-lg" />
                    </div>
                    <Sk className="w-full h-40" rounded="rounded-lg" />
                  </div>
                </div>
              </SkCard>

              {/* Emergency Contact */}
              <SkCard>
                <SkSectionHeader subtitleWidth="w-44" />
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <SkInfoCard key={i} />
                  ))}
                </div>
              </SkCard>

              {/* Documents */}
              <SkCard>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <Sk className="w-12 h-12 shrink-0" rounded="rounded-xl" />
                    <div className="space-y-2">
                      <Sk className="h-5 w-24" />
                      <Sk className="h-3 w-36" />
                    </div>
                  </div>
                  <Sk className="h-9 w-24" rounded="rounded-lg" />
                </div>

                <div className="space-y-4">
                  {/* Passport */}
                  <SkDocumentCard />

                  {/* Passport size photos */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Sk className="h-3 w-32" />
                      <Sk className="h-7 w-24" rounded="rounded-lg" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Sk className="w-full h-24" rounded="rounded-lg" />
                      <Sk className="w-full h-24" rounded="rounded-lg" />
                    </div>
                  </div>

                  {/* NID */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Sk className="h-3 w-20" />
                      <Sk className="h-7 w-24" rounded="rounded-lg" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <SkDocumentCard />
                      <SkDocumentCard />
                    </div>
                  </div>

                  {/* Other docs */}
                  <div className="space-y-2">
                    <SkDocumentCard />
                    <SkDocumentCard />
                  </div>
                </div>
              </SkCard>

              {/* Passport Details */}
              <SkCard>
                <SkSectionHeader subtitleWidth="w-36" />
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <SkInfoCard key={i} />
                  ))}
                </div>
              </SkCard>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewUmrahBookedSkeleton;
