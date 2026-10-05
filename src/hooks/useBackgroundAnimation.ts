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

export const useBackgroundAnimation = () => {
  const [enabled, setEnabled] = useState<boolean>(getInitialEnabled);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => {
      // Only auto-follow the system setting when the user hasn't chosen manually
      if (window.localStorage.getItem(STORAGE_KEY) === null) {
        setEnabled(!media.matches);
      }
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(() => {
    setEnabled(prev => {
      const next = !prev;
      window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
      return next;
    });
  }, []);

  return { enabled, toggle };
};
