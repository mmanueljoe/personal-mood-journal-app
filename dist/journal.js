import { saveEntriesToLocalStorage, getEntriesFromLocalStorage, } from "./storage.js";
// Mood Enum
export var Mood;
(function (Mood) {
    Mood["HAPPY"] = "happy";
    Mood["SAD"] = "sad";
    Mood["ANGRY"] = "angry";
    Mood["BORED"] = "bored";
    Mood["CURIOUS"] = "curious";
    Mood["EXCITED"] = "excited";
    Mood["FRUSTRATED"] = "frustrated";
    Mood["CONFUSED"] = "confused";
})(Mood || (Mood = {}));
// === CORE LOGIC ===
// create entries
let entries = [];
export function addEntry(entry) {
    // load existing entries
    entries = getEntriesFromLocalStorage();
    // generate a unique id
    const entryId = crypto.randomUUID();
    // create a new entry
    const newEntry = {
        id: entry.id || entryId,
        title: entry.title ?? "Untitled Entry",
        content: entry.content ?? "No content",
        mood: entry.mood ?? Mood.HAPPY,
        timestamp: entry.timestamp ?? Date.now(),
    };
    // add the new entry to the entries array
    entries.push(newEntry);
    // save to localStorage
    saveEntriesToLocalStorage(entries);
    // return the new entry
    return newEntry;
}
// read/retrieve entries
export function getEntries() {
    // get the entries from localStorage
    const storedEntries = getEntriesFromLocalStorage();
    entries = storedEntries;
    // return the entries
    return entries;
}
// update entries
export function updateEntry(entryId, entry) {
    // load existing entries
    entries = getEntriesFromLocalStorage();
    // find the entry by id
    const existingEntry = entries.find((e) => e.id === entryId);
    if (!existingEntry)
        return null;
    // update the entry
    existingEntry.title = entry.title ?? existingEntry.title;
    existingEntry.content = entry.content ?? existingEntry.content;
    existingEntry.mood = entry.mood ?? existingEntry.mood;
    existingEntry.timestamp = entry.timestamp ?? Date.now();
    // save to localStorage
    saveEntriesToLocalStorage(entries);
    // return the updated entry
    return existingEntry;
}
// delete entries
export function deleteEntry(entryId) {
    // load existing entries
    entries = getEntriesFromLocalStorage();
    // find the entry by id
    const entry = entries.find((e) => e.id === entryId);
    if (!entry)
        return false;
    // delete the entry from the entries array
    entries = entries.filter((e) => e.id !== entryId);
    // save to localStorage
    saveEntriesToLocalStorage(entries);
    return true;
}
// filter entries
export function filterEntries(mood) {
    // load existing entries
    entries = getEntriesFromLocalStorage();
    // filter the entries by mood
    return entries.filter((e) => e.mood === mood);
}
// generic utility function
export function findByProperty(list, key, value) {
    // find the item by property
    return list.find((item) => item[key] === value);
}
//# sourceMappingURL=journal.js.map