import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "rawinet-bg-animation";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const getInitialEnabled = (): boolean => {
  if (typeof window === "undefined") return true;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored !== null) return stored === "on";
  // Default: respect the OS/browser reduced-motion setting
  return !prefersReducedMotion();
};

// Shared store so the toggle button and every background instance stay in sync
let enabled = getInitialEnabled();
const listeners = new Set<(value: boolean) => void>();

const setEnabledGlobal = (value: boolean) => {
  enabled = value;
  listeners.forEach(listener => listener(value));
};

export const useBackgroundAnimation = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(enabled);

  useEffect(() => {
    listeners.add(setIsEnabled);
    return () => {
      listeners.delete(setIsEnabled);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => {
      // Only auto-follow the system setting when the user hasn't chosen manually
      if (window.localStorage.getItem(STORAGE_KEY) === null) {
        setEnabledGlobal(!media.matches);
      }
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(() => {
    const next = !enabled;
    window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
    setEnabledGlobal(next);
  }, []);

  return { enabled: isEnabled, toggle };
};
