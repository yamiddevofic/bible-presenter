import React, { useEffect, useState } from "react";
import { getChapterHtml, getChapterVerses } from "../api/bible";

export default function useChapterContent(bibleId, chapterId) {
  const [chapterHtml, setChapterHtml] = useState("");
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!bibleId || !chapterId) return;
    (async () => {
      try {
        setError(null); setLoading(true);
        const [htmlRes, versesRes] = await Promise.all([
          getChapterHtml(bibleId, chapterId),
          getChapterVerses(bibleId, chapterId),
        ]);
        setChapterHtml(htmlRes?.data?.content || "");
        setVerses(versesRes?.data || []);
      } catch (e) { setError(e.message); }
      finally { setLoading(false); }
    })();
  }, [bibleId, chapterId]);

  return { chapterHtml, verses, loading, error };
}
