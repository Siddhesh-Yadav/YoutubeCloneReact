import { useState, useEffect } from "react";

export default function useDarkMode() {
  const [theme, setTheme] = useState(() => {
    // Get the user's theme preference from localStorage
    const storedTheme = localStorage.getItem('theme');

    // If the user has a theme preference, use that theme
    if (storedTheme) {
      return storedTheme;
    }

    // Otherwise, use the system default theme
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDarkMode ? 'dark' : 'light';
  });
  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    
    localStorage.setItem('theme', theme);
  }, [theme, colorTheme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return [colorTheme, toggleTheme]
}
