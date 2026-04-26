import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  opacity: number;
  color: string;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#1d4ed8'];

    particles.current = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 400 + 100,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      vz: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.6 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const fov = 500;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      particles.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        if (p.z < 50) p.z = 500;
        if (p.z > 500) p.z = 50;

        const scale = fov / (fov + p.z);
        const sx = (p.x - cx) * scale + cx;
        const sy = (p.y - cy) * scale + cy;
        const r = p.size * scale;

        // Mouse repulsion
        const dx = sx - mouseRef.current.x;
        const dy = sy - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) {
          p.vx += (dx / dist) * 0.03;
          p.vy += (dy / dist) * 0.03;
        }

        ctx.save();
        ctx.globalAlpha = p.opacity * scale;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(r, 0.3), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw connections
      for (let i = 0; i < particles.current.length; i++) {
        const p1 = particles.current[i];
        const fov1 = fov / (fov + p1.z);
        const sx1 = (p1.x - cx) * fov1 + cx;
        const sy1 = (p1.y - cy) * fov1 + cy;

        for (let j = i + 1; j < particles.current.length; j++) {
          const p2 = particles.current[j];
          const fov2 = fov / (fov + p2.z);
          const sx2 = (p2.x - cx) * fov2 + cx;
          const sy2 = (p2.y - cy) * fov2 + cy;

          const dx = sx1 - sx2;
          const dy = sy1 - sy2;
          const d = Math.sqrt(dx * dx + dy * dy);

          if (d < 100) {
            ctx.save();
            ctx.globalAlpha = (1 - d / 100) * 0.15;
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(sx1, sy1);
            ctx.lineTo(sx2, sy2);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}
