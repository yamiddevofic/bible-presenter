import React from "react";
import Card from "../../../components/ui/Card";

export default function ChaptersList({ chapters, currentId, onSelect }) {
  if (!chapters.length) return null;
  return (
    <Card className="p-4">
      <h3 className="font-medium mb-2">Capítulos</h3>
      <div className="flex flex-wrap gap-2">
        {chapters.map(ch => (
          <button
            key={ch.id}
            onClick={() => onSelect(ch.id)}
            className={`px-3 py-1 rounded-full text-sm border transition-colors ${
              ch.id === currentId
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {ch.number || ch.reference}
          </button>
        ))}
      </div>
    </Card>
  );
}
