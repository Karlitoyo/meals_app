import { useState, useEffect } from "react";

export default function ToggleTheme() {
  const [theme, setTheme] = useState("light"); // Default theme

  useEffect(() => {
    // Set the initial theme on the <html> tag
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <button onClick={toggleTheme} className="btn btn-outline">
      {theme === "light" ? "🌙 Dark Mode" : "🌞 Light Mode"}
    </button>
  );
}
