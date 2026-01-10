import { getElementsByType, debounce, formatDate } from "./utils.js";
import { findByProperty, type Journal, type JournalEntry } from "./journal.js";
import * as journal from "./journal.js";
import { Mood } from "./journal.js";
import { getPreferencesFromLocalStorage, savePreferencesToLocalStorage } from "./storage.js";

// elements
export const elements = {
  themeToggleBtn: getElementsByType("id", "theme-toggle-btn"),
  entriesContainer: getElementsByType("id", "entries-container"),
  stats: getElementsByType("id", "stats"),
  addEntryBtn: getElementsByType("id", "add-entry-btn"),
  entryFormModal: getElementsByType("id", "entry-form-modal"),
  editBtn: getElementsByType("class", "edit-btn"),
  deleteBtn: getElementsByType("class", "delete-btn"),
  searchInput: getElementsByType("id", "search-input"),
  moodFilter: getElementsByType("id", "mood-filter"),
  themeToggleBtnDesktop: getElementsByType("id", "theme-toggle-btn-desktop"),
  themeToggleBtnMobile: getElementsByType("id", "theme-toggle-btn-mobile"),
};

// theme toggle button
export function toggleTheme(): void {
  // toggle the theme
  document.body.classList.toggle("dark");

  // Update icons
  updateThemeIcons();

  // save the theme to localStorage
  const currentTheme = document.body.classList.contains("dark") ? "dark" : "light";
  savePreferencesToLocalStorage(currentTheme as "system" | "light" | "dark");
}

// add event listener to the theme toggle button
export function initializeThemeToggle(): void {
  // get the theme from localStorage
  const preferences = getPreferencesFromLocalStorage(); 
  // set the theme based on the preferences
  if(preferences.theme === "system"){
    // check if the system theme is dark
    if(window.matchMedia("(prefers-color-scheme: dark)").matches){
      document.body.classList.add("dark");
    }else {
      document.body.classList.remove('dark');
    }
  } else if(preferences.theme === "light"){
    document.body.classList.remove("dark");
  } else if(preferences.theme === "dark"){
    document.body.classList.add("dark");
  }

  // update icons based on current theme state
  updateThemeIcons();
  
  if(elements.themeToggleBtnDesktop){
    (elements.themeToggleBtnDesktop as HTMLElement).addEventListener("click", toggleTheme);
  }
  if(elements.themeToggleBtnMobile){
    (elements.themeToggleBtnMobile as HTMLElement).addEventListener("click", toggleTheme);
  }

}

// render stats
export function renderStats(entries: Journal): void {
  const statsContainer = elements.stats as HTMLElement;
  if(!statsContainer) return;

  // calculate stats
  const totalEntries = entries.length;

  // calculate total words (split by spaces and filter empty strings)
  const totalWords = entries.reduce((sum, entry) => {
    const words = entry.content.trim().split(/\s+/).filter(word => word.length > 0);
    return sum + words.length;
  }, 0);

  // calculate unique days journaled
  const uniqueDays = new Set(
    entries.map(entry => {
      const date = new Date(entry.timestamp);
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    })
  );
  const daysJournaled = uniqueDays.size;


  // calculate entries this year
  const currentYear = new Date().getFullYear();
  const entriesThisYear = entries.filter(entry => {
    const entryYear = new Date(entry.timestamp).getFullYear();
    return entryYear === currentYear;
  }).length;


  // Render stats
  statsContainer.innerHTML = `
    <div class="stat-item">
      <span class="stat-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-words-icon lucide-words"><path d="M4 12h16"/><path d="M4 18h4"/><path d="M4 6h16"/></svg>
      </span>
      <span class="stat-value">${totalWords}</span>
      <span class="stat-label">Words</span>
    </div>
    <div class="stat-item">
      <span class="stat-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-icon lucide-calendar"><rect width="20" height="18" x="2" y="4" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
      </span>
      <span class="stat-value">${daysJournaled}</span>
      <span class="stat-label">Days</span>
    </div>
    <div class="stat-item">
      <span class="stat-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-icon lucide-calendar"><rect width="20" height="18" x="2" y="4" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
      </span>
      <span class="stat-value">${entriesThisYear}</span>
      <span class="stat-label">This Year</span>
    </div>
    <div class="stat-item">
      <span class="stat-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-icon lucide-calendar"><rect width="20" height="18" x="2" y="4" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
      </span>

      <span class="stat-label">
      <span class="stat-value">${totalEntries}</span>
      Total Entries
      </span>
    </div>
  `;
}

