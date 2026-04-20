// components/AboutPageSkeleton.tsx

const Sk = ({
  w,
  h,
  rounded = "6px",
  full = false,
}: {
  w?: string;
  h: string;
  rounded?: string;
  full?: boolean;
}) => (
  <span
    className="skeleton"
    style={{
      display: "block",
      width: full ? "100%" : w,
      height: h,
      borderRadius: rounded,
    }}
  />
);

const SkDark = ({
  w,
  h,
  rounded = "6px",
  full = false,
}: {
  w?: string;
  h: string;
  rounded?: string;
  full?: boolean;
}) => (
  <span
    className="skeleton-dark"
    style={{
      display: "block",
      width: full ? "100%" : w,
      height: h,
      borderRadius: rounded,
    }}
  />
);

export default function AboutPageSkeleton() {
  return (
    <div className="font-sans overflow-hidden">
      {/* Navbar */}
      <div className="flex items-center justify-between px-6 py-3.5 border-b border-border bg-background">
        <div className="flex items-center gap-2">
          <Sk w="36px" h="36px" rounded="8px" />
          <Sk w="90px" h="14px" />
        </div>
        <div className="flex items-center gap-5">
          {[36, 56, 70, 44, 48, 48].map((w, i) => (
            <Sk key={i} w={`${w}px`} h="11px" />
          ))}
        </div>
        <div className="flex items-center gap-2.5">
          <Sk w="80px" h="34px" rounded="20px" />
          <Sk w="34px" h="34px" rounded="50%" />
        </div>
      </div>

      {/* Hero */}
      <div className="bg-muted py-12 flex flex-col items-center gap-3.5">
        <Sk w="260px" h="28px" />
        <Sk w="320px" h="14px" />
        <div className="w-11 h-0.5 bg-red-700 opacity-50 mt-1.5 rounded-full" />
      </div>

      {/* Mission / Vision */}
      <div className="px-6 py-9 grid grid-cols-2 gap-4">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="bg-background border border-border rounded-xl p-5 flex flex-col gap-3"
          >
            <Sk w="36px" h="36px" rounded="8px" />
            <Sk w="110px" h="16px" />
            {[100, 90, 80, 70].map((p, j) => (
              <Sk key={j} w={`${p}%`} h="11px" />
            ))}
          </div>
        ))}
      </div>

      {/* Stats Banner */}
      <div className="bg-[#8B1A1A] py-8 px-6">
        <div className="grid grid-cols-4 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2.5">
              <SkDark w="28px" h="28px" rounded="6px" />
              <SkDark w="70px" h="22px" rounded="5px" />
              <SkDark w="90px" h="11px" rounded="4px" />
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="px-6 py-9">
        <div className="flex flex-col items-center gap-2.5 mb-7">
          <Sk w="240px" h="22px" />
          <Sk w="300px" h="12px" />
        </div>
        <div className="grid grid-cols-4 gap-3.5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-background border border-border rounded-xl p-4 flex flex-col gap-2.5"
            >
              <Sk w="32px" h="32px" rounded="8px" />
              <Sk w="80%" h="14px" />
              {[100, 90, 75].map((p, j) => (
                <Sk key={j} w={`${p}%`} h="11px" />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="px-6 py-9">
        <div className="flex flex-col items-center gap-2.5 mb-7">
          <Sk w="200px" h="22px" />
          <Sk w="260px" h="12px" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="bg-background border border-border rounded-xl overflow-hidden"
            >
              <Sk full h="180px" rounded="0px" />
              <div className="p-3.5 flex flex-col gap-2">
                <Sk w="120px" h="14px" />
                <Sk w="90px" h="11px" />
                <Sk full h="11px" />
                <Sk w="80%" h="11px" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mx-6 mb-9 bg-[#8B1A1A] rounded-xl p-9 flex flex-col items-center gap-3.5">
        <SkDark w="260px" h="24px" rounded="5px" />
        <SkDark w="220px" h="13px" rounded="4px" />
        <SkDark w="160px" h="40px" rounded="24px" />
      </div>

      {/* Footer */}
      <div className="bg-[#2C0A0A] px-6 pt-9 pb-5">
        <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-6 mb-7">
          <div className="flex flex-col gap-2.5">
            <SkDark w="50px" h="50px" rounded="8px" />
            {[100, 90, 80, 70].map((p, i) => (
              <SkDark key={i} w={`${p}%`} h="11px" />
            ))}
          </div>
          {[0, 1, 2].map((col) => (
            <div key={col} className="flex flex-col gap-2.5">
              <SkDark w="70px" h="13px" rounded="4px" />
              {[80, 100, 90, 110, 95].map((w, i) => (
                <SkDark key={i} w={`${w}px`} h="10px" rounded="3px" />
              ))}
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-4 flex justify-between">
          <SkDark w="140px" h="10px" rounded="3px" />
          <SkDark w="180px" h="10px" rounded="3px" />
          <SkDark w="160px" h="10px" rounded="3px" />
        </div>
      </div>
    </div>
  );
}
