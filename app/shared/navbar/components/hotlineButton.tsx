import { Phone } from "lucide-react";

const HotlineButton = () => {
  const hotlineNumber = "+8801896042360";

  return (
    <div>
      <style>{`
        @keyframes borderRotate {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .hotline-btn-border {
          position: relative;
          background: linear-gradient(90deg, #ef4444, #ffffff, #ef4444, #ffffff, #ef4444) 0% 50% / 200% 100%;
          animation: borderRotate 3s ease-in-out infinite;
          padding: 3px;
          border-radius: 9999px;
        }
        
        .hotline-btn-inner {
          border-radius: 9999px;
        }
      `}</style>

      <div className="hotline-btn-border">
        <a
          href={`tel:${hotlineNumber}`}
          aria-label={`Call our hotline at ${hotlineNumber}`}
        >
          <button
            className="hotline-btn-inner inline-flex items-center justify-center gap-2 px-8 py-2 
            bg-red-500 hover:bg-red-600 text-white font-semibold
            transition-all duration-200
            shadow-[0_8px_24px_rgba(239,68,68,0.4)]
            hover:shadow-[0_12px_32px_rgba(239,68,68,0.6)]
            active:scale-95 w-full"
          >
            <span>HOTLINE</span>
            <Phone size={20} strokeWidth={2.5} />
          </button>
        </a>
      </div>
    </div>
  );
};

export default HotlineButton;
