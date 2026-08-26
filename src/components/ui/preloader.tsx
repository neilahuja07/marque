"use client";

import { useState, useEffect } from "react";
import { LogoAnimation } from "./logo-animation";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 1800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="preloader-overlay">
      <LogoAnimation />
    </div>
  );
}
