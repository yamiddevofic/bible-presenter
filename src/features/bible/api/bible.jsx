// features/bible/api.js
import { api } from "./client";

export const getBibles = () => api("/bibles");

export const getBooks = (bibleId) => api(`/bibles/${bibleId}/books`);

export const getChapters = (bibleId, bookId) =>
  api(`/bibles/${bibleId}/books/${bookId}/chapters`);

export const getChapterHtml = (bibleId, chapterId) =>
  api(`/bibles/${bibleId}/chapters/${chapterId}`, { "content-type": "html" });

export const getChapterVerses = (bibleId, chapterId) =>
  api(`/bibles/${bibleId}/chapters/${chapterId}/verses`, {
    "content-type": "html",
  });

export const getVerseHtml = (bibleId, verseId) =>
  api(`/bibles/${bibleId}/verses/${verseId}`, { "content-type": "html" });

export const searchPassages = (bibleId, query, limit = 30) =>
  api(`/bibles/${bibleId}/search`, { query: query.trim(), limit });
