import React from "react";

export default function Input({ label, className = "", theme = "light", ...props }) {
  const isDark = theme === "dark";

  return (
    <div className="space-y-1">
      {label && (
        <label className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
          {label}
        </label>
      )}
      <input
        {...props}
        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:border-transparent ${
          isDark
            ? "border-gray-600 bg-gray-800 text-gray-100 placeholder:text-gray-500 focus:ring-icc-blue"
            : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:ring-icc-blue shadow-sm"
        } ${className}`}
      />
    </div>
  );
}
