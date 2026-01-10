// STORAGE KEYS
const STORAGE_KEY = {
    MOOD_ENTRIES: "mood-entries",
    PREFERENCES: "preferences",
};
// === STORAGE FUNCTIONS ===
// save entries to localStorage
export function saveEntriesToLocalStorage(entries) {
    // save the entries to localStorage
    localStorage.setItem(STORAGE_KEY.MOOD_ENTRIES, JSON.stringify(entries));
}
// get entries from localStorage
export function getEntriesFromLocalStorage() {
    // get the entries from localStorage
    const storedEntries = localStorage.getItem(STORAGE_KEY.MOOD_ENTRIES);
    // parse the entries from localStorage and assert the type
    return storedEntries ? JSON.parse(storedEntries) : [];
}
// save preferences to localStorage (theme)
export function savePreferencesToLocalStorage(theme) {
    // save the preferences to localStorage
    localStorage.setItem(STORAGE_KEY.PREFERENCES, JSON.stringify({ theme }));
}
// get preferences from localStorage
export function getPreferencesFromLocalStorage() {
    // get the preferences from localStorage
    const storedPreferences = localStorage.getItem(STORAGE_KEY.PREFERENCES);
    // parse the preferences from localStorage and assert the type
    return storedPreferences ? JSON.parse(storedPreferences) : { theme: "system" };
}
//# sourceMappingURL=storage.js.map