// render entries list
export function renderEntriesList(entries: Journal): void {
  // get entries container
  const entriesContainer = elements.entriesContainer as HTMLElement;

  // clear  entries container
  entriesContainer.innerHTML = "";

  // show empty state if no entries
  if(entries.length === 0){
    entriesContainer.innerHTML = `
      <div class="empty-state">
        <p>No entries yet. Add your first entry to get started.</p>
      </div>
    `;
    return;
  }

  // render each entry
  entries.forEach((entry: JournalEntry) => {
    EntryPreview(entry);
  });
}

// render single entry card
export function EntryPreview(entry: JournalEntry): void {
  // create entry card
  const entryCard = document.createElement("div");
  entryCard.classList.add("entry-card");
  entryCard.dataset.entryId = entry.id;

  entryCard.innerHTML = `
        <div class="entry-card-header">
            <h3>${entry.title}</h3>
            <p>${entry.mood}</p>
        </div>
        <div class="entry-card-body">
            <p>${entry.content}</p>
        </div>
        <div class="entry-card-footer">
            <p>${formatDate(new Date(entry.timestamp))}</p>
            <div class="entry-card-footer-actions">
            <button class="edit-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
            </button>
              <button class="delete-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
        </div>
    `;

  // append entry card to entries container
  const entriesContainer = elements.entriesContainer as HTMLElement;
  entriesContainer.appendChild(entryCard);
}

// form modal
export function renderEntryForm(entry?: JournalEntry): void {
  // get entry form modal
  const entryFormModal = elements.entryFormModal as HTMLElement;

  // clear entry form modal
  entryFormModal.innerHTML = "";

  // render entry form
  entryFormModal.innerHTML = entry
  ? `<div class="modal-content">
      <div class="modal-header">
          <h2>Edit Entry</h2>
          <button class="close-modal-btn" aria-label="Close">✕</button>
      </div>
      <form id="entry-form">
      <input type="hidden" name="entryId" value="${entry.id}">
      <div class="form-group">    
          <label for="mood">How are you feeling?</label>
          <select name="mood" id="mood">
              <option value="happy" ${entry.mood === 'happy' ? 'selected' : ''}>😊 Happy</option>
              <option value="sad" ${entry.mood === 'sad' ? 'selected' : ''}>😢 Sad</option>
              <option value="angry" ${entry.mood === 'angry' ? 'selected' : ''}>😠 Angry</option>
              <option value="bored" ${entry.mood === 'bored' ? 'selected' : ''}>😑 Bored</option>
              <option value="curious" ${entry.mood === 'curious' ? 'selected' : ''}>🤔 Curious</option>
              <option value="excited" ${entry.mood === 'excited' ? 'selected' : ''}>🤩 Excited</option>
              <option value="frustrated" ${entry.mood === 'frustrated' ? 'selected' : ''}>😤 Frustrated</option>
              <option value="confused" ${entry.mood === 'confused' ? 'selected' : ''}>😕 Confused</option>
          </select>
      </div>
      <div class="form-group">
          <label for="title">Title</label>
          <input type="text" name="title" id="title" placeholder="Give your entry a title..." value="${entry.title}">
      </div>
      <div class="form-group">
          <label for="content">What's on your mind?</label>
          <textarea name="content" id="content" placeholder="Write your thoughts here..." rows="8">${entry.content}</textarea>
      </div>
      <div class="form-actions">
          <button type="button" class="cancel-btn">Cancel</button>
          <button type="submit" class="submit-btn">Save Entry</button>
      </div>
      </form>
  </div>`
  : `<div class="modal-content">
      <div class="modal-header">
          <h2>New Entry</h2>
          <button class="close-modal-btn" aria-label="Close">✕</button>
      </div>
      <form id="entry-form">
      <div class="form-group">
          <label for="mood">How are you feeling?</label>
          <select name="mood" id="mood">
              <option value="happy">😊 Happy</option>
              <option value="sad">😢 Sad</option>
              <option value="angry">😠 Angry</option>
              <option value="bored">😑 Bored</option>
              <option value="curious">🤔 Curious</option>
              <option value="excited">🤩 Excited</option>
              <option value="frustrated">😤 Frustrated</option>
              <option value="confused">😕 Confused</option>
          </select>
      </div>
      <div class="form-group">
          <label for="title">Title</label>
          <input type="text" name="title" id="title" placeholder="Give your entry a title...">
      </div>
      <div class="form-group">
          <label for="content">What's on your mind?</label>
          <textarea name="content" id="content" placeholder="Write your thoughts here..." rows="8"></textarea>
      </div>
      <div class="form-actions">
          <button type="button" class="cancel-btn">Cancel</button>
          <button type="submit" class="submit-btn">Save Entry</button>
      </div>
      </form>
  </div>`;
}

