"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  to: number;
  suffix?: string;
  duration?: number;
  format?: (n: number) => string;
};

export default function CountUp({
  to,
  suffix = "",
  duration = 1600,
  format,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              setVal(to * eased);
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);

  const display = format ? format(val) : Math.round(val).toString();
  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
