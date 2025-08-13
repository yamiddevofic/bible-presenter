import React from "react";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

export default function PlaylistPanel({
  playlist,
  currentIndex,
  setCurrentIndex,
  onStart,
  onClear,
  onRemove,
  theme = "light",
}) {
  const isDark = theme === "dark";

  return (
    <Card className="p-6" theme={theme}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`font-medium ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Playlist ({playlist.length})</h3>
        <div className="flex gap-2">
          <Button size="sm" onClick={onStart} disabled={playlist.length === 0} theme={theme}>▶</Button>
          <Button size="sm" variant="outline" onClick={onClear} theme={theme}>🗑</Button>
        </div>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {playlist.length === 0 ? (
          <p className={`text-sm text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Añade versículos para crear una presentación
          </p>
        ) : (
          playlist.map((slide, i) => (
            <div
              key={slide.id}
              className={`p-3 rounded-lg border transition-colors ${
                i === currentIndex
                  ? isDark
                    ? 'border-blue-500 bg-blue-900/20'
                    : 'border-blue-500 bg-blue-50'
                  : isDark
                    ? 'border-gray-700 hover:bg-gray-800'
                    : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{slide.reference}</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setCurrentIndex(i)}
                    className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    Ir
                  </button>
                  <button
                    onClick={() => onRemove(slide.id)}
                    className={`text-xs px-2 py-1 rounded text-red-600 ${isDark ? 'hover:bg-red-900/20' : 'hover:bg-red-50'}`}
                  >
                    ×
                  </button>
                </div>
              </div>
              <div
                className={`text-xs line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                dangerouslySetInnerHTML={{ __html: slide.html || slide.text || "" }}
              />
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
