import React from "react";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

export default function VersesList({ verses, onAddVerse }) {
  return (
    <Card className="p-6">
      <h3 className="font-medium mb-3 text-gray-900 dark:text-gray-100">Versículos</h3>
      <div className="max-h-96 overflow-y-auto space-y-2">
        {verses.map(verse => (
          <div key={verse.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{verse.reference}</span>
            <Button size="sm" variant="outline" onClick={() => onAddVerse(verse)}>Añadir</Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
