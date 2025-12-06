"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    isDark ? root.classList.add("dark") : root.classList.remove("dark");
  }, [isDark]);

  return (
    <button
      className="uk-button uk-button-default"
      onClick={() => setIsDark(!isDark)}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
