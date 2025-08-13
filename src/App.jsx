import React, { useEffect, useRef, useState } from "react";

/**
 * RVR1960 Presenter — minimal
 * - Traducción fija: Reina Valera 1960
 * - Búsqueda por referencia o palabra
 * - Verso principal en tamaño XL
 * - Navegación anterior/siguiente + Fullscreen (tecla F)
 */

const API_BASE = "https://api.scripture.api.bible/v1";
const API_KEY =
  (typeof process !== "undefined" && process.env?.VITE_API_BIBLE_KEY) ||
  "0142214e0b636f91032b1cb7530b88cd"; // demo

const api = async (path, params = {}) => {
  const url = new URL(API_BASE + path);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v);
  });
  const res = await fetch(url.toString(), {
    headers: { accept: "application/json", "api-key": API_KEY },
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
  return res.json();
};

function Fullscreen({ open, onClose, slide, showRef, mega }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    ref.current?.requestFullscreen?.().catch(() => {});
    const onKey = (e) => e.key.toLowerCase() === "escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white p-6"
    >
      <div className="max-w-6xl w-full">
        {showRef && (
          <div className="mb-4 opacity-70 text-xl">{slide?.reference}</div>
        )}
        <div
          className={`whitespace-pre-wrap leading-tight ${
            mega ? "text-6xl md:text-7xl" : "text-5xl md:text-6xl"
          }`}
          dangerouslySetInnerHTML={{
            __html: slide?.html || slide?.text || "",
          }}
        />
        <div className="mt-6 text-sm opacity-60">Pulsa Esc para salir</div>
      </div>
    </div>
  );
}

