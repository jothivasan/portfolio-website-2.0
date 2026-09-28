import * as React from "react";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Hide the initial HTML loader when React mounts
  useEffect(() => {
    const initialLoader = document.getElementById("initial-loader");
    if (initialLoader) {
      initialLoader.style.opacity = "0";
      setTimeout(() => {
        initialLoader.remove();
      }, 300);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 800); // Wait for exit animation
          }, 500);
          return 100;
        }
        const increment = Math.floor(Math.random() * 5) + 1;
        return Math.min(prev + increment, 100);
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
        isExiting
          ? "opacity-0 scale-110 pointer-events-none"
          : "opacity-100 scale-100"
      }`}
    >
      <div className="w-full max-w-[280px] flex flex-col items-center">
        <div className="mb-10 transform transition-transform duration-500 hover:scale-110">
          <svg
            width="60"
            height="69"
            viewBox="0 0 55 63"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-pulse"
          >
            <circle cx="15" cy="48" r="15" fill="#D9D9D9" />
            <path
              d="M34 10.5C34 4.70101 38.701 0 44.5 0C50.299 0 55 4.70101 55 10.5V42C55 53.598 45.598 63 34 63V10.5Z"
              fill="#1DCD9F"
            />
          </svg>
        </div>

        <div className="w-full h-[2px] bg-zinc-900/50 rounded-full overflow-hidden relative backdrop-blur-sm border border-zinc-800/20">
          <div
            className="absolute top-0 left-0 h-full bg-[#1DCD9F] transition-all duration-300 ease-out shadow-[0_0_15px_rgba(29,205,159,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-6 flex flex-col items-center gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-[10px] font-black italic tracking-[0.5em] text-zinc-500 uppercase">
              {progress < 100 ? "INITIALIZING" : "COMPLETE"}
            </span>
            <span className="text-xs font-black italic text-white w-8 text-right tabular-nums">
              {progress}%
            </span>
          </div>
          <div className="flex gap-1.5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-1 h-1 rounded-full transition-colors duration-300 ${
                  progress > (i + 1) * 20 ? "bg-[#1DCD9F]" : "bg-zinc-800"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1DCD9F]/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
};

export default LoadingScreen;