// show or hide form modal
export function showFormModal(): void {
  // get entry form modal
  const entryFormModal = elements.entryFormModal as HTMLElement;

  // show entry form modal
  entryFormModal.classList.remove("hidden");
}

export function hideFormModal(): void {
  // get entry form modal
  const entryFormModal = elements.entryFormModal as HTMLElement;

  // hide entry form modal
  entryFormModal.classList.add("hidden");
}

// handle search
// handle search
export function handleSearch(event: Event): void {
  // Get the input that triggered the search (could be desktop or mobile)
  const searchInput = (event.target as HTMLInputElement).id === 'search-input-mobile'
    ? document.getElementById('search-input-mobile') as HTMLInputElement
    : elements.searchInput as HTMLInputElement;
  const searchValue = searchInput.value.toLowerCase().trim();

  // Get current mood filter value
  const moodFilter = elements.moodFilter as HTMLSelectElement;
  const selectedMood = moodFilter?.value || null;

  // Get entries (filtered by mood if filter is active)
  let entries = journal.getEntries();
  if (selectedMood) {
    entries = journal.filterEntries(selectedMood as Mood);
  }

  // Get or create search results indicator
  const entriesContainer = elements.entriesContainer as HTMLElement;
  let searchResultsIndicator = document.getElementById('search-results-indicator');

  // if no search value, render filtered entries
  if(!searchValue){
    renderEntriesList(entries);
    if (searchResultsIndicator) {
      searchResultsIndicator.remove();
    }
    return;
  }

  // get filtered entries (by search query)
  const filteredEntries = entries.filter((entry: JournalEntry) => {
    const titleMatch = entry.title.toLowerCase().includes(searchValue);
    const contentMatch = entry.content.toLowerCase().includes(searchValue);
    return titleMatch || contentMatch;
  });

  // after filtering, before rendering
  if(filteredEntries.length === 0){
    renderEntriesList([]);
    let entriesContainer = elements.entriesContainer as HTMLElement;
    entriesContainer.innerHTML = `
      <div class="empty-state">
        <p>No results found for "${searchInput.value}".</p>
      </div>
    `;
    return;
  }

  // render filtered entries
  renderEntriesList(filteredEntries);

  // Show search results count
  if (!searchResultsIndicator) {
    searchResultsIndicator = document.createElement('div');
    searchResultsIndicator.id = 'search-results-indicator';
    searchResultsIndicator.classList.add('search-results-indicator');
    entriesContainer.parentNode?.insertBefore(searchResultsIndicator, entriesContainer);
  }
  
  searchResultsIndicator.textContent = `Found ${filteredEntries.length} result${filteredEntries.length !== 1 ? 's' : ''} for "${searchInput.value}"`;
}

