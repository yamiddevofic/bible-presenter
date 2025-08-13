import React from "react";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import { Hash } from "lucide-react";

export default function VersesList({
  verses,
  onAddVerse,
  title = "Versículos",
  error = null,
  theme = "light"
}) {
  const isDark = theme === "dark";
  
  return (
    <Card className="p-6" theme={theme}>
      <h3 className={`font-medium mb-3 flex items-center gap-2 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
        <Hash className="w-4 h-4" />
        {title}
      </h3>

      {error && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${
          isDark 
            ? 'bg-red-900/20 border-red-800 text-red-300' 
            : 'bg-red-50 border-red-200 text-red-700'
        } border`}>
          {error}
        </div>
      )}

      <div className="max-h-96 overflow-y-auto space-y-2">
        {verses.length === 0 ? (
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            No hay resultados
          </p>
        ) : (
          verses.map(verse => (
            <div 
              key={verse.id} 
              className={`flex items-start justify-between p-3 rounded-lg ${
                isDark ? 'bg-gray-800' : 'bg-gray-50 shadow-sm'
              }`}
            >
              <div className="mr-2 flex-1">
                <span className={`text-sm font-medium ${
                  isDark ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {verse.reference}
                </span>
                {(verse.text || verse.content) && (
                  <div 
                    className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} 
                    dangerouslySetInnerHTML={{ __html: verse.text || verse.content }} 
                  />
                )}
              </div>
              {onAddVerse && (
                <Button 
                  onClick={() => onAddVerse(verse)}
                  size="sm"
                  variant={isDark ? 'secondary' : 'primary'}
                  theme={theme}
                >
                  Agregar
                </Button>
              )}
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
