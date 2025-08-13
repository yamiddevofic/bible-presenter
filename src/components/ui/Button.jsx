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
  
  const baseStyles = "rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: isDark 
      ? "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 focus:ring-offset-gray-900"
      : "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 focus:ring-offset-white shadow-sm",
      
    secondary: isDark
      ? "bg-gray-800 hover:bg-gray-700 text-gray-100 focus:ring-gray-500 focus:ring-offset-gray-900"
      : "bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-300 focus:ring-offset-white shadow-sm",
      
    outline: isDark
      ? "border border-gray-600 hover:bg-gray-800 text-gray-100 focus:ring-gray-500 focus:ring-offset-gray-900"
      : "border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-gray-200 focus:ring-offset-white",
      
    ghost: isDark
      ? "hover:bg-gray-800 text-gray-100 focus:ring-gray-500 focus:ring-offset-gray-900"
      : "hover:bg-gray-100 text-gray-700 focus:ring-gray-200 focus:ring-offset-white",
      
    danger: isDark
      ? "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 focus:ring-offset-gray-900"
      : "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 focus:ring-offset-white shadow-sm"
  };

  const sizes = { 
    sm: "px-3 py-1.5 text-xs", 
    md: "px-4 py-2 text-sm", 
    lg: "px-6 py-3 text-base" 
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