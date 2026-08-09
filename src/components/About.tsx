import { useEffect, useRef } from 'react';
import { Award, Coffee, Rocket, Users } from 'lucide-react';

const stats = [
  { icon: Award, value: '1+', label: 'Years Experience', color: 'text-blue-400' },
  { icon: Rocket, value: '5+', label: 'Projects Shipped', color: 'text-sky-400' },
  { icon: Users, value: '10+', label: 'Happy Clients', color: 'text-teal-400' },
  { icon: Coffee, value: '∞', label: 'Cups of Coffee', color: 'text-amber-400' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          entry.target.querySelectorAll('.section-animate').forEach((el, i) => {
            if (entry.isIntersecting) {
              setTimeout(() => el.classList.add('visible'), i * 120);
            }
          });
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-28 overflow-hidden">
      <div className="orb w-80 h-80 bg-blue-800/20 top-0 right-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section heading */}
        <div className="section-animate text-center mb-16">
          <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">About Me</p>
          <h2
            className="text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Who I <span className="gradient-text">Am</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Image with 3D frame */}
          <div className="section-animate relative flex justify-center">
            <div className="relative w-80 h-80">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/20 to-transparent border border-blue-500/20 rotate-3" />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tl from-sky-600/10 to-transparent border border-sky-500/10 -rotate-3" />

              <img
                src="https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Profile"
                className="relative z-10 w-full h-full object-cover rounded-3xl"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-[#050a14]/50 to-transparent z-20" />

              {/* Tech stack badge */}
              <div className="absolute -bottom-6 -right-6 z-30 glass-card rounded-2xl p-4 border border-blue-500/20">
                <div className="flex gap-2">
                  {['⚛️', '🟦', '🟢', '🌊'].map((emoji, i) => (
                    <span key={i} className="text-xl">{emoji}</span>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-1">Tech Stack</p>
              </div>
            </div>
          </div>

          {/* Right — Content */}
          <div>
            <div className="section-animate">
              <h3
                className="text-2xl font-bold text-white mb-4"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Crafting Digital Experiences with{' '}
                <span className="gradient-text">Passion & Precision</span>
              </h3>
              <p className="text-slate-400 leading-relaxed mb-4">
                I am a passionate Third-year Computer Science Engineering (Data Science)
                student at Chandigarh Engineering College, CGC Landran. 
                I have strong technical skills in frontend development, along with a solid foundation in backend development,
                and strong knowledge of C++ and C programming languages.
                I am continuously working on improving my problem-solving abilities and building efficient, scalable solutions.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
               I actively participate in hackathons, coding competitions, and technical clubs, where I collaborate with peers to develop real-world projects. 
               These experiences have enhanced my teamwork and practical skills. Currently, I am focused on expanding my expertise in full-stack web development to 
               create impactful and user-centric web applications.
              </p>
            </div>

            <div className="section-animate grid grid-cols-2 gap-4 mb-8">
              {[
                { label: 'Name', value: 'Gautam Dhiman' },
                { label: 'Role', value: 'Aspiring Developer' },
                { label: 'Location', value: 'Ambala Cantt' },
                { label: 'Status', value: 'Open to Work' },
              ].map(({ label, value }) => (
                <div key={label} className="glass-card rounded-xl p-4 border border-blue-500/10">
                  <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-white font-medium text-sm">{value}</p>
                </div>
              ))}
            </div>

            <div className="section-animate flex gap-4">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all magnetic-btn"
              >
                Get In Touch
              </button>
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 glass border border-white/10 hover:border-blue-500/30 text-white font-semibold rounded-xl transition-all hover:bg-blue-600/10"
              >
                See Projects
              </button>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="section-animate mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, value, label, color }) => (
            <div
              key={label}
              className="glass-card rounded-2xl p-6 border border-blue-500/10 text-center card-3d group"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600/10 ${color} mb-4 group-hover:scale-110 transition-transform`}>
                <Icon size={22} />
              </div>
              <div
                className={`text-3xl font-bold ${color} mb-1`}
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {value}
              </div>
              <div className="text-slate-400 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
