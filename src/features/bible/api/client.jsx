import React from "react";

const API_BASE = "https://api.scripture.api.bible/v1";
const API_KEY =
  (typeof process !== "undefined" && process.env?.VITE_API_BIBLE_KEY) ||
  "0142214e0b636f91032b1cb7530b88cd"; // demo

export async function api(path, params = {}) {
  const url = new URL(API_BASE + path);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v);
  });
  const res = await fetch(url.toString(), {
    headers: { accept: "application/json", "api-key": API_KEY },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text}`);
  }
  return res.json();
}
