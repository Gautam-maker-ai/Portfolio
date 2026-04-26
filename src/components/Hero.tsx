import { useEffect, useRef, useState } from 'react';
import { ArrowDown, GitBranch, Link, TrendingUp, Download } from 'lucide-react';

const roles = ['Full Stack Developer', 'UI/UX Designer', '3D Web Enthusiast', 'Creative Coder'];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const cubeRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const rotRef = useRef({ x: 10, y: 0 });

  // Typing effect
  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex(i => (i + 1) % roles.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(prev =>
          isDeleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
        );
      }, isDeleting ? 50 : 80);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  // 3D cube mouse tracking
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      const target = {
        x: (mouseRef.current.y / window.innerHeight - 0.5) * 30,
        y: (mouseRef.current.x / window.innerWidth - 0.5) * 30,
      };
      rotRef.current.x += (target.x - rotRef.current.x) * 0.05;
      rotRef.current.y += (target.y - rotRef.current.y) * 0.05;

      if (cubeRef.current) {
        cubeRef.current.style.transform = `rotateX(${rotRef.current.x}deg) rotateY(${rotRef.current.y}deg)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden grid-bg">
      {/* Orb backgrounds */}
      <div className="orb w-96 h-96 bg-blue-700/20 top-1/4 -left-20" />
      <div className="orb w-80 h-80 bg-blue-500/10 bottom-1/4 right-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/20 text-blue-400 text-sm font-medium mb-8 floating">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for Work
            </div>

            <h1
              className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Hi, I'm{' '}
              <span className="gradient-text">Gautam</span>
              <br />
              <span className="text-slate-300">Dhiman</span>
            </h1>

            <div className="h-14 mb-6">
              <p className="text-xl lg:text-2xl text-slate-400 font-light">
                <span className="text-blue-400 font-medium typing-cursor">{displayText}</span>
              </p>
            </div>

            <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-xl">
              I craft immersive digital experiences with clean code and cutting-edge technology.
              Turning complex ideas into elegant, high-performance web applications.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all magnetic-btn"
              >
                View My Work
              </button>
              <a
                href="https://drive.google.com/file/d/1lyHE9Ct0q9s-fgMLRDE3CXBUd_61iGF0/view?usp=drive_link"
                className="px-8 py-4 glass border border-white/10 hover:border-blue-500/40 text-white font-semibold rounded-xl transition-all flex items-center gap-2 hover:bg-blue-600/10"
              >
                <Download size={18} />
                Resume
              </a>
            </div>

            <div className="flex items-center gap-6">
              <span className="text-slate-500 text-sm">Follow me</span>
              <div className="h-px flex-1 max-w-16 bg-slate-800" />
              <div className="flex gap-4">
                {[
                  { icon: GitBranch, href: 'https://github.com/Gautam-maker-ai' },
                  { icon: Link, href: 'https://www.linkedin.com/in/gautam-dhiman-585b0b313/' },
                  { icon: TrendingUp, href: 'https://www.instagram.com/_gautam_dhiman_?igsh=MXQ0ZXlydGIydGF5Mg==' },
                ].map(({ icon: Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="w-10 h-10 rounded-lg glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/40 hover:bg-blue-600/10 transition-all"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — 3D Cube + floating badges */}
          <div className="relative flex items-center justify-center h-[500px]">
            {/* Glow ring */}
            <div className="absolute w-72 h-72 rounded-full border border-blue-600/20 animate-spin" style={{ animationDuration: '20s' }} />
            <div className="absolute w-56 h-56 rounded-full border border-blue-500/15 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />

            {/* 3D Cube */}
            <div className="perspective-container w-44 h-44">
              <div
                ref={cubeRef}
                className="relative w-full h-full"
                style={{ transformStyle: 'preserve-3d', transition: 'none' }}
              >
                {/* Cube faces */}
                {[
                  { label: 'React', bg: 'from-blue-600/80 to-blue-800/80', transform: 'translateZ(72px)' },
                  { label: 'Node', bg: 'from-green-600/80 to-green-800/80', transform: 'translateZ(-72px) rotateY(180deg)' },
                  { label: 'TypeScript', bg: 'from-sky-600/80 to-sky-800/80', transform: 'translateX(72px) rotateY(90deg)' },
                  { label: 'Three.js', bg: 'from-slate-600/80 to-slate-800/80', transform: 'translateX(-72px) rotateY(-90deg)' },
                  { label: 'Tailwind', bg: 'from-teal-600/80 to-teal-800/80', transform: 'translateY(-72px) rotateX(90deg)' },
                  { label: 'Supabase', bg: 'from-emerald-600/80 to-emerald-800/80', transform: 'translateY(72px) rotateX(-90deg)' },
                ].map(({ label, bg, transform }) => (
                  <div
                    key={label}
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${bg} border border-white/20 flex items-center justify-center text-white font-bold text-sm`}
                    style={{
                      transform,
                      backfaceVisibility: 'hidden',
                      width: '144px',
                      height: '144px',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Floating stat badges */}
            <div className="absolute top-8 right-8 glass-card rounded-2xl px-4 py-3 border border-blue-500/20 floating" style={{ animationDelay: '0.5s' }}>
              <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>1+</div>
              <div className="text-xs text-slate-400">Years Exp.</div>
            </div>

            <div className="absolute bottom-12 left-4 glass-card rounded-2xl px-4 py-3 border border-blue-500/20 floating" style={{ animationDelay: '1s' }}>
              <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>5+</div>
              <div className="text-xs text-slate-400">Projects</div>
            </div>

            <div className="absolute bottom-8 right-0 glass-card rounded-2xl px-4 py-3 border border-blue-500/20 floating" style={{ animationDelay: '1.5s' }}>
              <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>10+</div>
              <div className="text-xs text-slate-400">Clients</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500">
          <span className="text-xs">Scroll down</span>
          <ArrowDown size={16} className="animate-bounce" />
        </div>
      </div>
    </section>
  );
}
