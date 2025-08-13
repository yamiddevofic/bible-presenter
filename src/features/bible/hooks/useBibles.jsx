import React, { useEffect, useMemo, useState } from "react";
import { getBibles } from "../../../api/bible";

export default function useBibles(langFilter = "spa") {
  const [bibles, setBibles] = useState([]);
  const [bibleId, setBibleId] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setError(null);
        const data = await getBibles();
        const list = Array.isArray(data?.data) ? data.data : [];
        setBibles(list);
        const preferred = list.find(b => b.language?.id === "spa") || list[0];
        if (preferred) setBibleId(preferred.id);
      } catch (e) { setError(e.message); }
    })();
  }, []);

  const filtered = useMemo(() =>
    bibles
      .filter(b => (langFilter === "all" ? true : b.language?.id === langFilter))
      .filter(b => ["spa","eng","por"].includes(b.language?.id))
      .sort((a, b) => (a.language?.name > b.language?.name ? 1 : -1))
  , [bibles, langFilter]);

  return { bibles: filtered, bibleId, setBibleId, error };
}
