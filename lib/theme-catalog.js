// Pure metadata shared by the UI and backup validation; no browser APIs.
const ThemeCatalog = (() => {
  const DEFAULT = "burgundy";
  const entries = Object.freeze([
    { id: "coral", label: "coral · 珊瑚暖陽" },
    { id: "burgundy", label: "burgundy · 酒紅霧白" },
    { id: "violet", label: "violet · 紫莓映白" },
    { id: "oat", label: "oat · 燕麥奶茶" },
    { id: "sage", label: "sage · 鼠尾草綠" },
    { id: "clay", label: "clay · 陶土暖白" },
    { id: "mist", label: "mist · 霧藍米白" },
    { id: "rose", label: "rose · 玫瑰灰粉" },
    { id: "classic", label: "classic · 冷灰藍" }
  ].map(Object.freeze));
  const aliases = new Map([["miao", "burgundy"], ["soonmarker", "burgundy"]]);
  const ids = new Set(entries.map(({ id }) => id));
  // Unknown imports are omitted; only the UI falls back to the default.
  const resolve = (value) => {
    const id = aliases.get(value) || value;
    return ids.has(id) ? id : undefined;
  };
  const normalize = (value) => resolve(value) || DEFAULT;
  return Object.freeze({ DEFAULT, entries, resolve, normalize });
})();
