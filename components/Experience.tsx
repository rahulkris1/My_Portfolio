"use client";

import Reveal from "./Reveal";
import Spotlight from "./Spotlight";

const timeline = [
  {
    year: "2021 — Now",
    role: "Data Engineer II",
    org: "Tata Consultancy Services",
    where: "Atlanta, GA",
    tags: ["AWS Glue", "PySpark", "Snowflake", "Airflow", "PostgreSQL"],
    blurb:
      "Migrated legacy systems to PostgreSQL RDS · stood up Snowflake warehouses for Mississippi & Maine DOL · orchestrated Airflow DAGs with PII masking.",
  },
  {
    year: "2017 — 2018",
    role: "Data Engineer I",
    org: "Cognizant",
    where: "Hyderabad, India",
    tags: ["Talend", "IBM DB2", "SQL", "Shell"],
    blurb:
      "Built Talend ETL for UBS banking · designed star/snowflake schemas · automated MQT optimizations on TB-scale fact tables.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <Reveal>
          <div className="flex items-baseline justify-between mb-16 flex-wrap gap-4">
            <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight">
              <span className="text-white/30">03 · </span>
              <span className="gradient-text">timeline</span>
            </h2>
            <p className="text-white/40 font-mono text-xs uppercase tracking-[0.3em]">
              where i&apos;ve been
            </p>
          </div>
        </Reveal>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-2 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />
          {/* Flowing data pulses along the line */}
          <div className="absolute left-2 md:left-1/2 top-0 bottom-0 -translate-x-1/2 w-1 overflow-hidden pointer-events-none">
            <div
              className="absolute left-0 w-1 h-12 rounded-full"
              style={{
                background:
                  "linear-gradient(180deg, transparent, #22d3ee, transparent)",
                filter: "blur(2px)",
                animation: "pulse-flow 5s linear infinite",
              }}
            />
            <div
              className="absolute left-0 w-1 h-10 rounded-full"
              style={{
                background:
                  "linear-gradient(180deg, transparent, #7c5cff, transparent)",
                filter: "blur(2px)",
                animation: "pulse-flow 6s linear infinite 2s",
              }}
            />
            <div
              className="absolute left-0 w-1 h-8 rounded-full"
              style={{
                background:
                  "linear-gradient(180deg, transparent, #ec4899, transparent)",
                filter: "blur(2px)",
                animation: "pulse-flow 7s linear infinite 4s",
              }}
            />
          </div>

          {timeline.map((t, i) => (
            <Reveal key={i} delay={i * 100}>
              <div
                className={`relative grid md:grid-cols-2 gap-8 mb-16 items-center ${
                  i % 2 ? "md:[direction:rtl]" : ""
                }`}
              >
                {/* dot */}
                <div className="absolute left-2 md:left-1/2 top-8 -translate-x-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20" />

                <div className={`pl-10 md:pl-0 ${i % 2 ? "md:pr-16" : "md:pl-16"}`} style={{ direction: "ltr" }}>
                  <Spotlight className="glass rounded-2xl p-8 hover:border-white/20 transition">
                    <div className="text-xs font-mono text-cyan tracking-[0.25em] uppercase mb-2">
                      {t.year}
                    </div>
                    <h3 className="font-display text-3xl font-bold text-white mb-1">
                      {t.role}
                    </h3>
                    <div className="text-primary text-lg mb-1">{t.org}</div>
                    <div className="text-white/40 text-sm mb-5">{t.where}</div>
                    <p className="text-white/70 leading-relaxed mb-5">{t.blurb}</p>
                    <div className="flex flex-wrap gap-2">
                      {t.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-white/10 text-white/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Spotlight>
                </div>

                {/* Big year on opposite side */}
                <div className="hidden md:block" style={{ direction: "ltr" }}>
                  <div
                    className={`font-display text-7xl lg:text-8xl font-black text-white/5 select-none ${
                      i % 2 ? "text-right pr-16" : "pl-16"
                    }`}
                  >
                    {t.year.split(" ")[0]}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
