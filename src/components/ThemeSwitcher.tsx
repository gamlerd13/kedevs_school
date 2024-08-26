"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { MdOutlineWbSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="text-xl flex items-center">
      {theme && theme === "light" ? (
        <IoMdMoon onClick={() => setTheme("dark")} />
      ) : (
        <MdOutlineWbSunny onClick={() => setTheme("light")} />
      )}
    </div>
  );
}
