import { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';

const links = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('Home');

  useEffect(() => {
  const onScroll = () => {
    setScrolled(window.scrollY > 50);

    const sections = links
      .map(l => document.getElementById(l.toLowerCase()))
      .filter(Boolean) as HTMLElement[];

    const current = [...sections].reverse().find(
      s => s.getBoundingClientRect().top <= 120
    );

    if (current) {
      setActive(
        current.id.charAt(0).toUpperCase() + current.id.slice(1)
      );
    }
  };

  window.addEventListener('scroll', onScroll);
  return () => window.removeEventListener('scroll', onScroll);
}, []);
  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    el?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#050a14]/90 backdrop-blur-xl border-b border-white/5 py-3'
          : 'py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <button onClick={() => scrollTo('home')} className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
            <Code2 size={18} className="text-white" />
          </div>
          <span className="font-semibold text-white text-lg tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Gautam<span className="text-blue-400">Dhiman</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className={`nav-link text-sm font-medium transition-colors ${
                active === link ? 'text-blue-400 active' : 'text-slate-400 hover:text-white'
              }`}
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => scrollTo('Contact')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-all hover:shadow-lg hover:shadow-blue-500/25 magnetic-btn"
          >
            Hire Me
          </button>
        </div>

        <button
          className="md:hidden text-slate-400 hover:text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#050a14]/95 backdrop-blur-xl border-b border-white/5 py-4">
          {links.map(link => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="block w-full text-left px-6 py-3 text-slate-300 hover:text-white hover:bg-blue-600/10 transition-colors"
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
