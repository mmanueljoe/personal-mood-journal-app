import {
  saveEntriesToLocalStorage,
  getEntriesFromLocalStorage,
} from "./storage.js";

// Mood Enum
export enum Mood {
  HAPPY = "happy",
  SAD = "sad",
  ANGRY = "angry",
  BORED = "bored",
  CURIOUS = "curious",
  EXCITED = "excited",
  FRUSTRATED = "frustrated",
  CONFUSED = "confused",
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

export type Journal = JournalEntry[];

// === CORE LOGIC ===

// create entries
let entries: Journal = [];

export function addEntry(entry: Partial<JournalEntry>): JournalEntry {
  // load existing entries
  entries = getEntriesFromLocalStorage();

  // generate a unique id
  const entryId: string = crypto.randomUUID();

  // create a new entry
  const newEntry: JournalEntry = {
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
export function getEntries(): Journal {
  // get the entries from localStorage
  const storedEntries = getEntriesFromLocalStorage();
  entries = storedEntries;

  // return the entries
  return entries;
}

// update entries
export function updateEntry(
  entryId: string,
  entry: Partial<JournalEntry>
): JournalEntry | null {
  // load existing entries
  entries = getEntriesFromLocalStorage();

  // find the entry by id
  const existingEntry = entries.find((e) => e.id === entryId);

  if (!existingEntry) return null;

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
export function deleteEntry(entryId: string): boolean {
  // load existing entries
  entries = getEntriesFromLocalStorage();

  // find the entry by id
  const entry = entries.find((e) => e.id === entryId);
  if (!entry) return false;

  // delete the entry from the entries array
  entries = entries.filter((e) => e.id !== entryId);

  // save to localStorage
  saveEntriesToLocalStorage(entries);
  return true;
}

// filter entries
export function filterEntries(mood: Mood): Journal {
  // load existing entries
  entries = getEntriesFromLocalStorage();

  // filter the entries by mood
  return entries.filter((e) => e.mood === mood);
}

// generic utility function
export function findByProperty<T>(
  list: T[],
  key: keyof T,
  value: T[keyof T]
): T | undefined {
  // find the item by property
  return list.find((item) => item[key] === value);
}
