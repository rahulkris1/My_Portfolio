import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/5 py-10 px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono uppercase tracking-[0.25em] text-white/40">
        <div>© {year} · Rahul Kampati</div>
        <div>Built with Next.js · Tailwind · ❤︎</div>
        <div className="flex gap-5">
          <a href="https://github.com/rahulkampati" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaGithub size={16} />
          </a>
          <a href="https://linkedin.com/in/rahulkampati" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaLinkedin size={16} />
          </a>
          <a href="mailto:rahulkrishkampati@mail.com" className="hover:text-white">
            <FaEnvelope size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
