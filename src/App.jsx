import React from "react";
import Presenter from "./components/presenter/Presenter";
import { PlaylistProvider, usePlaylist } from "./store/PlaylistContext";
import useBibles from "./features/bible/hooks/useBibles";
import useBooks from "./features/bible/hooks/useBooks";
import useChapters from "./features/bible/hooks/useChapters";
import useChapterContent from "./features/bible/hooks/useChapterContent";
import useSearch from "./features/bible/hooks/useSearch";
import Controls from "./features/bible/components/Controls";
import ChaptersList from "./features/bible/components/ChaptersList";
import VersesGrid from "./features/bible/components/VersesGrid";
import Button from "./components/ui/Button";

function AppInner() {
  const { bibles, bibleId, setBibleId } = useBibles("spa");
  const { books, bookId, setBookId } = useBooks(bibleId);
  const { chapters, chapterId, setChapterId } = useChapters(bibleId, bookId);
  const { verses, loading, error } = useChapterContent(bibleId, chapterId);
  const search = useSearch(bibleId);

  const { playlist, dispatch, presenting, setPresenting, currentIndex, setCurrentIndex,
          theme, setTheme, showRef, setShowRef, next, prev } = usePlaylist();

  const showingSearch = search.query.trim().length > 0;
  const versesToShow = showingSearch ? search.results : verses;

  async function handleSelectVerse(v, idx) {
    const slides = versesToShow.map(vi => ({
      id: vi.id,
      reference: vi.reference,
      html: `<p>${vi.text || vi.content || ""}</p>`
    }));
    dispatch({ type: "CLEAR" });
    dispatch({ type: "ADD_MANY", items: slides });
    setCurrentIndex(idx);
    setPresenting(true);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-light tracking-tight text-gray-900 dark:text-white mb-2">Bible Presenter</h1>
          <p className="text-gray-600 dark:text-gray-400 font-light">Presentaciones modernas para iglesias</p>
        </header>

        <Controls
          bibles={bibles} bibleId={bibleId} setBibleId={setBibleId}
          books={books} bookId={bookId} setBookId={setBookId}
          search={search}
        />

        <div className="flex items-center justify-end gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Tema:</span>
            <Button variant={theme === "dark" ? "primary" : "outline"} size="sm" onClick={() => setTheme("dark")}>Oscuro</Button>
            <Button variant={theme === "light" ? "primary" : "outline"} size="sm" onClick={() => setTheme("light")}>Claro</Button>
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <input type="checkbox" checked={showRef} onChange={(e) => setShowRef(e.target.checked)} className="rounded border-gray-300 dark:border-gray-600" />
            Mostrar referencia
          </label>
        </div>

        {bookId && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-3">
              {chapterId ? (
                loading ? (
                  <p className="text-sm text-gray-600 dark:text-gray-400">Cargando...</p>
                ) : error ? (
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                ) : (
                  <VersesGrid
                    verses={versesToShow}
                    title={showingSearch ? "Resultados de búsqueda" : "Versículos"}
                    onSelect={handleSelectVerse}
                  />
                )
              ) : (
                <p className="text-sm text-gray-600 dark:text-gray-400">Selecciona un capítulo</p>
              )}
            </div>
            <ChaptersList chapters={chapters} currentId={chapterId} onSelect={setChapterId} />
          </div>
        )}

        <footer className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
          Presentador bíblico moderno • API.Bible
        </footer>
      </div>

      <Presenter
        open={presenting}
        onClose={() => setPresenting(false)}
        slides={playlist.map(s => ({ ...s, _next: next, _prev: prev }))}
        index={currentIndex}
        theme={theme}
        showRef={showRef}
      />
    </div>
  );
}

export default function App() {
  return (
    <PlaylistProvider>
      <AppInner />
    </PlaylistProvider>
  );
}
