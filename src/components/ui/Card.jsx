import React from "react";

export default function Card({ children, className = "", theme = "light" }) {
  const baseStyles = "rounded-xl border transition-colors duration-200 ";
  const themeStyles = 
    theme === "dark" 
      ? "bg-gray-900 border-gray-700 text-gray-100" 
      : "bg-white border-gray-200 text-gray-800 shadow-sm";

  return (
    <div className={`${baseStyles} ${themeStyles} ${className}`}>
      {children}
    </div>
  );
}