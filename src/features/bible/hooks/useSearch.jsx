import React, { useState, useEffect } from "react";
import { searchPassages } from "../api/bible";

export default function useSearch(bibleId) {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [isReference, setIsReference] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setError(null);
    }
  }, [query]);

  async function doSearch(e) {
    e?.preventDefault?.();
    const q = query.trim();
    if (!bibleId || !q) return;
    const refPattern = /^([1-3]?\s?[A-Za-zÁÉÍÓÚÑáéíóúñ]+)\s+\d+(?::\d+(?:-\d+)?)?$/i;
    const isRef = refPattern.test(q);
    setIsReference(isRef);
    try {
      setSearching(true); setError(null);
      const data = await searchPassages(bibleId, q, 30);
      const d = data?.data || {};
      setResults(d.passages || d.verses || []);
    } catch (e2) { setError(e2.message); }
    finally { setSearching(false); }
  }

  return { query, setQuery, searching, results, error, isReference, doSearch };
}
