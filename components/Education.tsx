"use client";

import Reveal from "./Reveal";
import Spotlight from "./Spotlight";

const edu = [
  {
    degree: "M.S. Computer Science",
    school: "Stevens Institute of Technology",
    where: "Hoboken, NJ",
    period: "2019 — 2020",
  },
  {
    degree: "B.E. Electronics & Communication",
    school: "St. Joseph's College of Engineering",
    where: "Chennai, India",
    period: "2013 — 2017",
  },
];

export default function Education() {
  return (
    <section id="education" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <Reveal>
          <div className="flex items-baseline justify-between mb-16 flex-wrap gap-4">
            <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight">
              <span className="text-white/30">05 · </span>
              <span className="gradient-text">study</span>
            </h2>
            <p className="text-white/40 font-mono text-xs uppercase tracking-[0.3em]">
              education
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5">
          {edu.map((e, i) => (
            <Reveal key={e.school} delay={i * 100}>
              <Spotlight className="glass rounded-2xl p-8 group h-full">
                <div className="flex items-start gap-5">
                  <div className="font-display text-5xl gradient-text leading-none">
                    0{i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-mono text-white/40 uppercase tracking-[0.3em] mb-2">
                      {e.period}
                    </div>
                    <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-cyan transition-colors">
                      {e.degree}
                    </h3>
                    <div className="text-primary">{e.school}</div>
                    <div className="text-white/40 text-sm mt-1">{e.where}</div>
                  </div>
                </div>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
