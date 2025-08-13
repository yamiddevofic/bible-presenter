import React, { useEffect, useState } from "react";
import { getBooks } from "../../../api/bible";

export default function useBooks(bibleId) {
  const [books, setBooks] = useState([]);
  const [bookId, setBookId] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!bibleId) return;
    (async () => {
      try {
        setError(null);
        setBooks([]); setBookId("");
        const data = await getBooks(bibleId);
        const list = data.data || [];
        setBooks(list);
        const genesis = list.find(bk => bk.id?.startsWith("GEN")) || list[0];
        if (genesis) setBookId(genesis.id);
      } catch (e) { setError(e.message); }
    })();
  }, [bibleId]);

  return { books, bookId, setBookId, error };
}
