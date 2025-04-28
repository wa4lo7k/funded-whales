"use client";

import { useEffect } from "react";
import { initScrollAnimations } from "@/lib/scroll-animations";

export function ScrollAnimationInitializer() {
  useEffect(() => {
    const cleanup = initScrollAnimations();
    return cleanup;
  }, []);

  return null; // This component doesn't render anything
}
