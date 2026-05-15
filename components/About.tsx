"use client";

import Spotlight from "./Spotlight";
import Reveal from "./Reveal";
import CountUp from "./CountUp";

const stats = [
  { to: 6, suffix: "+", label: "Years", sub: "in data" },
  { to: 50, suffix: "+", label: "Pipelines", sub: "in production" },
  { to: 3, suffix: "", label: "Platforms", sub: "DOL state systems" },
  { to: 99.9, suffix: "%", label: "Uptime", sub: "across orchestrators", decimals: 1 },
];

export default function About() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <Reveal>
          <div className="flex items-baseline justify-between mb-16 flex-wrap gap-4">
            <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight">
              <span className="text-white/30">01 · </span>
              <span className="gradient-text">about</span>
            </h2>
            <p className="text-white/40 font-mono text-xs uppercase tracking-[0.3em]">
              who / where / why
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Big quote card */}
          <Reveal className="lg:col-span-7">
            <Spotlight className="conic-border p-10 md:p-14 h-full">
              <p className="font-display text-2xl md:text-4xl leading-snug tracking-tight">
                I build the{" "}
                <span className="gradient-text font-bold">invisible plumbing</span>{" "}
                that makes dashboards{" "}
                <span className="text-cyan">trustworthy</span> — pipelines that don&apos;t
                wake people up at 3 AM.
              </p>
              <div className="mt-10 flex items-center gap-4 text-white/40 text-xs font-mono uppercase tracking-[0.25em]">
                <div className="h-px flex-1 bg-white/10" />
                <span>Data Engineer · TCS</span>
              </div>
            </Spotlight>
          </Reveal>

          {/* Stats grid */}
          <Reveal className="lg:col-span-5" delay={120}>
            <div className="grid grid-cols-2 gap-4 h-full">
              {stats.map((s: any) => (
                <Spotlight
                  key={s.label}
                  className="glass rounded-2xl p-6 flex flex-col justify-between min-h-[160px] hover:border-white/20 transition-colors"
                >
                  <span className="font-display text-5xl md:text-6xl font-bold gradient-text">
                    <CountUp
                      to={s.to}
                      suffix={s.suffix}
                      format={
                        s.decimals
                          ? (n) => n.toFixed(s.decimals)
                          : undefined
                      }
                    />
                  </span>
                  <div>
                    <div className="text-white/90 text-sm uppercase tracking-widest font-mono">
                      {s.label}
                    </div>
                    <div className="text-white/40 text-xs font-mono">{s.sub}</div>
                  </div>
                </Spotlight>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Tag row */}
        <Reveal delay={200}>
          <div className="mt-10 flex flex-wrap gap-3">
            {[
              "ETL Architecture",
              "Cloud Migration",
              "Dimensional Modeling",
              "Data Quality",
              "PySpark",
              "Snowflake",
              "AWS Glue",
              "Airflow",
            ].map((t) => (
              <span
                key={t}
                className="px-4 py-2 rounded-full glass text-sm text-white/70 hover:text-white hover:border-primary/40 transition-colors"
                data-cursor="text"
                data-cursor-label="skill"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
