import React from "react";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

export default function ChapterView({ title, chapterHtml, onAddChapter, loading, error }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">{title}</h2>
        {loading && <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Cargando…</span>
          <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full" />
        </div>}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
          {error}
        </div>
      )}

      <div className="prose prose-gray dark:prose-invert max-w-none text-sm leading-relaxed"
           dangerouslySetInnerHTML={{ __html: chapterHtml }} />
      <Button variant="outline" size="sm" onClick={onAddChapter} className="mt-3">
        Añadir capítulo completo
      </Button>
    </Card>
  );
}
