"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

const THEME_CHANGE_EVENT = "vocalang-theme-change";

function subscribeToTheme(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(THEME_CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(THEME_CHANGE_EVENT, onChange);
  };
}

function getThemeSnapshot(): "light" | "dark" {
  const stored = localStorage.getItem("theme");
  return stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ? "dark"
    : "light";
}

function getServerThemeSnapshot(): "light" | "dark" {
  return "light";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  };

  return (
    <button
      onClick={toggle}
      className="inline-flex items-center justify-center p-2 rounded-[var(--radius-md)] text-[rgb(var(--color-muted-foreground))] hover:text-[rgb(var(--color-foreground))] hover:bg-[rgb(var(--color-muted))] transition-colors"
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}
