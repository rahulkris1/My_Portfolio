"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaPython,
  FaAws,
  FaDatabase,
  FaAmazon,
} from "react-icons/fa";
import {
  SiApacheairflow,
  SiPostgresql,
  SiSnowflake,
  SiApachespark,
  SiDbt,
  SiTalend,
  SiPandas,
} from "react-icons/si";

type Item = { icon: any; name: string; color: string };

const rings: { radius: number; items: Item[]; speed: number }[] = [
  {
    radius: 110,
    speed: 30,
    items: [
      { icon: FaPython, name: "Python", color: "#3776AB" },
      { icon: SiApachespark, name: "PySpark", color: "#E25A1C" },
      { icon: FaDatabase, name: "SQL", color: "#4479A1" },
      { icon: SiPandas, name: "Pandas", color: "#9b59b6" },
    ],
  },
  {
    radius: 200,
    speed: 50,
    items: [
      { icon: FaAws, name: "AWS", color: "#FF9900" },
      { icon: SiSnowflake, name: "Snowflake", color: "#29B5E8" },
      { icon: SiPostgresql, name: "Postgres", color: "#4169E1" },
      { icon: SiApacheairflow, name: "Airflow", color: "#017CEE" },
      { icon: SiDbt, name: "DBT", color: "#FF694B" },
      { icon: FaAmazon, name: "S3", color: "#569A31" },
    ],
  },
  {
    radius: 290,
    speed: 80,
    items: [
      { icon: SiTalend, name: "Talend", color: "#FF6D00" },
      { icon: FaDatabase, name: "DB2", color: "#054ADA" },
      { icon: FaDatabase, name: "Modeling", color: "#a3e635" },
      { icon: FaDatabase, name: "DWH", color: "#ec4899" },
      { icon: FaDatabase, name: "Quality", color: "#22d3ee" },
    ],
  },
];

export default function SkillsOrbit() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // Pause animations on hover
  return (
    <div
      ref={wrapRef}
      className="relative w-full h-[680px] flex items-center justify-center select-none overflow-hidden"
      onMouseEnter={() => wrapRef.current?.classList.add("orbit-pause")}
      onMouseLeave={() => wrapRef.current?.classList.remove("orbit-pause")}
    >
      {/* Concentric ring guides */}
      {rings.map((r, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-white/5"
          style={{
            width: r.radius * 2,
            height: r.radius * 2,
          }}
        />
      ))}

      {/* Crosshair */}
      <div className="absolute w-px h-[600px] bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      <div className="absolute w-[600px] h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Center core */}
      <div className="absolute w-32 h-32 rounded-full flex items-center justify-center z-10">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-magenta to-cyan opacity-30 blur-xl animate-pulse" />
        <div className="absolute inset-2 rounded-full glass flex flex-col items-center justify-center">
          <div className="font-display font-black text-2xl gradient-text">DE</div>
          <div className="text-[9px] font-mono text-white/40 tracking-[0.3em] uppercase mt-1">
            core
          </div>
        </div>
      </div>

      {/* Orbits */}
      {rings.map((ring, ri) => (
        <div
          key={ri}
          className="orbit absolute"
          style={{
            width: ring.radius * 2,
            height: ring.radius * 2,
            animation: `spin ${ring.speed}s linear infinite${ri % 2 ? " reverse" : ""}`,
          }}
        >
          {ring.items.map((it, ii) => {
            const angle = (ii * 360) / ring.items.length;
            const Icon = it.icon;
            const key = `${ri}-${ii}-${it.name}`;
            const isHov = hovered === key;
            return (
              <div
                key={key}
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translate(${ring.radius}px) rotate(-${angle}deg)`,
                }}
              >
                <div
                  className="orbit-counter"
                  style={{
                    animation: `spin ${ring.speed}s linear infinite${
                      ri % 2 ? "" : " reverse"
                    }`,
                  }}
                >
                  <div
                    data-cursor
                    onMouseEnter={() => setHovered(key)}
                    onMouseLeave={() => setHovered(null)}
                    className={`relative group flex items-center justify-center rounded-2xl glass transition-all duration-500 ${
                      isHov ? "scale-125 z-20" : "scale-100"
                    }`}
                    style={{
                      width: 64,
                      height: 64,
                      boxShadow: isHov
                        ? `0 0 40px ${it.color}80, 0 0 80px ${it.color}30`
                        : "none",
                      borderColor: isHov ? it.color : undefined,
                    }}
                  >
                    <Icon
                      style={{ color: it.color }}
                      className="text-3xl transition-transform group-hover:scale-110"
                    />
                    <div
                      className={`absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-[0.2em] whitespace-nowrap transition-opacity ${
                        isHov ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ color: it.color }}
                    >
                      {it.name}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}

      <style jsx>{`
        .orbit-pause .orbit,
        .orbit-pause .orbit-counter {
          animation-play-state: paused !important;
        }
      `}</style>
    </div>
  );
}
