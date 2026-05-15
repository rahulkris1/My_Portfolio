"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated data pipeline visualization
 * Sources → Ingest → Transform → Warehouse → Insights
 */
export default function DataPipeline() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / r.width;
      const dy = (e.clientY - cy) / r.height;
      setTilt({ x: dy * -8, y: dx * 8 });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative w-full h-full"
      style={{ perspective: "1200px" }}
    >
      <svg
        viewBox="0 0 800 400"
        className="w-full h-full"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="edge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7c5cff" />
            <stop offset="50%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id="purple" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7c5cff" />
            <stop offset="100%" stopColor="#5b3df0" />
          </linearGradient>
          <linearGradient id="cyan" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
          <linearGradient id="pink" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#be185d" />
          </linearGradient>
          <linearGradient id="lime" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a3e635" />
            <stop offset="100%" stopColor="#65a30d" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Packet shape */}
          <circle id="packet" r="4" fill="#fff" filter="url(#glow)" />
        </defs>

        {/* Pipe edges (drawn behind nodes) */}
        <g stroke="url(#edge)" strokeWidth="1.4" fill="none" opacity="0.7">
          {/* Sources -> Ingest */}
          <path d="M 120,80  C 220,80 240,160 320,200" />
          <path d="M 120,200 C 220,200 240,200 320,200" />
          <path d="M 120,320 C 220,320 240,240 320,200" />
          {/* Ingest -> Transform */}
          <path d="M 380,200 C 440,200 440,200 500,200" />
          {/* Transform -> Warehouse */}
          <path d="M 560,200 C 620,200 620,200 680,200" />
          {/* Warehouse -> Insight dots */}
          <path d="M 740,200 C 760,200 760,140 740,80" opacity="0.4" />
          <path d="M 740,200 C 760,200 760,260 740,320" opacity="0.4" />
        </g>

        {/* Animated packets along edges */}
        <g>
          {[
            { path: "M 120,80  C 220,80 240,160 320,200", dur: 4, delay: 0, color: "#22d3ee" },
            { path: "M 120,200 C 220,200 240,200 320,200", dur: 3.5, delay: 0.5, color: "#7c5cff" },
            { path: "M 120,320 C 220,320 240,240 320,200", dur: 4.2, delay: 1, color: "#ec4899" },
            { path: "M 380,200 C 440,200 440,200 500,200", dur: 2.2, delay: 0.2, color: "#a3e635" },
            { path: "M 380,200 C 440,200 440,200 500,200", dur: 2.2, delay: 1.3, color: "#22d3ee" },
            { path: "M 560,200 C 620,200 620,200 680,200", dur: 2, delay: 0.7, color: "#fff" },
            { path: "M 560,200 C 620,200 620,200 680,200", dur: 2, delay: 1.7, color: "#fff" },
          ].map((p, i) => (
            <circle key={i} r="3.5" fill={p.color} filter="url(#glow)">
              <animateMotion dur={`${p.dur}s`} repeatCount="indefinite" begin={`${p.delay}s`}>
                <mpath href={`#mp-${i}`} />
              </animateMotion>
            </circle>
          ))}
          {/* Hidden mpath defs */}
          <defs>
            <path id="mp-0" d="M 120,80  C 220,80 240,160 320,200" />
            <path id="mp-1" d="M 120,200 C 220,200 240,200 320,200" />
            <path id="mp-2" d="M 120,320 C 220,320 240,240 320,200" />
            <path id="mp-3" d="M 380,200 C 440,200 440,200 500,200" />
            <path id="mp-4" d="M 380,200 C 440,200 440,200 500,200" />
            <path id="mp-5" d="M 560,200 C 620,200 620,200 680,200" />
            <path id="mp-6" d="M 560,200 C 620,200 620,200 680,200" />
          </defs>
        </g>

        {/* Source nodes (left) */}
        {[
          { y: 80, label: "S3", color: "url(#purple)" },
          { y: 200, label: "API", color: "url(#cyan)" },
          { y: 320, label: "DB", color: "url(#pink)" },
        ].map((n, i) => (
          <g key={i} transform={`translate(80,${n.y})`}>
            <rect x="-40" y="-22" width="80" height="44" rx="10" fill={n.color} opacity="0.15" />
            <rect
              x="-40"
              y="-22"
              width="80"
              height="44"
              rx="10"
              fill="none"
              stroke={n.color}
              strokeWidth="1.5"
            />
            <text
              x="0"
              y="5"
              textAnchor="middle"
              fill="#fff"
              fontSize="14"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="600"
            >
              {n.label}
            </text>
            <circle cx="0" cy="0" r="3" fill={n.color}>
              <animate attributeName="r" values="3;6;3" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
              <animate attributeName="opacity" values="1;0;1" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
            </circle>
          </g>
        ))}

        {/* Ingest hexagon */}
        <g transform="translate(350,200)">
          <g style={{ transformOrigin: "center", animation: "spin 16s linear infinite" }}>
            <polygon
              points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15"
              fill="none"
              stroke="url(#edge)"
              strokeWidth="1.5"
              filter="url(#glow)"
            />
          </g>
          <text
            x="0"
            y="5"
            textAnchor="middle"
            fill="#fff"
            fontSize="11"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="700"
            letterSpacing="2"
          >
            INGEST
          </text>
        </g>

        {/* Transform - rotating Glue/PySpark gear */}
        <g transform="translate(530,200)">
          <g style={{ transformOrigin: "center", animation: "spin 24s linear infinite reverse" }}>
            <circle cx="0" cy="0" r="38" fill="none" stroke="url(#cyan)" strokeWidth="1" strokeDasharray="3 6" />
            <circle cx="0" cy="0" r="28" fill="none" stroke="url(#purple)" strokeWidth="1.5" />
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i * Math.PI * 2) / 8;
              const x1 = Math.cos(a) * 32;
              const y1 = Math.sin(a) * 32;
              const x2 = Math.cos(a) * 40;
              const y2 = Math.sin(a) * 40;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#cyan)" strokeWidth="2" />;
            })}
          </g>
          <text
            x="0"
            y="-50"
            textAnchor="middle"
            fill="#22d3ee"
            fontSize="9"
            fontFamily="JetBrains Mono, monospace"
            letterSpacing="3"
          >
            PYSPARK
          </text>
          <text
            x="0"
            y="5"
            textAnchor="middle"
            fill="#fff"
            fontSize="13"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="700"
          >
            ETL
          </text>
        </g>

        {/* Warehouse - stacked cylinders (Snowflake) */}
        <g transform="translate(710,200)">
          {[-20, 0, 20].map((dy, i) => (
            <g key={i}>
              <ellipse cx="0" cy={dy} rx="30" ry="8" fill="url(#purple)" opacity={0.2 + i * 0.15} />
              <ellipse cx="0" cy={dy} rx="30" ry="8" fill="none" stroke="#7c5cff" strokeWidth="1.2" />
            </g>
          ))}
          <line x1="-30" y1="-20" x2="-30" y2="20" stroke="#7c5cff" strokeWidth="1.2" />
          <line x1="30" y1="-20" x2="30" y2="20" stroke="#7c5cff" strokeWidth="1.2" />
          <text
            x="0"
            y="58"
            textAnchor="middle"
            fill="#fff"
            fontSize="10"
            fontFamily="JetBrains Mono, monospace"
            letterSpacing="2"
          >
            WAREHOUSE
          </text>
        </g>

        {/* Insight nodes */}
        {[
          { y: 80, label: "BI" },
          { y: 320, label: "ML" },
        ].map((n, i) => (
          <g key={i} transform={`translate(750,${n.y})`}>
            <circle cx="0" cy="0" r="14" fill="url(#lime)" opacity="0.2" />
            <circle cx="0" cy="0" r="14" fill="none" stroke="url(#lime)" strokeWidth="1.4" />
            <text
              x="0"
              y="4"
              textAnchor="middle"
              fill="#fff"
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="700"
            >
              {n.label}
            </text>
          </g>
        ))}

        {/* Labels on stages */}
        <g fill="#ffffff60" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="2">
          <text x="80" y="370" textAnchor="middle">SOURCES</text>
          <text x="350" y="370" textAnchor="middle">INGEST</text>
          <text x="530" y="370" textAnchor="middle">TRANSFORM</text>
          <text x="710" y="370" textAnchor="middle">SERVE</text>
        </g>

        {/* Ground grid */}
        <g stroke="#ffffff10" strokeWidth="0.5">
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={i} x1="0" y1={i * 40} x2="800" y2={i * 40} />
          ))}
        </g>
      </svg>
    </div>
  );
}
