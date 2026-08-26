"use client";

import { useState, useCallback } from "react";
import { Preloader } from "@/components/ui/preloader";

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  const handleComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <Preloader onComplete={handleComplete} />
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.3s ease-out",
        }}
      >
        {children}
      </div>
    </>
  );
}