// handle mood filter
export function handleMoodFilter(mood: Mood | null): void {
  // get all entries
  const allEntries = journal.getEntries();

  // if no mood selected, show all entries
  if(!mood){
    renderEntriesList(allEntries);
    return;
  }

  // filter entries by mood
  const filteredEntries = journal.filterEntries(mood);
  renderEntriesList(filteredEntries);
}
// show confirmation modal
export function showConfirmationModal(entryId: string): void {
  // create confirmation modal
  const confirmationModal = document.createElement("div");
  confirmationModal.classList.add("confirmation-modal");
  confirmationModal.innerHTML = `
  <div class="confirmation-modal-content">
        <h2>Delete Entry</h2>
        <p>Are you sure you want to delete this entry?</p>
        <button class="confirm-btn">Yes</button>
        <button class="cancel-btn">No</button>
    </div>
    `;
  document.body.appendChild(confirmationModal);

  // add event listener to confirm button
  const confirmBtn = confirmationModal.querySelector(
    ".confirm-btn"
  ) as HTMLButtonElement;
  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      // delete entry
      journal.deleteEntry(entryId);
     // Hide confirmation modal
      hideConfirmationModal();
     // refresh entries list
      renderEntriesList(journal.getEntries());

      // render stats
      renderStats(journal.getEntries());

      // show toast notification
      showToast("Entry deleted successfully");
    });
  }

  // add event listener to cancel button
  const cancelBtn = confirmationModal.querySelector(
    ".cancel-btn"
  ) as HTMLButtonElement;
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      // hide confirmation modal
      hideConfirmationModal();
    });
  }

  function hideConfirmationModal(): void {
    // get confirmation modal
    const confirmationModal = document.querySelector(
      ".confirmation-modal"
    ) as HTMLElement;
    if (confirmationModal && confirmationModal.parentNode) {
      // remove confirmation modal from DOM
      confirmationModal.remove();
    }
  }
}

// show toast notification for messages (e.g. success, error, warning, info)
export function showToast(message: string): void {
  // create toast notification
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.innerHTML = `
        <span>${message}</span>
        <button class="close-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6l-12 12"/><path d="M6 6l12 12"/></svg>
        </button>
    `;
  document.body.appendChild(toast);

  // remove toast notification after 3 seconds
  setTimeout(() => {
    toast.remove();
  }, 3000);

  // add event listener to close button
  const closeBtn = toast.querySelector(".close-btn") as HTMLButtonElement;
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      toast.remove();
    });
  }
}




// === helper functions ===
// Helper function to update theme icons
function updateThemeIcons(): void {
  const sunIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-icon lucide-sun"><path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"/><path d="M12 1v2"/><path d="M12 21v2"/><path d="M4.22 4.22l1.42 1.42"/><path d="M18.36 18.36l1.42 1.42"/><path d="M1 12h2"/><path d="M21 12h2"/><path d="M4.22 19.78l1.42-1.42"/><path d="M18.36 5.64l1.42-1.42"/></svg>';

  const moonIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon-icon lucide-moon"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>';

  // Icon should show what you'll switch TO, not current state
  // If dark mode → show sun (to switch to light)
  // If light mode → show moon (to switch to dark)
  const isDark = document.body.classList.contains("dark");
  const icon = isDark ? sunIcon : moonIcon;

  if(elements.themeToggleBtnDesktop){
    (elements.themeToggleBtnDesktop as HTMLElement).innerHTML = icon;
  }
  if(elements.themeToggleBtnMobile){
    (elements.themeToggleBtnMobile as HTMLElement).innerHTML = icon;
  }
}