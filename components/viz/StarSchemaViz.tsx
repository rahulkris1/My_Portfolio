"use client";

/**
 * Star schema — central FACT, surrounding DIMs, data packets flowing inward.
 * Static structure, animated data flow for reliability across browsers.
 */
export default function StarSchemaViz() {
  const dims = [
    { label: "DATE",     angle: -90 },
    { label: "CUSTOMER", angle: -30 },
    { label: "PRODUCT",  angle:  30 },
    { label: "REGION",   angle:  90 },
    { label: "ACCOUNT",  angle: 150 },
    { label: "BRANCH",   angle: 210 },
  ];
  const cx = 300, cy = 180, R = 130;

  return (
    <svg viewBox="0 0 600 360" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="star-fact" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a3e635" />
          <stop offset="100%" stopColor="#65a30d" />
        </linearGradient>
        <linearGradient id="star-dim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c5cff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id="star-aura" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#a3e635" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
        </radialGradient>
        <filter id="star-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Aura behind fact */}
      <circle cx={cx} cy={cy} r="120" fill="url(#star-aura)" />

      {/* Connection lines + flowing packets */}
      {dims.map((d, i) => {
        const rad = (d.angle * Math.PI) / 180;
        const dx = cx + Math.cos(rad) * R;
        const dy = cy + Math.sin(rad) * R;
        const pathId = `star-line-${i}`;
        const path = `M ${dx},${dy} L ${cx},${cy}`;
        return (
          <g key={d.label}>
            <path id={pathId} d={path} fill="none" stroke="#7c5cff" strokeWidth="1.2" strokeDasharray="3 5" opacity="0.45" />
            {/* Two packets staggered */}
            {[0, 1.4].map((off, j) => (
              <circle key={j} r="3.5" fill={j ? "#ec4899" : "#22d3ee"} filter="url(#star-glow)">
                <animateMotion dur="2.8s" repeatCount="indefinite" begin={`${i * 0.3 + off}s`}>
                  <mpath href={`#${pathId}`} />
                </animateMotion>
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="2.8s" begin={`${i * 0.3 + off}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </g>
        );
      })}

      {/* DIM tables */}
      {dims.map((d) => {
        const rad = (d.angle * Math.PI) / 180;
        const x = cx + Math.cos(rad) * R;
        const y = cy + Math.sin(rad) * R;
        return (
          <g key={d.label} transform={`translate(${x},${y})`}>
            <rect x="-38" y="-20" width="76" height="40" rx="5" fill="url(#star-dim)" stroke="#7c5cff" strokeWidth="1.3" />
            <line x1="-38" y1="-8" x2="38" y2="-8" stroke="#7c5cff" strokeWidth="0.8" opacity="0.7" />
            <text x="0" y="-12" textAnchor="middle" fill="#22d3ee" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="1">DIM</text>
            <text x="0" y="6" textAnchor="middle" fill="#fff" fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="700" letterSpacing="1.5">{d.label}</text>
            <line x1="-30" y1="12" x2="30" y2="12" stroke="#ffffff20" />
          </g>
        );
      })}

      {/* Central FACT */}
      <g transform={`translate(${cx},${cy})`}>
        <rect x="-50" y="-32" width="100" height="64" rx="7" fill="url(#star-fact)" opacity="0.22" stroke="#a3e635" strokeWidth="1.8" filter="url(#star-glow)" />
        <rect x="-50" y="-32" width="100" height="16" rx="7" fill="#a3e635" opacity="0.35" />
        <text x="0" y="-20" textAnchor="middle" fill="#0a0a0f" fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="800" letterSpacing="2">FACT</text>
        <text x="0" y="0" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="700" letterSpacing="1.5">transactions</text>
        <line x1="-40" y1="10" x2="40" y2="10" stroke="#ffffff30" />
        <line x1="-40" y1="20" x2="40" y2="20" stroke="#ffffff20" />
        {/* Pulse ring */}
        <circle cx="0" cy="0" r="60" fill="none" stroke="#a3e635" strokeWidth="1" opacity="0.6">
          <animate attributeName="r" values="40;80;40" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0;0.7" dur="3s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Caption */}
      <text x="300" y="345" textAnchor="middle" fill="#ffffff40" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="3">
        STAR SCHEMA · 6 DIMS · 1 FACT
      </text>
    </svg>
  );
}
