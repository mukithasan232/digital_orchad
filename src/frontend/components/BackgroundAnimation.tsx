"use client";

import React from "react";
import { useAnimationContext } from "./AnimationProvider";

export function BackgroundAnimation() {
  const { isAnimEnabled } = useAnimationContext();

  if (!isAnimEnabled) return null;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-background/50 dark:bg-background/90 transition-colors duration-500">
      <div 
        className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] bg-primary/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-60 dark:opacity-20 animate-blob" 
      />
      <div 
        className="absolute top-[10%] right-[-10%] w-[50vh] h-[50vh] bg-secondary/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-60 dark:opacity-20 animate-blob" 
        style={{ animationDelay: "2s" }}
      />
      <div 
        className="absolute bottom-[-20%] left-[20%] w-[60vh] h-[60vh] bg-accent/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-60 dark:opacity-20 animate-blob" 
        style={{ animationDelay: "4s" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50"></div>
    </div>
  );
}
