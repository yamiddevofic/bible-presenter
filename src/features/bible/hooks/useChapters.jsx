import React, { useEffect, useState } from "react";
import { getChapters } from "../../../api/bible";

export default function useChapters(bibleId, bookId) {
  const [chapters, setChapters] = useState([]);
  const [chapterId, setChapterId] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!bibleId || !bookId) return;
    (async () => {
      try {
        setError(null);
        setChapters([]); setChapterId("");
        const data = await getChapters(bibleId, bookId);
        const list = data.data || [];
        setChapters(list);
        if (list[0]) setChapterId(list[0].id);
      } catch (e) { setError(e.message); }
    })();
  }, [bibleId, bookId]);

  return { chapters, chapterId, setChapterId, error };
}
