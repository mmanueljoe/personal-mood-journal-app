import type { JournalEntry } from "./journal.js";

// STORAGE KEYS
const STORAGE_KEY = {
    MOOD_ENTRIES: "mood-entries",
    PREFERENCES: "preferences",
}


// save entries to localStorage
function saveEntriesToLocalStorage(entries: JournalEntry[]): void {
    // save the entries to localStorage
    localStorage.setItem(STORAGE_KEY.MOOD_ENTRIES, JSON.stringify(entries));
}

// get entries from localStorage
function getEntriesFromLocalStorage(): JournalEntry[] {
    // get the entries from localStorage
    const storedEntries = localStorage.getItem(STORAGE_KEY.MOOD_ENTRIES);

    // parse the entries from localStorage
    return storedEntries ? JSON.parse(storedEntries) : [];
}


// export the functions
export { saveEntriesToLocalStorage, getEntriesFromLocalStorage };
