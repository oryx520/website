"use client";
import React, { useEffect, useRef } from "react";

const G = 6.67430e-11;
const { innerWidth: canvasWidth, innerHeight: canvasHeight } = window;

interface Body {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  color: string;
}

const getRandomPosition = (min: number, max: number): number => Math.random() * (max - min) + min;

// Initialize bodies with randomized positions and a fixed mass
const bodies: Body[] = Array.from({ length: 3 }, () => ({
  x: getRandomPosition(0.45 * canvasWidth, 0.75 * canvasWidth),
  y: getRandomPosition(0.35 * canvasHeight, 0.65 * canvasHeight),
  vx: 0,
  vy: 0,
  mass: 8e10,
  color: "grey"
}));

const Santi: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Calculate the gravitational force between two bodies
  const calculateForce = (body1: Body, body2: Body): { fx: number, fy: number } => {
    const dx = body2.x - body1.x;
    const dy = body2.y - body1.y;
    const distance = Math.hypot(dx, dy);
    if (distance < 10) return { fx: 0, fy: 0 };

    const force = (G * body1.mass * body2.mass) / (distance ** 2);
    const fx = force * dx / distance;
    const fy = force * dy / distance;
    return { fx, fy };
  };

  // Update positions and velocities of bodies using Euler's method
  const updateBodies = () => {
    const forces = bodies.map(() => ({ fx: 0, fy: 0 }));

    bodies.forEach((body1, i) => {
      bodies.slice(i + 1).forEach((body2, j) => {
        const { fx, fy } = calculateForce(body1, body2);
        forces[i].fx += fx;
        forces[i].fy += fy;
        forces[i + j + 1].fx -= fx;  // Equal and opposite forces
        forces[i + j + 1].fy -= fy;
      });
    });

    bodies.forEach((body, i) => {
      const { fx, fy } = forces[i];
      const ax = fx / body.mass, ay = fy / body.mass;
      body.vx += ax;
      body.vy += ay;
      body.x += body.vx;
      body.y += body.vy;
    });
  };

  // Draw the bodies on the canvas
  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    bodies.forEach(({ x, y, color }) => {
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    });
  };

  useEffect(() => {
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
  }, []);

  return <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />;
};

export default Santi;
