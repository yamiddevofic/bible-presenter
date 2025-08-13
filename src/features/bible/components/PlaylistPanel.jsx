import React from "react";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

export default function PlaylistPanel({
  playlist, currentIndex, setCurrentIndex, onStart, onClear, onRemove
}) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Playlist ({playlist.length})</h3>
        <div className="flex gap-2">
          <Button size="sm" onClick={onStart} disabled={playlist.length === 0}>▶</Button>
          <Button size="sm" variant="outline" onClick={onClear}>🗑</Button>
        </div>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {playlist.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-8">
            Añade versículos para crear una presentación
          </p>
        ) : (
          playlist.map((slide, i) => (
            <div key={slide.id}
              className={`p-3 rounded-lg border transition-colors ${
                i === currentIndex
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">{slide.reference}</span>
                <div className="flex gap-1">
                  <button onClick={() => setCurrentIndex(i)}
                          className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                    Ir
                  </button>
                  <button onClick={() => onRemove(slide.id)}
                          className="text-xs px-2 py-1 rounded text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                    ×
                  </button>
                </div>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2"
                   dangerouslySetInnerHTML={{ __html: slide.html || slide.text || "" }} />
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
