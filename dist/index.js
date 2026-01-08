import * as ui from './ui.js';
import * as journal from './journal.js';
import { getEntriesFromLocalStorage, saveEntriesToLocalStorage } from './storage.js';
import { elements } from './ui.js';
import { Mood } from './journal.js';
// on page load
// 1.load entries from storage
document.addEventListener('DOMContentLoaded', () => {
    const entries = journal.getEntries();
    // 2.render entries list
    ui.renderEntriesList(entries);
});
// 3.set up all event listeners
function setupEventListeners() {
    // get add entry button
    const addEntryBtn = elements.addEntryBtn;
    if (addEntryBtn) {
        addEntryBtn.addEventListener('click', () => {
            ui.showFormModal();
            ui.renderEntryForm();
            ui.showToast('Entry added successfully');
        });
    }
    // get entry form
    const entryFormModal = elements.entryFormModal;
    if (entryFormModal) {
        entryFormModal.addEventListener('submit', (event) => {
            event.preventDefault();
            // the event.target is the form element
            const form = event.target instanceof HTMLFormElement
                ? event.target : event.target.closest('form');
            if (form.tagName === 'FORM') {
                const formData = new FormData(form);
                // check if we're editing
                const entryIdInput = form.querySelector('[name="entryId"]');
                const isEdit = entryIdInput && entryIdInput.value;
                if (isEdit) {
                    // update existing entry
                    const entryId = entryIdInput.value;
                    const updatedEntry = {
                        title: formData.get('title'),
                        content: formData.get('content'),
                        mood: formData.get('mood'),
                    };
                    journal.updateEntry(entryId, updatedEntry);
                    ui.showToast('Entry updated successfully');
                }
                else {
                    // create new entry
                    const entry = {
                        id: crypto.randomUUID(),
                        title: formData.get('title'),
                        content: formData.get('content'),
                        mood: formData.get('mood'),
                        timestamp: Date.now(),
                    };
                    journal.addEntry(entry);
                    ui.showToast('Entry added successfully');
                }
                ui.renderEntriesList(journal.getEntries());
                ui.hideFormModal();
            }
        });
    }
    // when edit button is clicked:
    // 1.show modal with existing entry data
    const entriesContainer = elements.entriesContainer;
    if (entriesContainer) {
        // handle click on edit/delete buttons
        entriesContainer.addEventListener('click', (event) => {
            const target = event.target;
            // check if edit button was clicked
            if (target.classList.contains('edit-btn')) {
                // find the entry card that contains this button
                const entryCard = target.closest('.entry-card');
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
                            ui.showToast('Entry updated successfully');
                        }
                    }
                }
            }
            // check if delete button was clicked
            if (target.classList.contains('delete-btn')) {
                const entryCard = target.closest('.entry-card');
                if (entryCard) {
                    const entryId = entryCard.dataset.entryId;
                    if (entryId) {
                        // show confirmation modal
                        ui.showConfirmationModal(entryId);
                    }
                }
            }
        });
    }
}
// when delete button is clicked:
// 1.call deleteEntry()
function initializeApp() {
    setupEventListeners();
}
initializeApp();
//# sourceMappingURL=index.js.map