import React from "react";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

export default function VersesList({
  verses,
  onAddVerse,
  title = "Versículos",
  error = null,
}) {
  return (
    <Card className="p-6">
      <h3 className="font-medium mb-3 text-gray-900 dark:text-gray-100">{title}</h3>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
          {error}
        </div>
      )}

      <div className="max-h-96 overflow-y-auto space-y-2">
        {verses.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">No hay resultados</p>
        ) : (
          verses.map(verse => (
            <div key={verse.id} className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="mr-2">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{verse.reference}</span>
                {(verse.text || verse.content) && (
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1" dangerouslySetInnerHTML={{ __html: verse.text || verse.content }} />
                )}
              </div>
              <Button size="sm" variant="outline" onClick={() => onAddVerse(verse)}>Añadir</Button>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
