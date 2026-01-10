import * as ui from "./ui.js";
import * as journal from "./journal.js";
import { getEntriesFromLocalStorage, saveEntriesToLocalStorage, } from "./storage.js";
import { elements } from "./ui.js";
import { Mood } from "./journal.js";
import { debounce } from "./utils.js";
// on page load
// 1.load entries from storage
document.addEventListener("DOMContentLoaded", () => {
    const entries = journal.getEntries();
    // 2.render entries list
    ui.renderEntriesList(entries);
    // 3.render stats
    ui.renderStats(entries);
    // 4.set up theme toggle
    ui.initializeThemeToggle();
});
// 3.set up all event listeners
function setupEventListeners() {
    // get add entry button
    const addEntryBtn = elements.addEntryBtn;
    if (addEntryBtn) {
        addEntryBtn.addEventListener("click", () => {
            ui.showFormModal();
            ui.renderEntryForm();
            // ui.showToast('Entry added successfully');
        });
    }
    // get entry form
    const entryFormModal = elements.entryFormModal;
    if (entryFormModal) {
        entryFormModal.addEventListener("submit", (event) => {
            event.preventDefault();
            // the event.target is the form element
            const target = event.target;
            const form = event.target instanceof HTMLFormElement
                ? event.target
                : event.target.closest("form");
            if (form.tagName === "FORM") {
                const formData = new FormData(form);
                // check if we're editing
                const entryIdInput = form.querySelector('[name="entryId"]');
                const isEdit = entryIdInput && entryIdInput.value;
                if (isEdit) {
                    // update existing entry
                    const entryId = entryIdInput.value;
                    const updatedEntry = {
                        title: formData.get("title"),
                        content: formData.get("content"),
                        mood: formData.get("mood"),
                    };
                    journal.updateEntry(entryId, updatedEntry);
                    ui.renderStats(journal.getEntries());
                    ui.showToast("Entry updated successfully");
                }
                else {
                    // create new entry
                    const entry = {
                        id: crypto.randomUUID(),
                        title: formData.get("title"),
                        content: formData.get("content"),
                        mood: formData.get("mood"),
                        timestamp: Date.now(),
                    };
                    journal.addEntry(entry);
                    ui.renderStats(journal.getEntries());
                    ui.showToast("Entry added successfully");
                }
                ui.renderEntriesList(journal.getEntries());
                ui.hideFormModal();
            }
            // Close button
            if (target.classList.contains('close-modal-btn') || target.closest('.close-modal-btn')) {
                ui.hideFormModal();
            }
            // Cancel button
            if (target.classList.contains('cancel-btn') || target.closest('.cancel-btn')) {
                ui.hideFormModal();
            }
        });
    }
    // when edit button is clicked:
    // 1.show modal with existing entry data
    const entriesContainer = elements.entriesContainer;
    if (entriesContainer) {
        // handle click on edit/delete buttons
        entriesContainer.addEventListener("click", (event) => {
            const target = event.target;
            // check if edit button was clicked
            if (target.classList.contains("edit-btn")) {
                // find the entry card that contains this button
                const entryCard = target.closest(".entry-card");
                if (entryCard) {
                    // get the entry id from data attribute
                    const entryId = entryCard.dataset.entryId;
                    if (entryId) {
                        // find the entry
                        const entries = journal.getEntries();
                        const entry = entries.find((e) => e.id === entryId);
                        if (entry) {
                            ui.showFormModal();
                            ui.renderEntryForm(entry);
                            // ui.showToast('Entry updated successfully');
                        }
                    }
                }
            }
            // check if delete button was clicked
            if (target.classList.contains("delete-btn") ||
                target.closest(".delete-btn")) {
                const deleteBtn = target.classList.contains("delete-btn")
                    ? target
                    : target.closest(".delete-btn");
                const entryCard = deleteBtn.closest(".entry-card");
                if (entryCard) {
                    const entryId = entryCard.dataset.entryId;
                    if (entryId) {
                        console.log("Delete clicked for entry:", entryId);
                        // show confirmation modal
                        ui.showConfirmationModal(entryId);
                    }
                }
            }
        });
    }
    // handle search input
    const searchInput = elements.searchInput;
    if (searchInput) {
        const debouncedSearch = debounce((event) => {
            ui.handleSearch(event);
        }, 500);
        searchInput.addEventListener("input", debouncedSearch);
    }
    // Handle mobile search toggle button
    const searchToggleBtn = document.getElementById("search-toggle-btn");
    if (searchToggleBtn) {
        searchToggleBtn.addEventListener("click", () => {
            const mobileSearchContainer = document.getElementById("mobile-search-container");
            if (mobileSearchContainer) {
                // Toggle the hidden class
                mobileSearchContainer.classList.toggle("hidden");
                // Focus input when shown
                if (!mobileSearchContainer.classList.contains("hidden")) {
                    const mobileSearchInput = document.getElementById("search-input-mobile");
                    if (mobileSearchInput) {
                        // Small delay to ensure animation completes before focusing
                        setTimeout(() => mobileSearchInput.focus(), 350);
                    }
                }
            }
        });
    }
    // Handle mobile search input
    const searchInputMobile = document.getElementById("search-input-mobile");
    if (searchInputMobile) {
        const debouncedMobileSearch = debounce((event) => {
            ui.handleSearch(event);
        }, 500);
        searchInputMobile.addEventListener("input", debouncedMobileSearch);
    }
    const closeSearchBtn = document.getElementById("close-search-btn");
    if (closeSearchBtn) {
        closeSearchBtn.addEventListener("click", () => {
            const mobileSearchContainer = document.getElementById("mobile-search-container");
            if (mobileSearchContainer) {
                mobileSearchContainer.classList.add("hidden");
            }
        });
    }
    // Handle mobile search input (your existing code continues here...)
    // handle mood filter
    const moodFilter = elements.moodFilter;
    if (moodFilter) {
        moodFilter.addEventListener("change", (event) => {
            const select = event.target;
            const selectedMood = select.value;
            // clear search when filtering
            // const searchInput = elements.searchInput as HTMLInputElement;
            // if(searchInput){
            //     searchInput.value = '';
            // }
            // remove search results indicator if it exists
            const searchResultsIndicator = document.getElementById("search-results-indicator");
            if (searchResultsIndicator) {
                searchResultsIndicator.remove();
            }
            // handle mood filter
            if (selectedMood) {
                ui.handleMoodFilter(selectedMood);
            }
            else {
                ui.handleMoodFilter(null);
            }
            // update stats filtered by mood
            const entries = selectedMood
                ? journal.filterEntries(selectedMood)
                : journal.getEntries();
            ui.renderStats(entries);
        });
    }
}
function initializeApp() {
    setupEventListeners();
}
initializeApp();
//# sourceMappingURL=index.js.map