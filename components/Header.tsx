"use client";

import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");

  const navItems = [
    { name: "home", n: "00" },
    { name: "about", n: "01" },
    { name: "skills", n: "02" },
    { name: "experience", n: "03" },
    { name: "projects", n: "04" },
    { name: "education", n: "05" },
    { name: "contact", n: "06" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    navItems.forEach((n) => {
      const el = document.getElementById(n.name);
      if (el) obs.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-40 transition-all duration-500 ${
        scrolled ? "py-3 bg-ink/70 backdrop-blur-xl border-b border-white/5" : "py-6 bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <a href="#home" className="group flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary via-magenta to-cyan flex items-center justify-center font-display font-black text-ink text-sm">
              R
            </span>
            <span className="text-white font-display font-bold tracking-tight hidden sm:inline">
              kampati
              <span className="text-primary">.</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-1.5">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={`#${item.name}`}
                className={`relative px-4 py-1.5 text-xs uppercase tracking-[0.2em] font-mono rounded-full transition-colors ${
                  active === item.name
                    ? "text-ink bg-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-white text-xs uppercase tracking-[0.2em] font-mono hover:border-primary/40 transition"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" /> hire
          </a>

          <button
            className="md:hidden text-white text-xl"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4 glass rounded-2xl p-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={`#${item.name}`}
                className="flex items-center justify-between py-3 text-white/70 hover:text-white border-b border-white/5 last:border-0"
                onClick={() => setIsOpen(false)}
              >
                <span className="uppercase tracking-widest text-sm">{item.name}</span>
                <span className="font-mono text-xs text-white/30">{item.n}</span>
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
