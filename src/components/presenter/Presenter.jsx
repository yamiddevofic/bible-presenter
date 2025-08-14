// components/presenter/Presenter.jsx
import React, { useEffect, useRef, useState } from "react";

export default function Presenter({ open, onClose, slides, index, theme, showRef }) {
  const ref = useRef(null);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    if (!open) return;
    const el = ref.current;
    if (el && !document.fullscreenElement) {
      el.requestFullscreen?.().catch(() => {});
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (!open) return;
      if (["ArrowRight", "PageDown", "Space"].includes(e.key)) {
        e.preventDefault();
        document.getElementById("nextSlide")?.click();
      } else if (["ArrowLeft", "PageUp"].includes(e.key)) {
        e.preventDefault();
        document.getElementById("prevSlide")?.click();
      } else if (e.key.toLowerCase() === "b") {
        e.preventDefault();
        setShowImage((prev) => !prev);
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const slide = slides[index] || {};
  const hasHtml = typeof slide.html === "string" && slide.html.trim() !== "";
  const hasText = typeof slide.text === "string" && slide.text.trim() !== "";

  return (
    <div ref={ref} className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/church.svg')" }}
      />
      {!showImage && (
        <>
          <div
            className={`absolute inset-0 ${
              theme === "light" ? "bg-white/80" : "bg-black/80"
            }`}
          />
          <div
            className={`relative h-full w-full flex flex-col items-center justify-center px-12 py-8 ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            <div className="max-w-6xl w-full text-center">
              {showRef && slide.reference && (
                <div className="text-3xl font-light opacity-80 mb-8 tracking-wide">
                  {slide.reference}
                </div>
              )}

              <div
                id="presenter-content"
                className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-wide"
                style={{ lineHeight: "1.4" }}
              >
                {hasHtml ? (
                  <div dangerouslySetInnerHTML={{ __html: slide.html }} className="max-w-[100vw]" />
                ) : hasText ? (
                  slide.html
                ) : (
                  <span className="opacity-60 text-2xl">Sin contenido</span>
                )}
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4
                            bg-black/20 backdrop-blur-sm rounded-full px-6 py-3 text-sm opacity-70 hover:opacity-100 transition-opacity">
              <button id="prevSlide" onClick={() => slide._prev?.()} className="p-2 hover:bg-white/20 rounded-full">← Anterior</button>
              <span className="px-4 py-1 bg-white/10 rounded-full">{index + 1} / {slides.length}</span>
              <button id="nextSlide" onClick={() => slide._next?.()} className="p-2 hover:bg-white/20 rounded-full">Siguiente →</button>
              <div className="w-px h-6 bg-white/30" />
              <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full">Salir</button>
            </div>

            <div className="absolute top-4 right-4 text-xs opacity-50">
              ← → Espacio | B (Ocultar texto) | Esc (Salir)
            </div>
          </div>
        </>
      )}
    </div>
  );
}
