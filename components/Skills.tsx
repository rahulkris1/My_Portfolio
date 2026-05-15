"use client";

import Reveal from "./Reveal";
import SkillsOrbit from "./SkillsOrbit";

export default function Skills() {
  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <Reveal>
          <div className="flex items-baseline justify-between mb-12 flex-wrap gap-4">
            <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight">
              <span className="text-white/30">02 · </span>
              <span className="gradient-text">stack</span>
            </h2>
            <p className="text-white/40 font-mono text-xs uppercase tracking-[0.3em]">
              hover the orbit
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <SkillsOrbit />
        </Reveal>

        <Reveal delay={250}>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { k: "Languages", v: "Python · SQL · Shell" },
              { k: "Cloud", v: "AWS · Snowflake" },
              { k: "Orchestration", v: "Airflow · DBT" },
              { k: "Frameworks", v: "PySpark · Pandas" },
            ].map((c) => (
              <div
                key={c.k}
                className="glass rounded-xl p-4 hover:border-white/20 transition-colors"
              >
                <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan/70 mb-1">
                  {c.k}
                </div>
                <div className="text-white/80 text-sm">{c.v}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
