"use client";

import { useAnimationContext } from "./AnimationProvider";
import { Sparkles, ZapOff } from "lucide-react";

export function AnimationToggle() {
  const { isAnimEnabled, toggleAnimation } = useAnimationContext();

  return (
    <button
      onClick={toggleAnimation}
      aria-label="Toggle Animations"
      title="Toggle Animations"
      className="p-2 rounded-full hover:bg-muted transition-colors flex items-center justify-center shrink-0"
    >
      {isAnimEnabled ? (
         <Sparkles className="h-5 w-5 text-primary drop-shadow-md" />
      ) : (
         <ZapOff className="h-5 w-5 text-muted-foreground" />
      )}
    </button>
  );
}
