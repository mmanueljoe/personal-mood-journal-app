import * as ui from './ui.js';
import * as journal from './journal.js';
import { getEntriesFromLocalStorage, saveEntriesToLocalStorage } from './storage.js';
import { elements } from './ui.js';
import { Mood } from './journal.js';
import { debounce } from './utils.js';



// on page load
// 1.load entries from storage
document.addEventListener('DOMContentLoaded', () => {
    const entries = journal.getEntries();

    // 2.render entries list
    ui.renderEntriesList(entries);

    // 3.render stats
    ui.renderStats(entries);
});

// 3.set up all event listeners
function setupEventListeners(): void {
    // get add entry button
    const addEntryBtn = elements.addEntryBtn as HTMLButtonElement;
    if(addEntryBtn) {
        addEntryBtn.addEventListener('click', () => {
            ui.showFormModal();
            ui.renderEntryForm();
            // ui.showToast('Entry added successfully');
        });
    }

    // get entry form
    const entryFormModal = elements.entryFormModal as HTMLElement;
    if(entryFormModal) {
        entryFormModal.addEventListener('submit', (event: Event) => {
            event.preventDefault();

            // the event.target is the form element

            const form = event.target instanceof HTMLFormElement
            ? event.target : (event.target as HTMLElement).closest('form') as HTMLFormElement;

            if(form.tagName === 'FORM') {
                const formData = new FormData(form);

                // check if we're editing
                const entryIdInput = form.querySelector('[name="entryId"]') as HTMLInputElement;
                const isEdit = entryIdInput && entryIdInput.value;

                if(isEdit) {
                    // update existing entry
                    const entryId = entryIdInput.value;
                    const updatedEntry = {
                        title: formData.get('title') as string,
                        content: formData.get('content') as string,
                        mood: formData.get('mood') as Mood,
                    };
                    journal.updateEntry(entryId, updatedEntry);
                    ui.renderStats(journal.getEntries());
                    ui.showToast('Entry updated successfully');
                } else {
                    // create new entry
                    const entry = {
                        id: crypto.randomUUID(),
                        title: formData.get('title') as string,
                        content: formData.get('content') as string,
                        mood: formData.get('mood') as Mood,
                        timestamp: Date.now(),
                    };
                    journal.addEntry(entry);
                    ui.renderStats(journal.getEntries());
                    ui.showToast('Entry added successfully');
                }
                ui.renderEntriesList(journal.getEntries());
                ui.hideFormModal();
            }
        });
    }

    // when edit button is clicked:
    // 1.show modal with existing entry data
    const entriesContainer = elements.entriesContainer as HTMLElement;
    if(entriesContainer){
        // handle click on edit/delete buttons
        entriesContainer.addEventListener('click', (event: Event) => {
            const target = event.target as HTMLElement;

            // check if edit button was clicked
            if(target.classList.contains('edit-btn')) {
                // find the entry card that contains this button

                const entryCard = target.closest('.entry-card') as HTMLElement;
                if(entryCard) {
                    // get the entry id from data attribute
                    const entryId = entryCard.dataset.entryId as string;
                    if(entryId) {
                        // find the entry
                        const entries = journal.getEntries();
                        const entry = entries.find((e) => e.id === entryId);
                        if(entry){
                            ui.showFormModal();
                            ui.renderEntryForm(entry);
                            // ui.showToast('Entry updated successfully');
                        }
                    }
                }
            }

            // check if delete button was clicked
            if(target.classList.contains('delete-btn') || target.closest('.delete-btn')) {
                const deleteBtn = target.classList.contains('delete-btn')
                ? target
                : target.closest('.delete-btn') as HTMLElement;

                const entryCard = deleteBtn.closest('.entry-card') as HTMLElement;
                if(entryCard){
                    const entryId = entryCard.dataset.entryId as string;
                    if(entryId) {
                        console.log('Delete clicked for entry:', entryId);


                        // show confirmation modal
                        ui.showConfirmationModal(entryId);

                    }
                }
            }
        });
    }

    // handle search input
    const searchInput = elements.searchInput as HTMLInputElement;
    if(searchInput) {
        const debouncedSearch = debounce((event: Event) =>{
            ui.handleSearch(event);
        }, 500);
        searchInput.addEventListener('input', debouncedSearch as EventListener);
    }

    // handle mood filter
    const moodFilter = elements.moodFilter as HTMLSelectElement;
    if(moodFilter) {
        moodFilter.addEventListener('change', (event: Event) => {
            const select = event.target as HTMLSelectElement;
            const selectedMood = select.value;

            // clear search when filtering
            // const searchInput = elements.searchInput as HTMLInputElement;
            // if(searchInput){
            //     searchInput.value = '';
            // }

            // remove search results indicator if it exists
            const searchResultsIndicator = document.getElementById('search-results-indicator');
            if(searchResultsIndicator){
                searchResultsIndicator.remove();
            }

            // handle mood filter
            if(selectedMood){
                ui.handleMoodFilter(selectedMood as Mood);
            } else {
                ui.handleMoodFilter(null);
            }

            // update stats filtered by mood
            const entries = selectedMood 
            ? journal.filterEntries(selectedMood as Mood)
            : journal.getEntries();
            ui.renderStats(entries);
        });
    }
}



function initializeApp(): void {
    setupEventListeners();
}

initializeApp();