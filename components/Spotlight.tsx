"use client";

import { useRef, ReactNode, MouseEvent } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
};

export default function Spotlight({ children, className = "", as = "div" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const Tag: any = as;
  return (
    <Tag ref={ref} onMouseMove={onMove} className={`spotlight ${className}`}>
      {children}
    </Tag>
  );
}
