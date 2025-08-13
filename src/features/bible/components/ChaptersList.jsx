import React, { useState, useEffect } from "react";
import Card from "../../../components/ui/Card";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ChaptersList({ chapters, currentId, onSelect }) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  
  // Resetear a la primera página cuando cambian los capítulos
  useEffect(() => {
    setCurrentPage(0);
  }, [chapters]);

  if (!chapters.length) return null;

  // Calcular el total de páginas
  const totalPages = Math.ceil(chapters.length / itemsPerPage);
  
  // Obtener los capítulos de la página actual
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentChapters = chapters.slice(startIndex, endIndex);

  const handlePrev = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">Capítulos</h3>
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30"
              aria-label="Página anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-gray-500">
              Página {currentPage + 1} de {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage >= totalPages - 1}
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30"
              aria-label="Página siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        {currentChapters.map(ch => (
          <button
            key={ch.id}
            onClick={() => onSelect(ch.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              ch.id === currentId
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
          >
            {ch.reference && (
              <div className="text-md font-medium opacity-80 mt-1">{ch.reference}</div>
            )}
          </button>
        ))}
      </div>
    </Card>
  );
}
