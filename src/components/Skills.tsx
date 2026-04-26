import { useEffect, useRef, useState } from 'react';

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

const categories: SkillCategory[] = [
  {
    title: 'Frontend & Backend',
    icon: '⚛️',
    skills: [
      { name: 'React / Next.js', level: 93, color: '#60a5fa' },
      { name: 'TypeScript', level: 85, color: '#38bdf8' },
      { name: 'HTML / Tailwind CSS', level: 92, color: '#2dd4bf' },
      { name: 'Three.js', level: 75, color: '#818cf8' },
      { name: 'Node.js / Express', level: 88, color: '#4ade80' },
    ],
  },
  {
    title: 'Programming Languages',
    icon: '🟢',
    skills: [
      { name: 'C Language', level: 95, color: '#60a5fa' },
      { name: 'C++', level: 97, color: '#60a5fa' },
      { name: 'Javascript', level: 75, color: '#60a5fa' },
    ],
  },
  {
    title: 'Tools & DevOps',
    icon: '🛠️',
    skills: [
      { name: 'Git / GitHub', level: 92, color: '#f87171' },
      { name: 'Figma / Design', level: 78, color: '#e879f9' },
    ],
  },
];

const techBadges = [
  'Supabase', 'Redux','Vite',
];

function SkillBar({ skill, visible }: { skill: Skill; visible: boolean }) {
  return (
    <div className="mb-5">
      <div className="flex justify-between mb-2">
        <span className="text-slate-300 text-sm font-medium">{skill.name}</span>
        <span className="text-slate-500 text-sm">{skill.level}%</span>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="skill-bar-fill h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: visible ? `${skill.level}%` : '0%',
            background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true);
            entry.target.querySelectorAll('.section-animate').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative py-28 dot-bg overflow-hidden">
      <div className="orb w-96 h-96 bg-blue-900/25 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="section-animate text-center mb-16">
          <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">What I Know</p>
          <h2
            className="text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            A curated set of technologies I've honed over years of building production applications.
          </p>
        </div>

        {/* Skill categories */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {categories.map((cat, ci) => (
            <div
              key={cat.title}
              className="section-animate glass-card rounded-2xl p-8 border border-blue-500/10 card-3d"
              style={{ transitionDelay: `${ci * 0.15}s` }}
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="text-2xl">{cat.icon}</span>
                <h3
                  className="text-lg font-bold text-white"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {cat.title}
                </h3>
              </div>
              {cat.skills.map(skill => (
                <SkillBar key={skill.name} skill={skill} visible={visible} />
              ))}
            </div>
          ))}
        </div>

        {/* Tech badge cloud */}
        <div className="section-animate">
          <p className="text-center text-slate-500 text-sm mb-6">Also familiar with</p>
          <div className="flex flex-wrap justify-center gap-3">
            {techBadges.map((badge, i) => (
              <span
                key={badge}
                className="px-4 py-2 glass-card rounded-full text-slate-400 text-sm border border-blue-500/10 hover:border-blue-500/40 hover:text-blue-400 transition-all cursor-default"
                style={{
                  animationDelay: `${i * 0.05}s`,
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
