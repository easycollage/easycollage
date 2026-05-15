"use client";

import { useEffect, useRef, useState } from "react";

interface StatItem {
  value: string;
  label: string;
}

interface AnimatedStatsProps {
  stats: StatItem[];
}

function splitStatValue(value: string) {
  const match = value.match(/^(\d+)(.*)$/);

  if (!match) {
    return { target: 0, suffix: value, canAnimate: false };
  }

  return {
    target: Number(match[1]),
    suffix: match[2] ?? "",
    canAnimate: true,
  };
}

export function AnimatedStats({ stats }: AnimatedStatsProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let frameId = 0;
    const duration = 1200;
    const start = performance.now();

    function animate(now: number) {
      const elapsed = now - start;
      const nextProgress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - nextProgress, 3);

      setProgress(eased);

      if (nextProgress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    }

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [hasStarted]);

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 pt-12 border-t border-gray-100"
    >
      {stats.map((stat) => {
        const { target, suffix, canAnimate } = splitStatValue(stat.value);
        const value = canAnimate ? `${Math.round(target * progress)}${suffix}` : stat.value;

        return (
          <div
            key={stat.label}
            className="rounded-xl border border-white/80 bg-white/75 px-4 py-5 text-center shadow-sm shadow-green-900/[0.04] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-100 hover:shadow-lg hover:shadow-green-900/[0.07]"
          >
            <div className="font-display font-bold text-3xl text-green-600 mb-1 tabular-nums">
              {hasStarted ? value : canAnimate ? `0${suffix}` : stat.value}
            </div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
}
