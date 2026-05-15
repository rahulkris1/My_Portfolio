"use client";

import { useEffect, useState } from "react";

type LetterProps = {
  c: string;
  i: number;
  variant: "gradient" | "ghost";
};

function Letter({ c, i, variant }: LetterProps) {
  const base =
    "name-letter inline-block transition-all duration-300 ease-out hover:-translate-y-3 will-change-transform";
  const variantCls =
    variant === "gradient" ? "gradient-text hover:!bg-none hover:text-cyan" : "text-white/10 hover:text-cyan";

  return (
    <span
      className={`${base} ${variantCls}`}
      style={{
        animation: `letter-in 0.9s ${i * 0.04}s both cubic-bezier(0.16,1,0.3,1)`,
      }}
    >
      {c}
    </span>
  );
}

export default function NameMark() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/New_York",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-US", opts).format(d) + " EST");
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative">
      <h1 className="font-display font-bold leading-[0.85] tracking-tight relative">
        {/* Rahul line + arrow annotation, sized to text */}
        <span className="block text-[15vw] lg:text-[8.5vw] relative w-fit">
          <span className="inline-block">
            {"Rahul".split("").map((c, i) => (
              <Letter key={i} c={c} i={i} variant="gradient" />
            ))}
          </span>

          {/* Arrow + "that's me" — positioned just past the end of "Rahul" */}
          <span
            className="hidden md:inline-flex absolute top-[10%] left-full ml-3 lg:ml-6 items-center gap-2 select-none pointer-events-none"
            style={{ animation: "fade-in 0.6s 1.6s both" }}
          >
            <svg
              width="50"
              height="36"
              viewBox="0 0 50 36"
              className="text-cyan/70"
              style={{ transform: "scaleX(-1)" }}
            >
              <path
                d="M4,32 C 18,22 30,12 46,4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="120"
                strokeDashoffset="120"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="120"
                  to="0"
                  dur="1.1s"
                  begin="1s"
                  fill="freeze"
                />
              </path>
              <polyline
                points="41,2 46,4 44,9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                opacity="0"
              >
                <animate
                  attributeName="opacity"
                  from="0"
                  to="1"
                  dur="0.25s"
                  begin="2s"
                  fill="freeze"
                />
              </polyline>
            </svg>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan/80 whitespace-nowrap">
              that&apos;s me
            </span>
          </span>
        </span>

        {/* Kampati line + brand dot + signature underline */}
        <span className="block text-[15vw] lg:text-[8.5vw] -mt-2 lg:-mt-3 relative w-fit">
          <span className="inline-block">
            {"Kampati".split("").map((c, i) => (
              <Letter key={i} c={c} i={i + 6} variant="ghost" />
            ))}
          </span>

          {/* Pulsing brand dot */}
          <span
            className="inline-block align-baseline ml-2 relative"
            style={{ animation: "letter-in 0.9s 0.6s both cubic-bezier(0.16,1,0.3,1)" }}
          >
            <span
              className="absolute inset-0 rounded-full blur-2xl"
              style={{
                background: "linear-gradient(135deg, #7c5cff, #ec4899)",
                opacity: 0.7,
              }}
            />
            <span
              className="relative inline-block rounded-full"
              style={{
                width: "0.14em",
                height: "0.14em",
                background: "linear-gradient(135deg, #7c5cff, #22d3ee, #ec4899)",
                boxShadow: "0 0 32px rgba(124,92,255,0.9)",
                animation: "dot-pulse 2.2s ease-in-out infinite",
              }}
            />
          </span>

          {/* Signature underline */}
          <svg
            viewBox="0 0 400 30"
            className="absolute -bottom-1 left-0 w-full pointer-events-none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="sig-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7c5cff" />
                <stop offset="50%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <path
              d="M 4,20 C 80,8 160,26 240,14 C 300,6 360,20 396,12"
              fill="none"
              stroke="url(#sig-grad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="500"
              strokeDashoffset="500"
              style={{ animation: "sig-draw 1.6s 1s cubic-bezier(0.65,0,0.35,1) forwards" }}
            />
          </svg>
        </span>
      </h1>

      {/* Side annotations row */}
      <div
        className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 opacity-0"
        style={{ animation: "fade-in 0.8s 1.8s both" }}
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
          available
        </div>
        <div className="flex items-center gap-2">
          <span className="text-cyan">◉</span>
          atlanta · ga
        </div>
        {time && (
          <div className="flex items-center gap-2">
            <span className="text-magenta">◷</span>
            {time}
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="text-white/30">↳</span>
          est. 2017
        </div>
      </div>
    </div>
  );
}
