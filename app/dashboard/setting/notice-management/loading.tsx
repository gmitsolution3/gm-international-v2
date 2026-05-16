// components/TeamMemberSkeleton.tsx

export default function TeamMemberSkeleton() {
  return (
    <div className="p-6 font-sans">
      {/* Navbar skeleton */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="skeleton h-5 w-16 rounded" />
          <div className="skeleton h-5 w-28 rounded" />
        </div>
        <div className="flex items-center gap-3">
          <div className="skeleton h-3.5 w-16 rounded" />
          <div className="skeleton h-9 w-9 rounded-full" />
        </div>
      </div>

      {/* Button skeleton */}
      <div className="skeleton h-11 w-48 rounded-lg mb-8" />

      {/* Table skeleton */}
      <div className="border border-border rounded-xl overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[130px_1fr_160px_1fr_130px] px-5 py-3 bg-muted border-b border-border">
          {["IMAGE", "NAME", "ROLE", "BIO", "ACTIONS"].map((col) => (
            <div
              key={col}
              className={`skeleton h-3 ${col === "ACTIONS" ? "w-16 ml-auto" : "w-12"} rounded`}
            />
          ))}
        </div>

        {/* Table rows */}
        {[160, 200, 140].map((nameW, i) => (
          <div
            key={i}
            className={`grid grid-cols-[130px_1fr_160px_1fr_130px] px-5 py-5 items-center ${
              i < 2 ? "border-b border-border" : ""
            }`}
          >
            <div className="skeleton h-11 w-11 rounded-full" />
            <div
              className={`skeleton h-3.5 rounded`}
              style={{ width: nameW }}
            />
            <div className="skeleton h-3.5 w-24 rounded" />
            <div className="skeleton h-3.5 w-52 rounded" />
            <div className="flex justify-end gap-2.5">
              {[0, 1, 2].map((j) => (
                <div key={j} className="skeleton h-4.5 w-4.5 rounded" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
