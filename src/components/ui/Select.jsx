import React from "react";

export default function Select({ label, children, className = "", ...props }) {
    return (
      <div className="space-y-1">
        {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
        <select
          {...props}
          className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
        >
          {children}
        </select>
      </div>
    );
  }
  