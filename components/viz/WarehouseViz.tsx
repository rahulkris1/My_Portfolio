"use client";

/**
 * Snowpipe + DBT into Snowflake.
 * S3 buckets drop files → snowpipe streams → snowflake stacked layers.
 */
export default function WarehouseViz() {
  return (
    <svg viewBox="0 0 600 360" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="wh-flake" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="wh-bucket" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c5cff" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
        <filter id="wh-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* S3 buckets at top */}
      {[
        { x: 150, label: "CSV" },
        { x: 300, label: "JSON" },
        { x: 450, label: "PRQT" },
      ].map((b, i) => (
        <g key={b.label} transform={`translate(${b.x},60)`}>
          <path
            d="M -25,-10 L 25,-10 L 22,20 L -22,20 Z"
            fill="url(#wh-bucket)"
            opacity="0.4"
            stroke="#7c5cff"
            strokeWidth="1.2"
          />
          <ellipse cx="0" cy="-10" rx="25" ry="6" fill="#7c5cff" opacity="0.6" />
          <text
            x="0"
            y="38"
            textAnchor="middle"
            fill="#7c5cff"
            fontSize="9"
            fontFamily="JetBrains Mono, monospace"
            letterSpacing="2"
          >
            {b.label}
          </text>

          {/* Falling files */}
          {[0, 1, 2].map((f) => (
            <g key={f}>
              <rect
                x="-4"
                y="0"
                width="8"
                height="10"
                rx="1"
                fill="#22d3ee"
                opacity="0"
                filter="url(#wh-glow)"
              >
                <animate
                  attributeName="y"
                  values="20;240"
                  dur="2.4s"
                  begin={`${i * 0.4 + f * 0.8}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  dur="2.4s"
                  begin={`${i * 0.4 + f * 0.8}s`}
                  repeatCount="indefinite"
                />
              </rect>
            </g>
          ))}
        </g>
      ))}

      {/* Snowpipe arrows */}
      {[150, 300, 450].map((x, i) => (
        <g key={i}>
          <line
            x1={x}
            y1="100"
            x2={x}
            y2="240"
            stroke="#22d3ee"
            strokeWidth="1"
            strokeDasharray="3 5"
            opacity="0.4"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1s" repeatCount="indefinite" />
          </line>
        </g>
      ))}

      {/* SNOWPIPE label */}
      <g transform="translate(530,180)">
        <rect x="-40" y="-10" width="80" height="20" rx="10" fill="#ffffff08" stroke="#22d3ee40" />
        <text x="0" y="4" textAnchor="middle" fill="#22d3ee" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="2">
          SNOWPIPE
        </text>
      </g>

      {/* Snowflake warehouse - hexagonal layers */}
      <g transform="translate(300,290)">
        {/* Hex layers stacked */}
        {[
          { y: 0, scale: 1, op: 0.9 },
          { y: -18, scale: 0.92, op: 0.75 },
          { y: -36, scale: 0.82, op: 0.6 },
          { y: -54, scale: 0.7, op: 0.45 },
        ].map((l, i) => (
          <g key={i} transform={`translate(0,${l.y}) scale(${l.scale})`}>
            <polygon
              points="0,-25 70,-12 70,12 0,25 -70,12 -70,-12"
              fill="url(#wh-flake)"
              opacity={l.op}
              stroke="#22d3ee"
              strokeWidth="1"
            >
              <animate
                attributeName="opacity"
                values={`${l.op};${l.op + 0.1};${l.op}`}
                dur="2.4s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            </polygon>
          </g>
        ))}
        <text x="0" y="60" textAnchor="middle" fill="#22d3ee" fontSize="11" fontFamily="JetBrains Mono, monospace" letterSpacing="3">
          SNOWFLAKE
        </text>
        <text x="0" y="78" textAnchor="middle" fill="#ffffff50" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="2">
          dbt models
        </text>
      </g>

      {/* Top label */}
      <text x="300" y="25" textAnchor="middle" fill="#ffffff50" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="3">
        S3 SOURCES
      </text>
    </svg>
  );
}
