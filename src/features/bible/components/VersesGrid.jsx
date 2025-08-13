import React from "react";
import Card from "../../../components/ui/Card";

export default function VersesGrid({ verses, onSelect, title = "Versículos" }) {
  return (
    <Card className="p-4">
      <h3 className="font-medium mb-2">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-[32rem] overflow-y-auto">
        {verses.map((v, idx) => (
          <button
            key={v.id || idx}
            onClick={() => onSelect(v, idx)}
            className="p-2 text-left rounded-lg border bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900 text-sm"
          >
            <span className="block font-medium text-blue-600 dark:text-blue-400">{v.reference}</span>
            {(v.text || v.content) && (
              <span className="block mt-1 text-xs text-gray-600 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: v.text || v.content }} />
            )}
          </button>
        ))}
        {verses.length === 0 && (
          <p className="col-span-full text-center text-sm text-gray-500 dark:text-gray-400">No hay resultados</p>
        )}
      </div>
    </Card>
  );
}
