export declare enum Mood {
    HAPPY = "happy",
    SAD = "sad",
    ANGRY = "angry",
    BORED = "bored",
    CURIOUS = "curious",
    EXCITED = "excited",
    FRUSTRATED = "frustrated",
    CONFUSED = "confused"
}
export interface JournalEntry {
    id: string;
    title: string;
    content: string;
    mood: Mood;
    timestamp: number;
}
export type Journal = JournalEntry[];
export declare function addEntry(entry: Partial<JournalEntry>): JournalEntry;
export declare function getEntries(): Journal;
export declare function updateEntry(entryId: string, entry: Partial<JournalEntry>): JournalEntry | null;
export declare function deleteEntry(entryId: string): boolean;
export declare function filterEntries(mood: Mood): Journal;
export declare function findByProperty<T>(list: T[], key: keyof T, value: T[keyof T]): T | undefined;
//# sourceMappingURL=journal.d.ts.map