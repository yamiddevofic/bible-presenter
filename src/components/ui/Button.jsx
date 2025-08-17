import React from "react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled,
  className = "",
  theme = "light",
  ...props
}) {
  const isDark = theme === "dark";

  const baseStyles =
    "rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: isDark
      ? "bg-icc-purple hover:bg-icc-purple/90 text-white focus:ring-icc-purple focus:ring-offset-gray-900"
      : "bg-icc-blue hover:bg-icc-blue/90 text-white focus:ring-icc-blue focus:ring-offset-white shadow-sm",

    secondary: isDark
      ? "bg-icc-blue hover:bg-icc-blue/90 text-white focus:ring-icc-blue focus:ring-offset-gray-900"
      : "bg-icc-purple hover:bg-icc-purple/90 text-white focus:ring-icc-purple focus:ring-offset-white shadow-sm",

    outline: isDark
      ? "border border-icc-blue hover:bg-icc-blue/20 text-gray-100 focus:ring-icc-blue focus:ring-offset-gray-900"
      : "border border-icc-blue hover:bg-icc-blue/10 text-gray-700 focus:ring-icc-blue focus:ring-offset-white",

    ghost: isDark
      ? "hover:bg-icc-blue/20 text-gray-100 focus:ring-icc-blue focus:ring-offset-gray-900"
      : "hover:bg-icc-blue/10 text-gray-700 focus:ring-icc-blue focus:ring-offset-white",

    danger: isDark
      ? "bg-icc-red hover:bg-icc-red/90 text-white focus:ring-icc-red focus:ring-offset-gray-900"
      : "bg-icc-red hover:bg-icc-red/90 text-white focus:ring-icc-red focus:ring-offset-white shadow-sm",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

