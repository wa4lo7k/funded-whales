"use client";

import { Button } from "@/components/ui/button";
import { Moon } from "lucide-react";

export function ThemeToggle() {
  return (
    <Button variant="ghost" size="icon" className="glass-button h-9 w-9 rounded-full">
      <Moon className="h-4 w-4" />
      <span className="sr-only">Dark mode</span>
    </Button>
  );
}
