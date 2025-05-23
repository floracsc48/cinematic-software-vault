
import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  opacity: number;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
      }
    };

    const initParticles = () => {
      const numParticles = Math.floor((window.innerWidth * window.innerHeight) / 25000);
      particlesRef.current = [];

      for (let i = 0; i < numParticles; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1,
          color: `rgba(${30 + Math.random() * 30}, ${100 + Math.random() * 50}, ${200 + Math.random() * 55}, 0.5)`,
          vx: Math.random() * 0.2 - 0.1,
          vy: Math.random() * 0.2 - 0.1,
          opacity: 0.1 + Math.random() * 0.3
        });
      }
    };

    const draw = () => {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace('0.5', particle.opacity.toString());
        ctx.fill();
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1;
        }

        // Slowly vary opacity for a pulsing effect
        particle.opacity += Math.random() * 0.01 - 0.005;
        particle.opacity = Math.max(0.1, Math.min(0.4, particle.opacity));
      });

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animationFrameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
};

export default ParticleBackground;
