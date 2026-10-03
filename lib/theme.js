// Theme follows local settings, including changes from other open pages.
const Themes = (() => {
  const { DEFAULT, normalize } = ThemeCatalog;
  const apply = (value) => { document.documentElement.dataset.theme = normalize(value); };
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes.settings) apply(changes.settings.newValue?.theme);
  });
  const ready = chrome.storage.local.get("settings").then(({ settings }) => apply(settings?.theme));
  ready.catch(() => apply(DEFAULT));
  return { DEFAULT, normalize, ready };
})();
