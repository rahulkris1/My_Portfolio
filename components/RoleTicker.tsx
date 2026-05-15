"use client";

import { useEffect, useState } from "react";

const roles = [
  "Data Engineer",
  "ETL Architect",
  "Cloud Builder",
  "Pipeline Specialist",
  "Snowflake Engineer",
  "AWS Practitioner",
];

export default function RoleTicker() {
  const [i, setI] = useState(0);
  const [out, setOut] = useState("");
  const [phase, setPhase] = useState<"typing" | "hold" | "deleting">("typing");

  useEffect(() => {
    const word = roles[i];
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (out.length < word.length) {
        t = setTimeout(() => setOut(word.slice(0, out.length + 1)), 60);
      } else {
        t = setTimeout(() => setPhase("hold"), 1200);
      }
    } else if (phase === "hold") {
      t = setTimeout(() => setPhase("deleting"), 1500);
    } else {
      if (out.length > 0) {
        t = setTimeout(() => setOut(out.slice(0, -1)), 30);
      } else {
        setI((i + 1) % roles.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(t);
  }, [out, phase, i]);

  return (
    <span className="inline-flex items-center">
      <span className="gradient-text font-bold">{out}</span>
      <span className="ml-1 inline-block w-[2px] h-[1em] bg-cyan animate-pulse align-middle" />
    </span>
  );
}
