"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number };

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = canvas.offsetWidth * devicePixelRatio);
    let h = (canvas.height = canvas.offsetHeight * devicePixelRatio);
    const COUNT = Math.min(80, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 14000));
    const nodes: Node[] = [];
    const mouse = { x: -9999, y: -9999 };

    for (let i = 0; i < COUNT; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3 * devicePixelRatio,
        vy: (Math.random() - 0.5) * 0.3 * devicePixelRatio,
      });
    }

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) * devicePixelRatio;
      mouse.y = (e.clientY - r.top) * devicePixelRatio;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        // Mouse attraction
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 22500 * devicePixelRatio * devicePixelRatio) {
          const f = 0.0008;
          n.vx += dx * f;
          n.vy += dy * f;
        }
        n.vx *= 0.985;
        n.vy *= 0.985;
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          const max = 160 * devicePixelRatio;
          if (d < max) {
            const alpha = (1 - d / max) * 0.4;
            ctx.strokeStyle = `rgba(124,92,255,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.5 * devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}
