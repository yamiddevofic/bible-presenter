import React from "react";

export default function Card({ children, className = "" }) {
    return (
      <div className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 ${className}`}>
        {children}
      </div>
    );
  }
  