"use client";

/**
 * Data quality gates - rows flowing through validation checks.
 */
export default function QualityViz() {
  const gates = [
    { x: 130, label: "SCHEMA" },
    { x: 260, label: "NULLS" },
    { x: 390, label: "TYPES" },
    { x: 520, label: "RANGE" },
  ];

  return (
    <svg viewBox="0 0 600 360" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="q-pass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a3e635" />
          <stop offset="100%" stopColor="#65a30d" />
        </linearGradient>
        <linearGradient id="q-fail" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#be185d" />
        </linearGradient>
        <filter id="q-glow">
          <feGaussianBlur stdDeviation="2" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Conveyor track */}
      <g>
        <rect x="40" y="160" width="540" height="40" rx="6" fill="#ffffff05" stroke="#ffffff10" />
        {/* Track ticks */}
        {Array.from({ length: 28 }).map((_, i) => (
          <line
            key={i}
            x1={50 + i * 20}
            y1="200"
            x2={45 + i * 20}
            y2="200"
            stroke="#ffffff20"
          />
        ))}
        <line x1="50" y1="180" x2="580" y2="180" stroke="#7c5cff" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.5">
          <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="0.8s" repeatCount="indefinite" />
        </line>
      </g>

      {/* Gates */}
      {gates.map((g, i) => (
        <g key={g.label}>
          {/* Gate frame */}
          <rect x={g.x - 14} y="140" width="28" height="80" fill="none" stroke="#ffffff20" strokeWidth="1" />
          <rect x={g.x - 14} y="140" width="28" height="4" fill="#7c5cff" />
          <rect x={g.x - 14} y="216" width="28" height="4" fill="#7c5cff" />

          {/* Label */}
          <text
            x={g.x}
            y="130"
            textAnchor="middle"
            fill="#fff"
            fontSize="9"
            fontFamily="JetBrains Mono, monospace"
            letterSpacing="2"
          >
            {g.label}
          </text>
          <circle cx={g.x} cy="240" r="3" fill="#a3e635">
            <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      {/* Data rows flowing through */}
      {[0, 0.7, 1.4, 2.1, 2.8, 3.5, 4.2].map((delay, i) => {
        const fails = i === 2 || i === 5;
        return (
          <g key={i}>
            <rect
              x="-20"
              y="174"
              width="16"
              height="12"
              rx="2"
              fill={fails ? "url(#q-fail)" : "url(#q-pass)"}
              filter="url(#q-glow)"
              opacity="0.95"
            >
              <animate
                attributeName="x"
                values="20;620"
                dur="5s"
                begin={`${delay}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values={fails ? "0.95;0.95;0.95;0;0" : "0.95;0.95;0.95;0.95;0.95"}
                dur="5s"
                begin={`${delay}s`}
                repeatCount="indefinite"
                keyTimes={fails ? "0;0.55;0.6;0.7;1" : "0;0.2;0.5;0.8;1"}
              />
              <animate
                attributeName="y"
                values={fails ? "174;174;180;220;280" : "174;174;174;174;174"}
                dur="5s"
                begin={`${delay}s`}
                repeatCount="indefinite"
                keyTimes={fails ? "0;0.55;0.6;0.7;1" : "0;0.2;0.5;0.8;1"}
              />
            </rect>
          </g>
        );
      })}

      {/* Counters */}
      <g transform="translate(60,70)">
        <text fill="#ffffff50" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="2">
          PASSED
        </text>
        <text y="22" fill="#a3e635" fontSize="22" fontFamily="JetBrains Mono, monospace" fontWeight="700">
          98.4%
        </text>
      </g>
      <g transform="translate(480,70)">
        <text fill="#ffffff50" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="2">
          REJECTED
        </text>
        <text y="22" fill="#ec4899" fontSize="22" fontFamily="JetBrains Mono, monospace" fontWeight="700">
          1.6%
        </text>
      </g>

      {/* Status bar */}
      <g transform="translate(300,320)">
        <text textAnchor="middle" fill="#ffffff40" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="3">
          GREAT EXPECTATIONS · CI GATES
        </text>
      </g>
    </svg>
  );
}
