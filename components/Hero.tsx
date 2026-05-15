"use client";

import MagneticButton from "./MagneticButton";
import DataPipeline from "./DataPipeline";
import RoleTicker from "./RoleTicker";
import NameMark from "./NameMark";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-24"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div
        className="blob"
        style={{ top: "5%", left: "0%", width: 520, height: 520, background: "#7c5cff" }}
      />
      <div
        className="blob"
        style={{
          bottom: "0%",
          right: "0%",
          width: 460,
          height: 460,
          background: "#22d3ee",
          animationDelay: "5s",
        }}
      />
      <div
        className="blob"
        style={{
          top: "40%",
          right: "30%",
          width: 280,
          height: 280,
          background: "#ec4899",
          animationDelay: "8s",
        }}
      />

      {/* Top labels */}
      <div className="absolute top-24 left-6 md:left-12 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-white/40 font-mono z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
        <span>available · atlanta · ga</span>
      </div>
      <div className="absolute top-24 right-6 md:right-12 text-[10px] uppercase tracking-[0.35em] text-white/40 font-mono z-10">
        portfolio / 2026
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left: identity */}
          <div className="lg:col-span-6">
            <p className="text-[11px] uppercase tracking-[0.4em] text-cyan/80 font-mono mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-cyan/50" />
              data engineer · 6+ yrs
            </p>

            <NameMark />

            <div className="mt-8 text-xl md:text-2xl font-display text-white/80">
              I&apos;m a <RoleTicker />
            </div>

            <p className="mt-6 max-w-xl text-white/55 text-sm md:text-base leading-relaxed">
              Six years building the invisible plumbing that moves data from where it
              lives to where it&apos;s useful — AWS, Snowflake, PySpark, Airflow.
            </p>

            <div className="mt-10 flex gap-4 flex-wrap">
              <MagneticButton
                href="#projects"
                className="px-7 py-3 rounded-full bg-white text-ink font-medium text-sm tracking-wide hover:bg-white/90"
              >
                See the work →
              </MagneticButton>
              <MagneticButton
                href="#contact"
                className="px-7 py-3 rounded-full glass text-white text-sm tracking-wide"
              >
                Get in touch
              </MagneticButton>
            </div>

            {/* Mini stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {[
                { v: "6+", k: "years" },
                { v: "50+", k: "pipelines" },
                { v: "3", k: "DOL platforms" },
              ].map((s) => (
                <div key={s.k}>
                  <div className="font-display text-3xl font-bold gradient-text">
                    {s.v}
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
                    {s.k}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: pipeline visualization */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[460px] w-full">
              <div className="absolute -inset-10 bg-gradient-to-tr from-primary/10 via-transparent to-cyan/10 rounded-3xl blur-2xl" />
              <DataPipeline />
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">
              <span>● live pipeline</span>
              <span>data → insight</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="absolute bottom-0 left-0 right-0 py-4 border-t border-white/5 overflow-hidden z-10 bg-ink/40 backdrop-blur-sm">
        <div className="marquee text-white/30 font-mono text-xs uppercase tracking-[0.35em] gap-12 px-12">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-12 pr-12">
              <span>● Python</span>
              <span>● PySpark</span>
              <span>● AWS Glue</span>
              <span>● Snowflake</span>
              <span>● Airflow</span>
              <span>● DBT</span>
              <span>● PostgreSQL</span>
              <span>● S3</span>
              <span>● Talend</span>
              <span>● Data Modeling</span>
              <span>● Dimensional</span>
              <span>● ETL</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
