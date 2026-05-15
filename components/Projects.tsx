"use client";

import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import Reveal from "./Reveal";
import Spotlight from "./Spotlight";
import MigrationViz from "./viz/MigrationViz";
import WarehouseViz from "./viz/WarehouseViz";
import StarSchemaViz from "./viz/StarSchemaViz";
import QualityViz from "./viz/QualityViz";

type ProjectKey = "migration" | "warehouse" | "star" | "quality";

type Project = {
  title: string;
  tag: string;
  blurb: string;
  tech: string[];
  size: "lg" | "md";
  glow: string;
  accent: string;
  viz: ProjectKey;
};

const projects: Project[] = [
  {
    title: "Georgia DOL Data Migration",
    tag: "POSTGRES · AWS GLUE · PYSPARK",
    blurb:
      "Moved a state-scale legacy platform to PostgreSQL RDS — ER analysis, PII masking, full row-level reconciliation.",
    tech: ["AWS Glue", "PySpark", "PostgreSQL", "Airflow"],
    size: "lg",
    glow: "rgba(124,92,255,0.35)",
    accent: "#7c5cff",
    viz: "migration",
  },
  {
    title: "Multi-State UI Modernization",
    tag: "SNOWFLAKE · DBT · SNOWPIPE",
    blurb:
      "Snowpipe + DBT models powering BI for Mississippi & Maine Departments of Labor.",
    tech: ["Snowflake", "DBT", "S3"],
    size: "md",
    glow: "rgba(34,211,238,0.35)",
    accent: "#22d3ee",
    viz: "warehouse",
  },
  {
    title: "UBS Banking Warehouse",
    tag: "TALEND · DB2 · STAR SCHEMA",
    blurb:
      "Star/snowflake schemas + MQT-tuned facts for risk and compliance.",
    tech: ["Talend", "IBM DB2", "SQL"],
    size: "md",
    glow: "rgba(163,230,53,0.30)",
    accent: "#a3e635",
    viz: "star",
  },
  {
    title: "Data Quality Framework",
    tag: "PYTHON · GREAT EXPECTATIONS",
    blurb:
      "Reusable validation layer catching schema drift and bad rows before they hit prod.",
    tech: ["Python", "GE", "Airflow"],
    size: "lg",
    glow: "rgba(236,72,153,0.30)",
    accent: "#ec4899",
    viz: "quality",
  },
];

const vizMap = {
  migration: MigrationViz,
  warehouse: WarehouseViz,
  star: StarSchemaViz,
  quality: QualityViz,
};

const sizeCls: Record<Project["size"], string> = {
  lg: "md:col-span-2",
  md: "md:col-span-1",
};

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <Reveal>
          <div className="flex items-baseline justify-between mb-16 flex-wrap gap-4">
            <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight">
              <span className="text-white/30">04 · </span>
              <span className="gradient-text">work</span>
            </h2>
            <p className="text-white/40 font-mono text-xs uppercase tracking-[0.3em]">
              selected projects
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-fr">
          {projects.map((p, i) => {
            const Viz = vizMap[p.viz];
            return (
              <Reveal key={p.title} delay={i * 100} className={sizeCls[p.size]}>
                <Spotlight className="group relative h-full rounded-2xl overflow-hidden glass flex flex-col min-h-[520px]">
                  {/* glow on hover */}
                  <div
                    className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
                    style={{ background: p.glow }}
                  />

                  {/* TOP: viz area */}
                  <div
                    className="relative flex-1 min-h-[280px] overflow-hidden"
                    style={{
                      background: `radial-gradient(ellipse at center, ${p.glow.replace("0.3", "0.18").replace("0.35", "0.2")}, transparent 70%)`,
                    }}
                  >
                    {/* tag pill */}
                    <div className="absolute top-5 left-6 right-6 z-10 flex items-start justify-between gap-4">
                      <div
                        className="text-[10px] font-mono uppercase tracking-[0.3em] px-3 py-1.5 rounded-full bg-ink/60 backdrop-blur-sm border border-white/10"
                        style={{ color: p.accent }}
                      >
                        {p.tag}
                      </div>
                      <div className="w-9 h-9 rounded-full bg-ink/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 group-hover:text-white group-hover:rotate-45 transition-transform duration-300 shrink-0">
                        <FaArrowUpRightFromSquare size={12} />
                      </div>
                    </div>

                    {/* viz fills the area */}
                    <div className="absolute inset-0 pt-10">
                      <Viz />
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                  {/* BOTTOM: content panel */}
                  <div className="relative bg-ink/85 backdrop-blur-sm p-6 md:p-7">
                    <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-white">
                      {p.title}
                    </h3>
                    <p className="text-white/60 text-sm mb-4 leading-relaxed">
                      {p.blurb}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
