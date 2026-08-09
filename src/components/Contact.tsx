import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
// import { createClient } from '@supabase/supabase-js';
import emailjs from '@emailjs/browser';

// const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL!,
//   import.meta.env.VITE_SUPABASE_ANON_KEY!
// );

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'gautamdhiman8708311909@gmail.com',
    href: 'mailto:gautamdhiman8708311909@gmail.com',
    color: 'text-blue-400',
    bg: 'bg-blue-600/10',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 8708311909',
    href: 'tel:+91 8708311909',
    color: 'text-teal-400',
    bg: 'bg-teal-600/10',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Ambala Cantt',
    href: '#',
    color: 'text-sky-400',
    bg: 'bg-sky-600/10',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null); // ✅ EmailJS

  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Partial<FormData>>({});

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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const validate = (): boolean => {
    const errs: Partial<FormData> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) errs.email = 'Valid email required';
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    if (form.message.trim().length < 20) errs.message = 'Message must be at least 20 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validate()) return;

  setStatus('loading');

  try {
    await emailjs.sendForm(
      'service_whliavc',
      'template_n5ycca9',
      formRef.current!,
      'WOa2XEnT5lips_71-'
    );

    setStatus('success');

    setForm({
      name: '',
      email: '',
      subject: '',
      message: '',
    });

    setErrors({});

    setTimeout(() => {
      setStatus('idle');
    }, 5000);

  } catch (error) {
    console.error('EmailJS Error:', error);
    setStatus('error');

    setTimeout(() => {
      setStatus('idle');
    }, 4000);
  }
};

  const onChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3 glass-card border rounded-xl text-white text-sm placeholder-slate-500 outline-none transition-all focus:border-blue-500/60 focus:bg-blue-600/5 ${
      errors[field] ? 'border-red-500/50' : 'border-blue-500/15'
    }`;

  return (
    <section id="contact" ref={sectionRef} className="relative py-28 overflow-hidden">
      <div className="orb w-80 h-80 bg-blue-800/20 top-0 right-0" />
      <div className="orb w-60 h-60 bg-sky-900/20 bottom-0 left-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="section-animate text-center mb-16">
          <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">Get In Touch</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Let's <span className="gradient-text">Work Together</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
  
  {/* LEFT */}
  <div className="lg:col-span-2 space-y-6">

    {contactInfo.map(({ icon: Icon, label, value, href, color, bg }, index) => (
      <a key={index} href={href} className="flex items-center gap-4 p-4 glass-card rounded-2xl border">
        <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={20} />
        </div>
        <div>
          <p className="text-slate-500 text-xs">{label}</p>
          <p className="text-white text-sm font-medium">{value}</p>
        </div>
      </a>
    ))}

    {/* ✅ Availability Card (YAHI ADD KARNA HAI) */}
    <div className="section-animate glass-card rounded-2xl p-5 border border-green-500/20">
      <div className="flex items-center gap-3 mb-2">
        <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
        <span className="text-green-400 font-semibold text-sm">
          Available for Projects
        </span>
      </div>
      <p className="text-slate-400 text-xs leading-relaxed">
        Currently accepting new freelance projects and open-source collaborations.
        Response time: within 24 hours.
      </p>
    </div>

  </div>

          {/* RIGHT FORM */}
          <div className="lg:col-span-3 section-animate">
            <form
              ref={formRef} // ✅ IMPORTANT
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl border border-blue-500/10 p-8 space-y-4"
            >
              <input name="name" value={form.name} onChange={onChange('name')} placeholder="Name" className={inputClass('name')} />
              <input name="email" value={form.email} onChange={onChange('email')} placeholder="Email" className={inputClass('email')} />
              <input name="subject" value={form.subject} onChange={onChange('subject')} placeholder="Subject" className={inputClass('subject')} />
              <textarea name="message" value={form.message} onChange={onChange('message')} placeholder="Message" className={inputClass('message')} />

              {status === 'success' && <p className="text-green-400">Message sent ✅</p>}
              {status === 'error' && <p className="text-red-400">Error ❌</p>}

              <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded">
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}