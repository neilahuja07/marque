"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  target: string;
  className?: string;
}

function parseTarget(target: string): { num: number; prefix: string; suffix: string; hasDash: boolean } {
  const cleaned = target.replace(/,/g, "");
  const dashMatch = cleaned.match(/(\d+)[–-](\d+)/);
  if (dashMatch) {
    return { num: parseInt(dashMatch[2]), prefix: dashMatch[1] + "–", suffix: "", hasDash: true };
  }
  const slashMatch = cleaned.match(/([\d.]+)\/([\d.]+)/);
  if (slashMatch) {
    return { num: parseFloat(slashMatch[1]), prefix: "", suffix: "/" + slashMatch[2], hasDash: false };
  }
  const numMatch = cleaned.match(/([\d.]+)/);
  if (numMatch) {
    return { num: parseFloat(numMatch[1]), prefix: "", suffix: cleaned.replace(numMatch[1], ""), hasDash: false };
  }
  return { num: 0, prefix: "", suffix: "", hasDash: false };
}

export function AnimatedCounter({ target, className }: AnimatedCounterProps) {
  const [display, setDisplay] = useState(target);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const { num, prefix, suffix, hasDash } = parseTarget(target);
    if (num === 0) return;

    const duration = 1200;
    const start = performance.now();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;

          const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(num * eased);

            if (hasDash) {
              setDisplay(`2015–${current}`);
            } else if (suffix.startsWith("/")) {
              setDisplay(current + suffix);
            } else {
              setDisplay(prefix + current.toLocaleString() + suffix);
            }

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setDisplay(target);
            }
          };

          requestAnimationFrame(step);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
