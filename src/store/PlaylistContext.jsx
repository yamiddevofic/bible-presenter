import React, { createContext, useContext, useMemo, useReducer, useState } from "react";

const Ctx = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "ADD_MANY": return [...state, ...action.items];
    case "ADD_ONE":  return [...state, action.item];
    case "REMOVE":   return state.filter(s => s.id !== action.id);
    case "CLEAR":    return [];
    default:         return state;
  }
}

export function PlaylistProvider({ children }) {
  const [playlist, dispatch] = useReducer(reducer, []);
  const [presenting, setPresenting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [theme, setTheme] = useState("dark");
  const [showRef, setShowRef] = useState(true);

  const next = () => setCurrentIndex(i => Math.min(i + 1, playlist.length - 1));
  const prev = () => setCurrentIndex(i => Math.max(i - 1, 0));

  const value = useMemo(() => ({
    playlist, dispatch,
    presenting, setPresenting,
    currentIndex, setCurrentIndex,
    theme, setTheme,
    showRef, setShowRef,
    next, prev
  }), [playlist, presenting, currentIndex, theme, showRef]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const usePlaylist = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePlaylist must be used within PlaylistProvider");
  return ctx;
};
