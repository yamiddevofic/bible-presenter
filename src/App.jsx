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
import { BookOpen } from "lucide-react";
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
  const isSearchReference = showingSearch && search.isReference;

  const stripTags = (s = "") => s.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

  async function handleAddVerse(v) {
    const parseIds = (verse) => {
      if (Array.isArray(verse?.verseIds)) return verse.verseIds;
      const base = String(verse?.id || "");
      const parts = base.split(",").filter(Boolean);
      const ids = [];
      const expand = (token) => {
        if (!token.includes("-")) return [token];
        const [s, e] = token.split("-");
        const [book, chap, startVerse] = s.split(".");
        const endVerse = parseInt(e.split(".")[2], 10);
        const start = parseInt(startVerse, 10);
        for (let i = start; i <= endVerse; i++) ids.push(`${book}.${chap}.${i}`);
        return [];
      };
      parts.forEach(p => ids.push(...expand(p)));
      return ids.length ? ids : [base];
    };

    const ids = parseIds(v);
    const items = [];

    for (const id of ids) {
      if (playlist.some(p => p.id === id)) continue;
      let html = "";
      let reference = v.reference;

      if (ids.length === 1) {
        if (v.text && v.text.trim()) html = `<p>${v.text}</p>`;
        if (!html && v.content && String(v.content).trim()) html = String(v.content);
      }

      if (!html) {
        try {
          const r = await getVerseHtml(bibleId, id);
          html = r?.data?.content ?? r?.content ?? "";
          reference = r?.data?.reference ?? reference;
        } catch {
          html = "";
        }
      }

      items.push({
        id,
        reference,
        html,
        text: stripTags(html),
      });
    }

    if (items.length === 0) return;
    if (items.length === 1) dispatch({ type: "ADD_ONE", item: items[0] });
    else dispatch({ type: "ADD_MANY", items });
  }

  return (
    <div className={`min-h-screen grid grid-cols-1 ${theme === "dark" ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900 grid"}`}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <header className="text-center mb-8">
          <h1
            className={`text-3xl font-light tracking-tight mb-2 flex items-center justify-center gap-2 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            <BookOpen className="w-8 h-8" />
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 order-3 md:order-2">
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
                    isReference={isSearchReference}
                  />
                )
              ) : (
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Selecciona un capítulo</p>
              )}
            </div>
            <div className="md:col-span-2 flex flex-col gap-4 order-2 md:order-3">
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
