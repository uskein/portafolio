import { useEffect, useRef } from "react";

export default function BattleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const particles: {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      color: string;
      type: "square" | "diamond" | "star";
      rotation: number;
      rotSpeed: number;
    }[] = [];

    const colors = ["#e94560", "#f5c542", "#4ecca3", "#00d2d3", "#a855f7", "#0f3460"];

    const createParticles = () => {
      particles.length = 0;
      const count = Math.floor(window.innerWidth / 30);

      for (let i = 0; i < count; i++) {
        const types: Array<"square" | "diamond" | "star"> = ["square", "diamond", "star"];
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 4 + 2,
          speedY: -(Math.random() * 0.4 + 0.05),
          speedX: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.4 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
          type: types[Math.floor(Math.random() * types.length)],
          rotation: 0,
          rotSpeed: (Math.random() - 0.5) * 0.02,
        });
      }
    };

    const drawSquare = (x: number, y: number, size: number, opacity: number, color: string) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.fillRect(x - size / 2, y - size / 2, size, size);
      ctx.restore();
    };

    const drawDiamond = (x: number, y: number, size: number, opacity: number, color: string, rotation: number) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(size, 0);
      ctx.lineTo(0, size);
      ctx.lineTo(-size, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawStar = (x: number, y: number, size: number, opacity: number, color: string) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        const outerX = x + Math.cos(angle) * size;
        const outerY = y + Math.sin(angle) * size;
        const innerAngle = angle + Math.PI / 4;
        const innerX = x + Math.cos(innerAngle) * size * 0.3;
        const innerY = y + Math.sin(innerAngle) * size * 0.3;
        if (i === 0) ctx.moveTo(outerX, outerY);
        else ctx.lineTo(outerX, outerY);
        ctx.lineTo(innerX, innerY);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      time += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }

        switch (p.type) {
          case "square":
            drawSquare(p.x, p.y, p.size, p.opacity, p.color);
            break;
          case "diamond":
            drawDiamond(p.x, p.y, p.size, p.opacity, p.color, p.rotation);
            break;
          case "star":
            drawStar(p.x, p.y, p.size, p.opacity * (0.5 + Math.sin(time * 2 + p.x) * 0.5), p.color);
            break;
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    window.addEventListener("resize", () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.5 }}
    />
  );
}
