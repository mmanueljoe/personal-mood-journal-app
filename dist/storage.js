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
//# sourceMappingURL=storage.js.map