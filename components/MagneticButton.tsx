"use client";

import { ReactNode, useRef, MouseEvent } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
};

export default function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  strength = 0.35,
}: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `translate3d(0,0,0)`;
  };

  const sharedProps = {
    ref: ref as any,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    className: `inline-block transition-transform duration-300 ease-out ${className}`,
    style: { willChange: "transform" } as any,
  };

  if (href) {
    return (
      <a href={href} {...sharedProps}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} {...sharedProps}>
      {children}
    </button>
  );
}