export default function App() {
  const [rvrId, setRvrId] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [slides, setSlides] = useState([]); // {id, reference, html}
  const [idx, setIdx] = useState(0);

  const [showRef, setShowRef] = useState(true);
  const [showNumbers, setShowNumbers] = useState(false);
  const [mega, setMega] = useState(true);
  const [fs, setFs] = useState(false);

  // Detecta automáticamente RVR1960 en /bibles?language=spa
  useEffect(() => {
    (async () => {
      try {
        setError(null);
        const data = await api("/bibles", { language: "spa" });
        const list = data?.data || [];
        const rvr =
          list.find(
            (b) =>
              /reina\s*valera\s*1960/i.test(b.name) ||
              /RVR ?1960/i.test(b.abbreviationLocal || b.abbreviation)
          ) || list[0];
        setRvrId(rvr?.id || "");
      } catch (e) {
        setError(e.message);
      }
    })();
  }, []);

  // Búsqueda principal (palabra o referencia)
  const doSearch = async (e) => {
    e?.preventDefault?.();
    if (!rvrId || !query.trim()) return;
    try {
      setLoading(true);
      setError(null);

      // 1) Buscar ids de versos/pasajes
      const s = await api(`/bibles/${rvrId}/search`, {
        query: query.trim(),
        limit: 50,
      });
      const bag = s?.data || {};
      const items = bag.verses || bag.passages || [];
      if (!items.length) {
        setSlides([]);
        setIdx(0);
        return;
      }

      // 2) Traer HTML del verso (sin títulos/notas; números opcionales)
      const fetched = await Promise.all(
        items.map(async (it) => {
          const verseId = it.verseId || it.id;
          try {
            const v = await api(`/bibles/${rvrId}/verses/${verseId}`, {
              "content-type": "html",
              "include-verse-numbers": showNumbers,
              "include-titles": false,
              "include-notes": false,
            });
            return {
              id: verseId,
              reference: it.reference,
              html: v?.data?.content || "",
            };
          } catch {
            // fallback: usa contenido del search si vino
            return {
              id: verseId,
              reference: it.reference,
              html: it.content || it.text || "",
            };
          }
        })
      );

      setSlides(fetched.filter(Boolean));
      setIdx(0);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Teclas rápidas
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight" || e.key === "PageDown")
        setIdx((i) => Math.min(i + 1, slides.length - 1));
      if (e.key === "ArrowLeft" || e.key === "PageUp")
        setIdx((i) => Math.max(i - 1, 0));
      if (e.key.toLowerCase() === "f") setFs(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slides.length]);

  const current = slides[idx];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">
            RVR1960 · Presenter
          </h1>
          <div className="text-xs text-slate-500">
            API Key{" "}
            <code className="text-cyan-300">{API_KEY?.slice(0, 6)}•••</code>
          </div>
        </header>

        <form onSubmit={doSearch} className="mt-6 flex items-center gap-2">
          <input
            type="search"
            placeholder="Ej.: Génesis 1:1 · Juan 3:16 · 'amor'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button
            type="submit"
            className="rounded-2xl border border-cyan-400/30 bg-cyan-600/20 px-4 py-3 text-cyan-100 hover:bg-cyan-600/30"
          >
            Buscar
          </button>
        </form>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-300">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="accent-cyan-500"
              checked={showRef}
              onChange={(e) => setShowRef(e.target.checked)}
            />
            Mostrar referencia
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="accent-cyan-500"
              checked={showNumbers}
              onChange={(e) => setShowNumbers(e.target.checked)}
            />
            Números de versículo
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="accent-cyan-500"
              checked={mega}
              onChange={(e) => setMega(e.target.checked)}
            />
            Texto XL
          </label>
        </div>

        <div className="mt-3">
          {loading ? (
            <div className="text-sm text-slate-400 animate-pulse">Buscando…</div>
          ) : error ? (
            <div className="text-sm text-red-300">{String(error)}</div>
          ) : null}
        </div>

        <section className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          {current ? (
            <div className="space-y-3">
              {showRef && (
                <div className="text-sm md:text-base text-cyan-300/90">
                  {current.reference}
                </div>
              )}
              <div
                className={`prose prose-invert max-w-none ${
                  mega
                    ? "prose-p:text-3xl md:prose-p:text-5xl"
                    : "prose-p:text-2xl md:prose-p:text-4xl"
                } prose-p:leading-tight`}
                dangerouslySetInnerHTML={{ __html: current.html }}
              />
            </div>
          ) : (
            <p className="text-slate-400">
              Busca un texto para iniciar (p. ej., <em>Génesis 1:1</em>).
            </p>
          )}
        </section>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIdx((i) => Math.max(i - 1, 0))}
            className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2"
          >
            ⟵ Anterior
          </button>
          <button
            onClick={() =>
              setIdx((i) => Math.min(i + 1, slides.length - 1))
            }
            className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2"
          >
            Siguiente ⟶
          </button>
          <button
            onClick={() => setFs(true)}
            className="rounded-xl border border-emerald-400/30 bg-emerald-600/20 px-3 py-2 text-emerald-100 hover:bg-emerald-600/30"
          >
            Pantalla completa (F)
          </button>
          <span className="text-xs text-slate-500">
            {slides.length ? `${idx + 1}/${slides.length}` : ""}
          </span>
        </div>

        {slides.length > 1 && (
          <ol className="mt-4 flex flex-wrap gap-2 text-xs">
            {slides.map((s, i) => (
              <li key={s.id}>
                <button
                  onClick={() => setIdx(i)}
                  className={`rounded-full px-3 py-1 border ${
                    i === idx
                      ? "border-cyan-400/40 bg-cyan-600/20 text-cyan-100"
                      : "border-slate-700 bg-slate-900/70 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {s.reference}
                </button>
              </li>
            ))}
          </ol>
        )}

        <footer className="mt-8 border-t border-slate-800 pt-4 text-xs text-slate-500">
          <div>
            RVR1960 mediante API.Bible. Respeta derechos de la edición. (Uso de
            parámetros como <code>content-type</code> e{" "}
            <code>include-verse-numbers</code> según docs oficiales).
          </div>
        </footer>
      </div>

      <Fullscreen
        open={fs}
        onClose={() => setFs(false)}
        slide={current}
        showRef={showRef}
        mega={mega}
      />
    </div>
  );
}
