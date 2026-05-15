"use client";

import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div
        className="blob"
        style={{
          bottom: "10%",
          left: "20%",
          width: 500,
          height: 500,
          background: "#7c5cff",
        }}
      />
      <div
        className="blob"
        style={{
          top: "10%",
          right: "10%",
          width: 400,
          height: 400,
          background: "#22d3ee",
          animationDelay: "3s",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-xs font-mono uppercase tracking-[0.4em] text-white/40 mb-6">
              06 · let&apos;s build something
            </p>
            <h2 className="font-display text-[14vw] md:text-[10vw] font-bold leading-[0.85] tracking-tight gradient-text">
              say hi.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="max-w-2xl mx-auto text-center">
            <MagneticButton
              href="mailto:rahulkrishkampati@mail.com"
              className="text-2xl md:text-4xl font-display font-bold fancy-link text-white"
            >
              rahulkrishkampati@mail.com
            </MagneticButton>

            <div className="mt-12 flex items-center justify-center gap-8">
              <a
                href="https://github.com/rahulkampati"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
                aria-label="GitHub"
              >
                <FaGithub size={22} />
              </a>
              <a
                href="https://linkedin.com/in/rahulkampati"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={22} />
              </a>
              <a
                href="mailto:rahulkrishkampati@mail.com"
                className="w-14 h-14 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
                aria-label="Email"
              >
                <FaEnvelope size={20} />
              </a>
            </div>

            <div className="mt-16 flex justify-center gap-10 text-xs font-mono uppercase tracking-[0.3em] text-white/40">
              <div>
                <div className="text-white/30 mb-1">phone</div>
                <div className="text-white/70">(201) 780-0026</div>
              </div>
              <div>
                <div className="text-white/30 mb-1">location</div>
                <div className="text-white/70">Atlanta · GA</div>
              </div>
              <div>
                <div className="text-white/30 mb-1">status</div>
                <div className="text-lime flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                  open
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
