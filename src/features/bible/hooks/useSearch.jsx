import React, { useState } from "react";
import { searchPassages } from "../../../api/bible";

export default function useSearch(bibleId) {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  async function doSearch(e) {
    e?.preventDefault?.();
    if (!bibleId || !query.trim()) return;
    try {
      setSearching(true); setError(null);
      const data = await searchPassages(bibleId, query, 30);
      const d = data?.data || {};
      setResults(d.passages || d.verses || []);
    } catch (e2) { setError(e2.message); }
    finally { setSearching(false); }
  }

  return { query, setQuery, searching, results, error, doSearch };
}
