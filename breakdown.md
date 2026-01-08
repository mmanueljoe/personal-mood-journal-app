# Personal Mood Journal App - Task Breakdown

## Project Overview
Build a dynamic, client-side Journal Application that allows users to write and save personal journal entries, each associated with a specific mood. The primary focus is mastering TypeScript's type system, interfaces, and tooling.

---

## 1. Project Setup

### 1.1 Tooling and Configuration
- ✅ Initialize TypeScript: Create Node project with `typescript` and `ts-node` as dev dependencies
- ✅ Create `tsconfig.json`: Use `npx tsc --init` and configure:
  - Enable `"strict": true` for maximum type safety
  - Set `rootDir` (e.g., `./src`) and `outDir` (e.g., `./dist`)
  - Set `target` to modern standard (e.g., `"es2020"`)

### 1.2 Codebase Structure
- `index.html`: Main entry point (links to compiled `.js` files in `dist` directory)
- `src/journal.ts`: Core application logic and event handlers
- `src/storage.ts`: Handles type-safe data serialization/deserialization with localStorage
- `src/ui.ts`: Handles all type-safe DOM manipulation

---

## 2. Data Typing and Modeling

### 2.1 Core Interface
**Task**: Define a required `JournalEntry` interface with exact structure:
```typescript
interface JournalEntry {
    id: string;
    title: string;
    content: string;
    mood: Mood; // Must use the Mood Enum
    timestamp: number;
}
```

### 2.2 Enums
**Task**: Create a required `Mood` Enum to define possible mood categories:
- Examples: `HAPPY`, `SAD`, `MOTIVATED`, `STRESSED`, `CALM`
- Define as: `enum Mood { ... }`

### 2.3 Type Alias (Optional Challenge)
**Task**: Create a type alias for the collection:
```typescript
type Journal = JournalEntry[];
```

---

## 3. Generic and Type-Safe Functionality

### 3.1 Generic Utility Function
**Task**: Implement a reusable function in `journal.ts` using Generic Type Parameter `<T>`:
```typescript
function findByProperty<T>(
    list: T[], 
    key: keyof T, 
    value: T[keyof T]
): T | undefined { 
    /* implementation */ 
}
```
- Purpose: Safely find an item by a property (e.g., ID) within any array of objects
- Must be generic and type-safe

### 3.2 Type Assertion for Storage
**Task**: In `storage.ts`:
- Ensure data loaded from `localStorage` is correctly parsed
- Assert data to be `JournalEntry[]`
- Handle the `null` case from `localStorage` gracefully and type-safely
- Use type assertions appropriately

### 3.3 Type-Safe Mutations
**Task**: Write the `addEntry` function:
- Accept a partial entry (some fields may be optional during creation)
- Enforce the `JournalEntry` interface upon creation
- Ensure all fields are present and correctly typed before saving
- All parameters and return values must be explicitly typed

---

## 4. Application Integration and Compilation

### 4.1 Core Logic Implementation
**Task**: Implement full business logic in `journal.ts`:
- ✅ `addEntry` (create new entries)
- `editEntry` (update existing entries)
- `deleteEntry` (remove entries)
- `filterEntries` (filter by mood, date, etc.)
- All function parameters and return values must be explicitly typed
- Use defined Interfaces and Enums throughout

### 4.2 DOM Manipulation
**Task**: In `ui.ts`:
- Use template literals and modern DOM methods to render entries
- Ensure data passed to rendering function is always of type `JournalEntry[]`
- Handle all DOM operations in a type-safe manner
- Implement form handling and event listeners

### 4.3 Compilation
**Task**: Demonstrate successful compilation:
- Run `npx tsc` command
- Test resulting JavaScript files in the browser
- Note where the compiler prevented runtime errors
- Ensure all TypeScript errors are resolved before runtime

---

## 5. UI Implementation and Responsiveness

### 5.1 UI/UX Design
**Task**: Implement custom-designed UI using clean HTML and CSS:
- Input form for creating/editing entries
- Display area for journal entries
- Filtering mechanism (by mood, date, etc.)
- Clean, modern design

### 5.2 Responsiveness
**Task**: Ensure full mobile responsiveness:
- Application must be usable on all devices
- Test on mobile, tablet, and desktop viewports
- Use responsive CSS techniques (media queries, flexbox/grid, etc.)

---

## Implementation Order (Suggested)

1. **Setup & Configuration** (Already done ✅)
   - TypeScript configuration
   - Project structure

2. **Data Modeling** (Start here)
   - Define `Mood` enum
   - Define `JournalEntry` interface
   - Create `Journal` type alias (optional)

3. **Storage Layer** (`storage.ts`)
   - Implement type-safe localStorage functions
   - Handle serialization/deserialization
   - Type assertions for loaded data

4. **Core Logic** (`journal.ts`)
   - Implement generic `findByProperty` function
   - Implement CRUD operations (add, edit, delete, filter)
   - Ensure all functions are type-safe

5. **UI Layer** (`ui.ts`)
   - Implement DOM manipulation functions
   - Render entries using template literals
   - Handle user interactions

6. **HTML/CSS**
   - Create `index.html`
   - Design and implement responsive CSS
   - Connect all layers

7. **Testing & Compilation**
   - Compile TypeScript
   - Test in browser
   - Fix any type errors
   - Test responsiveness

---

## Key TypeScript Concepts to Master

- ✅ **Interfaces**: Define contracts for data structures
- ✅ **Enums**: Define fixed sets of values
- ✅ **Type Aliases**: Create reusable type definitions
- ✅ **Generics**: Write reusable, type-safe functions
- ✅ **Type Assertions**: Safely convert types when needed
- ✅ **keyof Operator**: Access object keys as types
- ✅ **Strict Mode**: Maximum type safety
- ✅ **Type Inference**: Let TypeScript infer types where appropriate

---

## Notes

- All code must be written in TypeScript (`.ts` files)
- Code is compiled to JavaScript (`.js` files in `dist` directory)
- Focus on type safety - the compiler should catch errors before runtime
- Use explicit types for function parameters and return values
- Handle edge cases (null, undefined, empty arrays) type-safely

