"use client";

/**
 * Legacy → PostgreSQL migration.
 * Shows old DB draining, packets streaming through pipe, new DB filling.
 */
export default function MigrationViz() {
  return (
    <svg viewBox="0 0 600 360" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="mig-pipe" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7c5cff" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id="mig-old" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ec4899" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="mig-new" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.6" />
        </linearGradient>
        <filter id="mig-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Faint grid */}
      <g stroke="#ffffff10" strokeWidth="0.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={i} x1="0" y1={60 + i * 50} x2="600" y2={60 + i * 50} />
        ))}
      </g>

      {/* LEGACY DB - left */}
      <g transform="translate(80,180)">
        <ellipse cx="0" cy="-60" rx="55" ry="14" fill="url(#mig-old)" />
        <path d="M -55,-60 L -55,60 A 55,14 0 0 0 55,60 L 55,-60" fill="url(#mig-old)" opacity="0.7" />
        <ellipse cx="0" cy="-60" rx="55" ry="14" fill="none" stroke="#ec4899" />
        <ellipse cx="0" cy="-20" rx="55" ry="14" fill="none" stroke="#ec4899" opacity="0.6" />
        <ellipse cx="0" cy="20" rx="55" ry="14" fill="none" stroke="#ec4899" opacity="0.4" />
        <ellipse cx="0" cy="60" rx="55" ry="14" fill="none" stroke="#ec4899" />
        {/* Draining rows */}
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x="-40" y={-40 + i * 18} width="80" height="3" fill="#ec4899" opacity="0.6">
            <animate
              attributeName="opacity"
              values="0.7;0;0.7"
              dur="3s"
              begin={`${i * 0.5}s`}
              repeatCount="indefinite"
            />
          </rect>
        ))}
        <text x="0" y="100" textAnchor="middle" fill="#ec4899" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="3">
          LEGACY
        </text>
      </g>

      {/* PIPE */}
      <g>
        <path
          d="M 140,180 C 220,180 380,180 460,180"
          fill="none"
          stroke="url(#mig-pipe)"
          strokeWidth="3"
          opacity="0.5"
        />
        <path
          d="M 140,180 C 220,180 380,180 460,180"
          fill="none"
          stroke="url(#mig-pipe)"
          strokeWidth="1.5"
          strokeDasharray="4 8"
          opacity="0.9"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1.5s" repeatCount="indefinite" />
        </path>

        {/* Packets */}
        <defs>
          <path id="mig-path" d="M 140,180 C 220,180 380,180 460,180" />
        </defs>
        {[0, 0.4, 0.8, 1.2, 1.6, 2.0].map((d, i) => (
          <circle key={i} r="5" fill={i % 2 ? "#22d3ee" : "#7c5cff"} filter="url(#mig-glow)">
            <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${d}s`}>
              <mpath href="#mig-path" />
            </animateMotion>
            <animate attributeName="r" values="3;6;3" dur="2.4s" begin={`${d}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* Progress label */}
        <g transform="translate(300,140)">
          <rect x="-50" y="-12" width="100" height="24" rx="12" fill="#ffffff08" stroke="#ffffff20" />
          <text x="0" y="4" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="2">
            MIGRATING
          </text>
        </g>
      </g>

      {/* POSTGRES DB - right */}
      <g transform="translate(520,180)">
        <ellipse cx="0" cy="-60" rx="55" ry="14" fill="url(#mig-new)" />
        <path d="M -55,-60 L -55,60 A 55,14 0 0 0 55,60 L 55,-60" fill="url(#mig-new)" opacity="0.7" />
        <ellipse cx="0" cy="-60" rx="55" ry="14" fill="none" stroke="#22d3ee" />
        <ellipse cx="0" cy="-20" rx="55" ry="14" fill="none" stroke="#22d3ee" opacity="0.6" />
        <ellipse cx="0" cy="20" rx="55" ry="14" fill="none" stroke="#22d3ee" opacity="0.4" />
        <ellipse cx="0" cy="60" rx="55" ry="14" fill="none" stroke="#22d3ee" />
        {/* Filling rows */}
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x="-40" y={-40 + i * 18} width="0" height="3" fill="#22d3ee">
            <animate
              attributeName="width"
              values="0;80;80"
              dur="3s"
              begin={`${i * 0.5}s`}
              repeatCount="indefinite"
            />
          </rect>
        ))}
        <text x="0" y="100" textAnchor="middle" fill="#22d3ee" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="3">
          POSTGRES
        </text>
      </g>
    </svg>
  );
}
