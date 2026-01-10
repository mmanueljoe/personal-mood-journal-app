import type { Journal } from "./journal.js";
export declare function saveEntriesToLocalStorage(entries: Journal): void;
export declare function getEntriesFromLocalStorage(): Journal;
export declare function savePreferencesToLocalStorage(theme: "system" | "light" | "dark"): void;
export declare function getPreferencesFromLocalStorage(): {
    theme: "system" | "light" | "dark";
};
//# sourceMappingURL=storage.d.ts.map