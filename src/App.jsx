// App.jsx
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
import PlaylistPanel from "./features/bible/components/PlaylistPanel";
import Button from "./components/ui/Button";
import { getVerseHtml } from "./features/bible/api/bible"; //

function AppInner() {
  const { bibles, bibleId, setBibleId } = useBibles("spa");
  const { books, bookId, setBookId } = useBooks(bibleId);
  const { chapters, chapterId, setChapterId } = useChapters(bibleId, bookId);
  const { verses, loading, error } = useChapterContent(bibleId, chapterId);
  const search = useSearch(bibleId);

  const {
    playlist,
    dispatch,
    presenting,
    setPresenting,
    currentIndex,
    setCurrentIndex,
    theme,
    setTheme,
    showRef,
    setShowRef,
    next,
    prev,
  } = usePlaylist();

  const showingSearch = search.query.trim().length > 0;
  const versesToShow = showingSearch ? search.results : verses;

  const stripTags = (s = "") => s.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

  async function handleAddVerse(v) {
    let html = "";

    if (v.text && v.text.trim()) html = `<p>${v.text}</p>`;
    if (!html && v.content && String(v.content).trim()) html = String(v.content);

    if (!html) {
      try {
        const r = await getVerseHtml(bibleId, v.id);
        html = r?.data?.content ?? r?.content ?? "";
      } catch {
        html = "";
      }
    }

    dispatch({
      type: "ADD_ONE",
      item: {
        id: v.id,
        reference: v.reference,
        html,
        text: v.text ?? stripTags(html),
      },
    });
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}`}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <header className="text-center mb-8">
          <h1 className={`text-3xl font-light tracking-tight mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Bible Presenter
          </h1>
          <p className={`font-light ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Presentaciones modernas para iglesias
          </p>
        </header>

        <Controls
          bibles={bibles}
          bibleId={bibleId}
          setBibleId={setBibleId}
          books={books}
          bookId={bookId}
          setBookId={setBookId}
          search={search}
          theme={theme}
        />

        <div className="flex items-center justify-end gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Tema:</span>
            <Button
              variant={theme === "dark" ? "primary" : "outline"}
              size="sm"
              onClick={() => setTheme("dark")}
              theme={theme}
            >
              Oscuro
            </Button>
            <Button
              variant={theme === "light" ? "primary" : "outline"}
              size="sm"
              onClick={() => setTheme("light")}
              theme={theme}
            >
              Claro
            </Button>
          </div>
          <label className={`flex items-center gap-2 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            <input
              type="checkbox"
              checked={showRef}
              onChange={(e) => setShowRef(e.target.checked)}
              className={`rounded ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}
            />
            Mostrar referencia
          </label>
        </div>

        {bookId && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="md:col-span-3">
              {chapterId ? (
                loading ? (
                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Cargando...</p>
                ) : error ? (
                  <p className={`text-sm ${theme === "dark" ? "text-red-400" : "text-red-600"}`}>{error}</p>
                ) : (
                  <VersesGrid
                    verses={versesToShow}
                    title={showingSearch ? "Resultados de búsqueda" : "Versículos"}
                    onAdd={handleAddVerse}
                    theme={theme}
                  />
                )
              ) : (
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Selecciona un capítulo</p>
              )}
            </div>
            <ChaptersList
              chapters={chapters}
              currentId={chapterId}
              onSelect={setChapterId}
              theme={theme}
            />
            <PlaylistPanel
              playlist={playlist}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              onStart={() => {
                if (playlist.length > 0) {
                  setCurrentIndex((i) => Math.min(i, playlist.length - 1));
                  setPresenting(true);
                }
              }}
              onClear={() => dispatch({ type: "CLEAR" })}
              onRemove={(id) => dispatch({ type: "REMOVE", id })}
              theme={theme}
            />
          </div>
        )}

        <footer className={`mt-8 text-center text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
          Presentador bíblico moderno • API.Bible
        </footer>
      </div>

      <Presenter
        open={presenting}
        onClose={() => setPresenting(false)}
        slides={playlist.map((s) => ({ ...s, _next: next, _prev: prev }))}
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
