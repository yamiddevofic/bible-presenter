// features/bible/components/VersesGrid.jsx
import React from "react";
import Card from "../../../components/ui/Card";

export default function VersesGrid({ verses, onSelect, title = "Versículos", theme = "light" }) {
  const isDark = theme === "dark";
  
  return (
    <Card className="p-4 h-[calc(100vh-8rem)]" theme={theme}>
      <h3 className={`font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
        {title}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 h-[calc(100vh-13rem)] overflow-y-auto">
        {verses.map((v, idx) => (
          <button
            key={v.id || idx}
            onClick={() => onSelect(v, idx)}
            className={`p-2 text-left rounded-lg border transition-colors duration-150 ${
              isDark 
                ? 'bg-gray-800 border-gray-700 hover:bg-blue-900 text-gray-200' 
                : 'bg-white border-gray-200 hover:bg-blue-50 text-gray-800 shadow-sm hover:shadow-md'
            }`}
          >
            <span className={`block font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
              {v.reference}
            </span>
            {(v.text || v.content) && (
              <span 
                className={`block mt-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                dangerouslySetInnerHTML={{ __html: v.text || v.content }}
              />
            )}
          </button>
        ))}
        {verses.length === 0 && (
          <p className={`col-span-full text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            No hay resultados
          </p>
        )}
      </div>
    </Card>
  );
}
