"use client";
import React, { useEffect, useRef } from "react";

const G = 6.67430e-11;
const bodyColour = "rgba(164, 164, 164)";
const canvasWidth = 1400;
const canvasHeight = 600;

interface Body {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  color: string;
  impressions: { x: number; y: number }[];
}

const getRandomPosition = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

const bodies: Body[] = [
  { x: getRandomPosition(0.65 * canvasWidth, 0.75 * canvasWidth), 
    y: getRandomPosition(0.45 * canvasHeight, 0.5 * canvasHeight), 
    vx: 0, vy: 0, mass: 8e10, color: bodyColour, impressions: [] 
  },
  { x: getRandomPosition(0.6 * canvasWidth, 0.65 * canvasWidth), 
    y: getRandomPosition(0.55 * canvasHeight, 0.6 * canvasHeight), 
    vx: 0, vy: 0, mass: 8e10, color: bodyColour, impressions: [] 
  },
  { x: getRandomPosition(0.65 * canvasWidth, 0.75 * canvasWidth), 
    y: getRandomPosition(0.55 * canvasHeight, 0.6 * canvasHeight), 
    vx: 0, vy: 0, mass: 8e10, color: bodyColour, impressions: [] 
  }
];

const Santi: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const calculateForce = (body1: Body, body2: Body): { fx: number, fy: number } => {
    const dx = body2.x - body1.x;
    const dy = body2.y - body1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 10) return { fx: 0, fy: 0 };

    const force = (G * body1.mass * body2.mass) / (distance * distance);
    const fx = force * dx / distance;
    const fy = force * dy / distance;

    return { fx, fy };
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    bodies.forEach((body) => {
      body.impressions.forEach((impression, index) => {
        const alpha = 0.05 * (index/ 240); // Gradually decrease opacity
        const radius = 2; // Thinner trail
        ctx.beginPath();
        ctx.arc(impression.x, impression.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(128, 128, 128, ${alpha})`;
        ctx.fill();
      });

      ctx.beginPath();
      ctx.arc(body.x, body.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = body.color;
      ctx.fill();
    });
  };

  useEffect(() => {
    const updateBodies = () => {
      const forces: { fx: number, fy: number }[] = bodies.map(() => ({ fx: 0, fy: 0 }));

      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          const { fx, fy } = calculateForce(bodies[i], bodies[j]);
          forces[i].fx += fx;
          forces[i].fy += fy;
          forces[j].fx -= fx;
          forces[j].fy -= fy;
        }
      }
      
      for (let i = 0; i < bodies.length; i++) {
        const ax = forces[i].fx / bodies[i].mass;
        const ay = forces[i].fy / bodies[i].mass;
        bodies[i].vx += ax;
        bodies[i].vy += ay;
        bodies[i].x += bodies[i].vx;
        bodies[i].y += bodies[i].vy;

        bodies[i].impressions.push({ x: bodies[i].x, y: bodies[i].y });
        if (bodies[i].impressions.length > 480) {
          bodies[i].impressions.shift();
        }
      }
    };

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      updateBodies();
      draw(ctx);
      requestAnimationFrame(animate);
    };

    animate();
    const animationFrameId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />;
};

export default Santi;
