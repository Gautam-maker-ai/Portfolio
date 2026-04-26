import { useEffect, useRef, useState } from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';

interface Item {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  url: string;
  type: 'Project' | 'Certification';
  category: string;
}

const items: Item[] = [
  {
    id: 1,
    title: 'Waste Management System',
    description: 'Real-time AI analytics dashboard with live visualization.',
    tags: ['React', 'Node.js','Tailwind CSS'],
    image: 'src/assets/management.svg',
    url: 'https://management-waste.vercel.app/',
    type: 'Project',
    category: 'Web App',
  },
  {
    id: 2,
    title: 'Hackathon Website',
    description: 'Real-time AI analytics dashboard with live visualization.',
    tags: ['React', 'Node.js','Tailwind CSS'],
    image: '/src/assets/Xception.jpeg',
    url: 'https://xception.vercel.app/',
    type: 'Project',
    category: 'Web App',
  },
  {
    id: 3,
    title: 'Bank Management System Using C++',
    description: 'Real-time calculations',
    tags: ['Core C++'],
    image: 'src/assets/image.jpeg',
    url: ' https://github.com/Gautam-maker-ai/Cpp-Projects.git',
    type: 'Project',
    category: 'Desktop App',
  },
  {
    id: 4,
    title: 'Smart India Hackathon 2024',
    description: 'Completed SIH certification.',
    tags: ['Hackathon', 'Problem Solving', 'Team Collaboration'],
    image: 'https://images.pexels.com/photos/8177922/pexels-photo-8177922.jpeg',
    url: 'https://drive.google.com/file/d/1-A3LFYz1LFY18LQrl6JsW0EhcWoTCO_o/view?usp=drive_link',
    type: 'Certification',
    category: 'Certification',
  },
  {
    id: 5,
    title: 'Smart India Hackathon 2025',
    description: 'Completed SIH certification.',
    tags: ['Hackathon', 'Problem Solving', 'Team Collaboration'],
    image: 'https://images.pexels.com/photos/8177922/pexels-photo-8177922.jpeg',
    url: 'https://drive.google.com/file/d/1pzet2RGkQkIfI0II1mXYBwFgiTWmNHAE/view?usp=drive_link',
    type: 'Certification',
    category: 'Certification',
  },
  {
    id: 6,
    title: 'Portfolio Certificate',
    description: 'Completed Portfolio certification.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    image: 'https://images.pexels.com/photos/8177922/pexels-photo-8177922.jpeg',
    url: 'https://drive.google.com/file/d/10ZVlZN0CQ4i6u0bW4GJ9gAU9YN4KTTU2/view?usp=drive_link',
    type: 'Certification',
    category: 'Certification',
  },
  {
    id: 7,
    title: 'Ideathon',
    description: 'Completed Ideathon certification.',
    tags: ['Ideathon', 'Innovation', 'Idea Validation'],
    image: 'https://images.pexels.com/photos/8177922/pexels-photo-8177922.jpeg',
    url: 'https://drive.google.com/file/d/1pEApX1wf-fjqZ5UR9AvlouxtFk7wmILH/view?usp=drive_link',
    type: 'Certification',
    category: 'Certification',
  },
  {
    id: 8,
    title: 'Hack With India',
    description: 'Completed HWI certification.',
    tags: ['Innovation', 'Problem Solving', 'Team Collaboration'],
    image: 'https://images.pexels.com/photos/8177922/pexels-photo-8177922.jpeg',
    url: 'https://drive.google.com/file/d/1yj_j-rRf46eZz15Ahb16rDpbZ8uwWfAH/view?usp=drive_link',
    type: 'Certification',
    category: 'Certification',
  },
  {
    id: 9,
    title: 'Git Finity Certificate',
    description: 'Completed Git Finity certification.',
    tags: ['Git', 'GitHub', 'Version Control'],
    image: 'https://images.pexels.com/photos/8177922/pexels-photo-8177922.jpeg',
    url: 'https://drive.google.com/file/d/1mD2hp_8z5SaOD6NHDdMXiUZxkK3WWg1q/view?usp=drive_link',
    type: 'Certification',
    category: 'Certification',
  },
  {
    id: 10,
    title: 'Code Bash Certificate',
    description: 'Completed Code Bash certification.',
    tags: ['Programming', 'Problem Solving', 'Coding Contest'],
    image: 'https://images.pexels.com/photos/8177922/pexels-photo-8177922.jpeg',
    url: 'https://drive.google.com/file/d/1Z1ZXjYYfl1JTcqOVgkPaUYV_XQ3uP-nS/view?usp=drive_link',
    type: 'Certification',
    category: 'Certification',
  },
  {
    id: 11,
    title: 'Code Rush Certificate',
    description: 'Completed Code Rush certification.',
    tags: ['C++', 'Problem Solving', 'Algorithms'],
    image: 'https://images.pexels.com/photos/8177922/pexels-photo-8177922.jpeg',
    url: 'https://drive.google.com/file/d/1yj_j-rRf46eZz15Ahb16rDpbZ8uwWfAH/view?usp=drive_link',
    type: 'Certification',
    category: 'Certification',
  },
];

const filterTabs = ['All', 'Project', 'Certification'];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState('All');
  const [hovered, setHovered] = useState<number | null>(null);

  const filtered =
    filter === 'All' ? items : items.filter(item => item.type === filter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          entry.target.querySelectorAll('.section-animate').forEach((el, i) => {
            if (entry.isIntersecting) {
              setTimeout(() => el.classList.add('visible'), i * 100);
            }
          });
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative py-28 overflow-hidden grid-bg">
      <div className="orb w-80 h-80 bg-blue-800/20 bottom-0 left-0" />
      <div className="orb w-60 h-60 bg-sky-800/15 top-0 right-1/4" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        
        {/* Heading */}
        <div className="section-animate text-center mb-12">
          <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">
            My Work
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Projects & <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            A collection of my projects and certifications showcasing my skills and learning journey.
          </p>
        </div>

        {/* Filter */}
        <div className="section-animate flex justify-center gap-3 mb-12">
          {filterTabs.map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2 rounded-full text-sm transition ${
                filter === tab
                  ? 'bg-blue-600 text-white'
                  : 'glass-card text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item, i) => (
            <div
              key={item.id}
              className="section-animate glass-card rounded-2xl border border-blue-500/10 overflow-hidden group"
              style={{ transitionDelay: `${i * 0.08}s` }}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Type Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
                  {item.type}
                </div>

                {/* Category */}
                <div className="absolute top-4 right-4 px-3 py-1 glass text-slate-300 text-xs rounded-full">
                  {item.category}
                </div>

                {/* Hover Button */}
                <div className={`absolute inset-0 flex items-center justify-center transition ${
                  hovered === item.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <a
                    href={item.url}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-blue-600"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400">
                  {item.title}
                </h3>

                <p className="text-slate-400 text-sm mb-4">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-1 py-1 text-xs bg-blue-500/10 text-blue-400 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Button */}
                <a
                  href={item.url}
                  className="inline-flex items-center gap-2 text-blue-400 text-sm hover:text-blue-300"
                >
                  {item.type === 'Project' ? 'View Project' : 'View Certificate'}
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="section-animate text-center mt-14">
          <a
            href="https://github.com/Gautam-maker-ai"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 border border-blue-500/20 text-white rounded-xl hover:bg-blue-600/10"
          >
            View More Work
          </a>
        </div>
      </div>
    </section>
  );
}
