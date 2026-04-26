import { GitBranch, Link, TrendingUp, Code2, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-white/5 py-12 overflow-hidden">
      <div className="orb w-60 h-60 bg-blue-900/20 bottom-0 left-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
              <Code2 size={18} className="text-white" />
            </div>
            <span className="font-semibold text-white text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Gautam<span className="text-blue-400">Dhiman</span>
            </span>
          </div>

          <nav className="flex gap-8">
            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map(link => (
              <button
                key={link}
                onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                className="text-slate-500 hover:text-white text-sm transition-colors"
              >
                {link}
              </button>
            ))}
          </nav>

          <div className="flex gap-3">
            {[GitBranch, Link, TrendingUp].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 glass-card rounded-lg border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/30 transition-all"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-slate-500 text-sm">
            &copy; 2026 Gautam Dhiman. Crafted with precision & passion.
          </p>
          <button
            onClick={scrollTop}
            className="flex items-center gap-2 text-slate-500 hover:text-blue-400 text-sm transition-colors group"
          >
            Back to top
            <div className="w-7 h-7 rounded-full border border-slate-700 group-hover:border-blue-500/50 flex items-center justify-center transition-colors">
              <ArrowUp size={12} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
