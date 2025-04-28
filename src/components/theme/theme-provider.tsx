"use client";

import * as React from "react";
import { createContext, useContext, useEffect } from "react";

// Only dark mode is supported now
type Theme = "dark";

type ThemeProviderProps = {
  children: React.ReactNode;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  // Always use dark theme
  const theme: Theme = "dark";

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove any other theme classes and add dark
    root.classList.remove("light");
    root.classList.add("dark");

    // Store the theme in localStorage for consistency
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, theme);
    }
  }, [storageKey, theme]);

  const value = {
    theme,
    // setTheme is kept for API compatibility but doesn't change the theme
    setTheme: () => {
      // No-op - we only support dark mode
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
