import { saveEntriesToLocalStorage, getEntriesFromLocalStorage } from "./storage.js";

// Mood Enum
enum Mood {
    HAPPY = 'happy',
    SAD = 'sad',
    ANGRY = 'angry',
    BORED = 'bored',
    CURIOUS = 'curious',
    EXCITED = 'excited',
    FRUSTRATED = 'frustrated',
    CONFUSED = 'confused',
}


// === MODELS ===
// Journal Entry Model
export interface JournalEntry {
    id: string;
    title: string;
    content: string;
    mood: Mood;
    timestamp: number;
}


// === CORE LOGIC ===

// create entries
let entries: JournalEntry[] = [];
function addEntry(entry: JournalEntry): JournalEntry {
    // generate a unique id
    const entryId: string = crypto.randomUUID();

    // create a new entry
    const newEntry: JournalEntry = {
        id: entryId,
        title: entry.title,
        content: entry.content,
        mood: entry.mood,
        timestamp: Date.now(),
    };

    // add the new entry to the entries array
    entries.push(newEntry);

    // save to localStorage
    saveEntriesToLocalStorage(entries);

    // return the new entry
    return newEntry;
}

// read/retrieve entries
function getEntries(): JournalEntry[]{
    // get the entries from localStorage
    const storedEntries = getEntriesFromLocalStorage();
    entries = storedEntries;

    
    return entries;
}

// update entries
function updateEntry(entryId: string): JournalEntry | null {
    // find the entry by id
    const entry = entries.find(entry => entry.id === entryId);

    if (!entry) return null;

    // update the entry
    entry.title = entry.title;
    entry.content = entry.content;
    entry.mood = entry.mood;
    entry.timestamp = Date.now();

    // update the entry in the entries array
    entries = entries.map(e => e.id === entryId ? entry : e);

    // save to localStorage
    saveEntriesToLocalStorage(entries);

    // return the updated entry
    return entry;
}

// delete entries
function deleteEntry(entryId: string): boolean {
    // find the entry by id
    const entry = entries.find(entry => entry.id === entryId);
    if (!entry) return false;

    // delete the entry from the entries array
    entries = entries.filter(e => e.id !== entryId);

    // save to localStorage
    saveEntriesToLocalStorage(entries);
    return true;
}

// filter entries
function filterEntries(mood: Mood): JournalEntry[] {
    // filter the entries by mood
    return entries.filter(e => e.mood === mood);
}