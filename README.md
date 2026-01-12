# Personal Mood Journal App 📝

A modern, type-safe Personal Mood Journal Application built with TypeScript. Track your daily moods, thoughts, and experiences with a clean, responsive interface.

## ✨ Features

### Core Functionality
- ✅ **Add Journal Entries** - Create new entries with title, content, and mood
- ✅ **View Entries** - Browse all entries in a responsive grid/list layout
- ✅ **Edit Entries** - Update existing entries with a modal form
- ✅ **Delete Entries** - Remove entries with confirmation dialog
- ✅ **Filter by Mood** - Filter entries by specific moods
- ✅ **Search Entries** - Search through entry titles and content
- ✅ **Entry Details** - View full entry details in a modal
- ✅ **Statistics** - View stats (total entries, words, days journaled, entries this year)

### UI/UX Features
- 🌓 **Theme Toggle** - Switch between light, dark, and system themes
- 📱 **Responsive Design** - Fully responsive for mobile, tablet, and desktop
- 🎨 **Mood Badges** - Color-coded mood indicators with emojis
- 🔍 **Search** - Real-time search with debouncing
- 📊 **Stats Dashboard** - Visual statistics display
- 🎯 **Empty States** - Helpful empty state messages
- 🔔 **Toast Notifications** - User feedback for actions

## 🛠️ Technologies Used

- **TypeScript** - Type-safe JavaScript with strict mode
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid, Flexbox, and custom properties
- **LocalStorage API** - Client-side data persistence
- **ES6+ Features** - Modern JavaScript features

## 📁 Project Structure

```
personal-mood-journal-app/
├── src/
│   ├── index.ts          # Main entry point, event listeners
│   ├── journal.ts        # Core business logic (CRUD operations)
│   ├── storage.ts        # LocalStorage operations
│   ├── ui.ts             # DOM manipulation and rendering
│   └── utils.ts          # Utility functions
├── dist/                 # Compiled JavaScript files
├── css/
│   └── styles.css        # All styling
├── index.html            # Main HTML file
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mmanueljoe/personal-mood-journal-app.git
   cd personal-mood-journal-app
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Compile TypeScript**
   ```bash
   yarn run build
   ```
   Or use watch mode:
   ```bash
   yarn run build
   ```

4. **Open in browser**
   - Open `index.html` in your browser

## 📚 TypeScript Concepts Demonstrated

This project showcases various TypeScript features:

- **Interfaces** - `JournalEntry` interface for type safety
- **Enums** - `Mood` enum for mood categories
- **Type Aliases** - `Journal` type alias
- **Generics** - `findByProperty<T>` generic utility function
- **Type Assertions** - Safe type casting for localStorage data
- **keyof Operator** - Type-safe property access
- **Partial Types** - Optional properties in function parameters
- **Strict Mode** - Maximum type safety enabled

## 🎯 Learning Areas to Improve

### 🔴 Critical - Must Learn These

1. **Event Delegation**
   - How event delegation works (`closest()`, `target`, event bubbling)
   - Why we use it for dynamically created elements
   - **Location**: `src/index.ts:125-189`

2. **Type Assertions & Type Guards**
   - When and how to use `as` keyword safely
   - Type guards vs type assertions
   - **Location**: `src/storage.ts:23`, `src/index.ts:52-54`

3. **Generic Functions**
   - Understanding `<T>` syntax
   - `keyof T` operator
   - **Location**: `src/journal.ts:124-131`

4. **Partial Types**
   - `Partial<JournalEntry>` usage
   - When to use partial vs required types
   - **Location**: `src/journal.ts:35, 72`

5. **DOM Manipulation Patterns**
   - Creating elements dynamically
   - Template literals for HTML
   - Event listener management
   - **Location**: `src/ui.ts` (throughout)

### 🟡 Important - Should Understand

6. **Debouncing**
   - Why debounce search input
   - How debounce function works
   - **Location**: `src/utils.ts:17-24`, `src/index.ts:195-198`

7. **CSS Grid & Flexbox**
   - Grid layout for entries container
   - Responsive grid with `repeat(auto-fill, minmax())`
   - **Location**: `css/styles.css:967-972`

8. **CSS Custom Properties (Variables)**
   - Theme switching with CSS variables
   - Dark mode implementation
   - **Location**: `css/styles.css:19-60`

9. **LocalStorage API**
   - Serialization/deserialization
   - Error handling
   - **Location**: `src/storage.ts`

10. **Modal Patterns**
    - Creating/destroying modals
    - Preventing body scroll
    - Backdrop clicks
    - **Location**: `src/ui.ts:300-314, 479-560`

### 🟢 Nice to Know - Advanced Topics

11. **Type Inference**
    - When TypeScript infers types automatically
    - When to be explicit vs implicit

12. **Module System**
    - ES6 modules (`import`/`export`)
    - TypeScript module resolution

13. **CSS Animations**
    - Keyframe animations
    - Transition effects
    - **Location**: `css/styles.css` (various)

14. **Accessibility**
    - ARIA labels
    - Semantic HTML
    - Keyboard navigation

## 🧪 Testing

Currently, manual testing is used. To test:

1. Open the app in a browser
2. Test all CRUD operations
3. Test search and filtering
4. Test responsive design on different screen sizes
5. Test theme switching

## 📝 Scripts

- `yarn run build` - Compile TypeScript (watch mode)

## 🤝 Contributing

This is a learning project. Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

MIT License - see LICENSE file for details

## 👤 Author

**Emmanuel Joe Letsu**
- GitHub: [@mmanueljoe](https://github.com/mmanueljoe)
- Email: emmanuelletsu18@gmail.com

## 🙏 Acknowledgments

- Built as a learning project to master TypeScript

---

**Note**: This project focuses on TypeScript type safety and modern web development practices. Review the code to understand how type safety prevents runtime errors!
