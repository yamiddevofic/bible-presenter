import React, { useMemo, useState } from "react";
import Presenter from "./components/presenter/Presenter";
import { PlaylistProvider, usePlaylist } from "./store/PlaylistContext";
import useBibles from "./features/bible/hooks/useBibles";
import useBooks from "./features/bible/hooks/useBooks";
import useChapters from "./features/bible/hooks/useChapters";
import useChapterContent from "./features/bible/hooks/useChapterContent";
import useSearch from "./features/bible/hooks/useSearch";
import Controls from "./features/bible/components/Controls";
import ChapterView from "./features/bible/components/ChapterView";
import VersesList from "./features/bible/components/VersesList";
import PlaylistPanel from "./features/bible/components/PlaylistPanel";
import Button from "./components/ui/Button";
import { getVerseHtml } from "./api/bible";

function AppInner() {
  const [langFilter, setLangFilter] = useState("spa");

  const { bibles, bibleId, setBibleId } = useBibles(langFilter);
  const { books, bookId, setBookId } = useBooks(bibleId);
  const { chapters, chapterId, setChapterId } = useChapters(bibleId, bookId);
  const { chapterHtml, verses, loading, error } = useChapterContent(bibleId, chapterId);
  const search = useSearch(bibleId);

  const { playlist, dispatch, presenting, setPresenting, currentIndex, setCurrentIndex,
          theme, setTheme, showRef, setShowRef, next, prev } = usePlaylist();

  const title = useMemo(() => {
    const chap = chapters.find(c => c.id === chapterId);
    if (!chap) return "Bible Presenter";
    return chap.reference || chap.id;
  }, [chapters, chapterId]);

  async function addVerseToPlaylist(verse) {
    try {
      const res = await getVerseHtml(bibleId, verse.id);
      const html = res?.data?.content || "";
      dispatch({ type: "ADD_ONE", item: { id: verse.id, reference: verse.reference, html } });
    } catch (e) {
      console.error(e);
    }
  }

  function addChapterToPlaylist() {
    const tmp = document.createElement("div");
    tmp.innerHTML = chapterHtml;
    const paras = Array.from(tmp.querySelectorAll("p"));
    const slides = paras.map((p, i) => ({
      id: `${chapterId}-p${i + 1}`, reference: title, html: p.outerHTML
    }));
    dispatch({ type: "ADD_MANY", items: slides });
  }

  function startPresent() {
    if (playlist.length === 0) return;
    setCurrentIndex(0);
    setPresenting(true);
  }

  const slides = playlist.map(s => ({ ...s, _next: next, _prev: prev }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-light tracking-tight text-gray-900 dark:text-white mb-2">Bible Presenter</h1>
          <p className="text-gray-600 dark:text-gray-400 font-light">Presentaciones modernas para iglesias</p>
        </header>

        <Controls
          langFilter={langFilter} setLangFilter={setLangFilter}
          bibles={bibles} bibleId={bibleId} setBibleId={setBibleId}
          books={books} bookId={bookId} setBookId={setBookId}
          chapters={chapters} chapterId={chapterId} setChapterId={setChapterId}
          search={search}
        />

        <div className="flex flex-wrap items-center justify-between gap-4 -mt-4 mb-6">
          <div className="flex items-center gap-2">
            <Button onClick={startPresent} disabled={playlist.length === 0}>▶ Presentar ({playlist.length})</Button>
            <Button variant="outline" onClick={() => dispatch({ type: "CLEAR" })}>Limpiar</Button>
          </div>

          <div className="flex items-center gap-4">
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChapterView
              title={title}
              chapterHtml={chapterHtml}
              onAddChapter={addChapterToPlaylist}
              loading={loading}
              error={error}
            />
          </div>

          <div className="space-y-6">
            <VersesList verses={verses} onAddVerse={addVerseToPlaylist} />
            <PlaylistPanel
              playlist={playlist}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              onStart={startPresent}
              onClear={() => dispatch({ type: "CLEAR" })}
              onRemove={(id) => dispatch({ type: "REMOVE", id })}
            />
          </div>
        </div>

        <footer className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
          Presentador bíblico moderno • API.Bible
        </footer>
      </div>

      <Presenter
        open={presenting}
        onClose={() => setPresenting(false)}
        slides={slides}
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
