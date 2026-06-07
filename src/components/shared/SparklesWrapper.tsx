'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Spark {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  shape: 'circle' | 'diamond' | 'cross';
}

export default function SparklesWrapper() {
  const [sparks, setSparks] = useState<Spark[]>([]);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      const dx = x - lastPos.current.x;
      const dy = y - lastPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 15) {
        lastPos.current = { x, y };

        // Premium golden shades
        const goldColors = ['#D4AF37', '#FFF3CD', '#FFDF00', '#F3E5AB', '#AA7C11'];
        const shapes: Array<'circle' | 'diamond' | 'cross'> = ['circle', 'diamond', 'cross'];

        const newSpark: Spark = {
          id: Math.random(),
          x,
          y,
          color: goldColors[Math.floor(Math.random() * goldColors.length)],
          size: Math.random() * 8 + 6, // 6px to 14px
          shape: shapes[Math.floor(Math.random() * shapes.length)],
        };

        setSparks((prev) => [...prev.slice(-30), newSpark]);
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  const removeSpark = (id: number) => {
    setSparks((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          className="absolute pointer-events-none"
          initial={{
            x: spark.x - spark.size / 2,
            y: spark.y - spark.size / 2,
            opacity: 1,
            scale: 0.4,
            rotate: 0,
          }}
          animate={{
            x: spark.x - spark.size / 2 + (Math.random() * 60 - 30),
            y: spark.y - spark.size / 2 + (Math.random() * -80 - 20),
            opacity: 0,
            scale: 0,
            rotate: Math.random() * 360 + 180,
          }}
          transition={{
            duration: 1.0,
            ease: 'easeOut',
          }}
          onAnimationComplete={() => removeSpark(spark.id)}
          style={{
            width: spark.size,
            height: spark.size,
            backgroundColor: spark.shape === 'circle' ? spark.color : undefined,
            borderRadius: spark.shape === 'circle' ? '50%' : undefined,
            filter: `drop-shadow(0 0 5px ${spark.color})`,
          }}
        >
          {spark.shape === 'diamond' && (
            <svg viewBox="0 0 100 100" fill={spark.color} className="w-full h-full opacity-90">
              <polygon points="50,0 100,50 50,100 0,50" />
            </svg>
          )}
          {spark.shape === 'cross' && (
            <svg viewBox="0 0 100 100" fill={spark.color} className="w-full h-full opacity-95">
              <path d="M 45,0 h 10 v 45 h 45 v 10 h -45 v 45 h -10 v -45 h -45 v -10 h 45 z" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}
