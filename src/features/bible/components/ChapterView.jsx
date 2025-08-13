import React from "react";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

export default function ChapterView({ title, chapterHtml, onAddChapter, loading, error, theme = "light" }) {
  const isDark = theme === "dark";

  return (
    <Card className="p-6" theme={theme}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-xl font-medium ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{title}</h2>
        {loading && (
          <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <span>Cargando…</span>
            <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full" />
          </div>
        )}
      </div>

      {error && (
        <div className={`mb-4 p-3 rounded-lg text-sm border ${
          isDark
            ? 'bg-red-900/20 border-red-800 text-red-300'
            : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          {error}
        </div>
      )}

      <div
        className={`prose max-w-none text-sm leading-relaxed ${isDark ? 'prose-invert' : 'prose-gray'}`}
        dangerouslySetInnerHTML={{ __html: chapterHtml }}
      />
      <Button variant="outline" size="sm" onClick={onAddChapter} className="mt-3" theme={theme}>
        Añadir capítulo completo
      </Button>
    </Card>
  );
}
