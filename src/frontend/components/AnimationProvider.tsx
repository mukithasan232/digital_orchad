"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type AnimationContextType = {
  isAnimEnabled: boolean;
  toggleAnimation: () => void;
};

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [isAnimEnabled, setIsAnimEnabled] = useState(true);

  // Load from local storage if available
  useEffect(() => {
    const stored = localStorage.getItem("animEnabled");
    if (stored !== null) {
      setIsAnimEnabled(stored === "true");
    }
  }, []);

  const toggleAnimation = () => {
    setIsAnimEnabled((prev) => {
      const next = !prev;
      localStorage.setItem("animEnabled", String(next));
      return next;
    });
  };

  return (
    <AnimationContext.Provider value={{ isAnimEnabled, toggleAnimation }}>
      <div className={isAnimEnabled ? "animations-enabled" : "animations-disabled"}>
        {children}
      </div>
    </AnimationContext.Provider>
  );
}

export function useAnimationContext() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error("useAnimationContext must be used within an AnimationProvider");
  }
  return context;
}
