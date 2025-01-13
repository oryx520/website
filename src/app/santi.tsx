"use client";
import React, { useEffect, useRef } from "react";

const G = 6.67430e-11;
const canvasWidth = 2000;
const canvasHeight = 500;

interface Body {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  color: string;
}

// Initial positions, velocities
const getRandomPosition = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
  };
  
  const bodies: Body[] = [
    { x: getRandomPosition(0.45 * canvasWidth, 0.75 * canvasWidth), 
      y: getRandomPosition(0.35 * canvasHeight, 0.65 * canvasHeight), 
      vx: 0, vy: 0, mass: 8e10, color: "grey" 
    },
    { x: getRandomPosition(0.45 * canvasWidth, 0.75 * canvasWidth), 
      y: getRandomPosition(0.35 * canvasHeight, 0.65 * canvasHeight), 
      vx: 0, vy: 0, mass: 8e10, color: "grey" 
    },
    { 
 x: getRandomPosition(0.45 * canvasWidth, 0.5 * canvasWidth), 
      y: getRandomPosition(0.35 * canvasHeight, 0.65 * canvasHeight), 
      vx: 0, vy: 0, mass: 8e10, color: "grey" 
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
    const fx = force * dx / distance; // Gravitational force 
    const fy = force * dy / distance;
  
    return { fx, fy };
  };

  // Draw the bodies on the canvas
  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Clear canvas
    bodies.forEach((body) => {
      ctx.beginPath();
      ctx.arc(body.x, body.y, 10, 0, Math.PI * 2); // Draw a circle for each body
      ctx.fillStyle = body.color;
      ctx.fill();
    });
  };

  useEffect(() => {
    // Update positions and velocities of the bodies using Euler's method
    const updateBodies = () => {
        const forces: { fx: number, fy: number }[] = bodies.map(() => ({ fx: 0, fy: 0 }));

        for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
            const { fx, fy } = calculateForce(bodies[i], bodies[j]);
            forces[i].fx += fx;
            forces[i].fy += fy;
            forces[j].fx -= fx; // Action and reaction are equal and opposite
            forces[j].fy -= fy;
        }
        }
        for (let i = 0; i < bodies.length; i++) {
        const ax = forces[i].fx / bodies[i].mass; // Acceleration in x direction
        const ay = forces[i].fy / bodies[i].mass; // Acceleration in y direction
        bodies[i].vx += ax;
        bodies[i].vy += ay;
        bodies[i].x += bodies[i].vx;
        bodies[i].y += bodies[i].vy;
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