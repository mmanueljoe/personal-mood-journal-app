import { type Journal, type JournalEntry } from "./journal.js";
import { Mood } from "./journal.js";
export declare const elements: {
    themeToggleBtn: HTMLElement | HTMLElement[] | null;
    entriesContainer: HTMLElement | HTMLElement[] | null;
    stats: HTMLElement | HTMLElement[] | null;
    addEntryBtn: HTMLElement | HTMLElement[] | null;
    entryFormModal: HTMLElement | HTMLElement[] | null;
    editBtn: HTMLElement | HTMLElement[] | null;
    deleteBtn: HTMLElement | HTMLElement[] | null;
    searchInput: HTMLElement | HTMLElement[] | null;
    moodFilter: HTMLElement | HTMLElement[] | null;
};
export declare function toggleTheme(): void;
export declare const themeToggleBtn: HTMLElement | null;
export declare function renderStats(entries: Journal): void;
export declare function renderEntriesList(entries: Journal): void;
export declare function EntryPreview(entry: JournalEntry): void;
export declare function renderEntryForm(entry?: JournalEntry): void;
export declare function showFormModal(): void;
export declare function hideFormModal(): void;
export declare function handleSearch(event: Event): void;
export declare function handleMoodFilter(mood: Mood | null): void;
export declare function showConfirmationModal(entryId: string): void;
export declare function showToast(message: string): void;
//# sourceMappingURL=ui.d.ts.map