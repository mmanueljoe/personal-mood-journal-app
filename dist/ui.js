import { getElementsByType, debounce, formatDate } from "./utils.js";
import * as journal from "./journal.js";
// elements
export const elements = {
    themeToggleBtn: getElementsByType("id", "theme-toggle-btn"),
    entriesContainer: getElementsByType("id", "entries-container"),
    stats: getElementsByType("id", "stats"),
    addEntryBtn: getElementsByType("id", "add-entry-btn"),
    entryFormModal: getElementsByType("id", "entry-form-modal"),
    editBtn: getElementsByType("class", "edit-btn"),
    deleteBtn: getElementsByType("class", "delete-btn"),
};
// theme toggle button
export function toggleTheme() {
    // toggle the theme
    document.body.classList.toggle("dark");
    // save the theme to localStorage
    // localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    // update the theme toggle button icon
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    if (themeToggleBtn) {
        themeToggleBtn.innerHTML = document.body.classList.contains("dark")
            ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon-icon lucide-moon"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>'
            : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-icon lucide-sun"><path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"/><path d="M12 1v2"/><path d="M12 21v2"/><path d="M4.22 4.22l1.42 1.42"/><path d="M18.36 18.36l1.42 1.42"/><path d="M1 12h2"/><path d="M21 12h2"/><path d="M4.22 19.78l1.42-1.42"/><path d="M18.36 5.64l1.42-1.42"/></svg>';
    }
}
// add event listener to the theme toggle button
export const themeToggleBtn = document.getElementById("theme-toggle-btn");
if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
}
// render stats
function renderStats(stats) { }
// render entries list
export function renderEntriesList(entries) {
    // get entries container
    const entriesContainer = elements.entriesContainer;
    // clear  entries container
    entriesContainer.innerHTML = "";
    // render each entry
    entries.forEach((entry) => {
        EntryPreview(entry);
    });
}
// render single entry card
export function EntryPreview(entry) {
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
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;
    // append entry card to entries container
    const entriesContainer = elements.entriesContainer;
    entriesContainer.appendChild(entryCard);
}
// form modal
export function renderEntryForm(entry) {
    // get entry form modal
    const entryFormModal = elements.entryFormModal;
    // clear entry form modal
    entryFormModal.innerHTML = "";
    // render entry form
    entryFormModal.innerHTML = entry
        ? `
        <h2>Edit Entry</h2>
        <form id="entry-form">
        <input type="hidden" name="entryId" value="${entry.id}">
        <div class="form-group">    
            <select name="mood" id="mood">
                <option value="happy">Happy</option>
                <option value="sad">Sad</option>
                <option value="angry">Angry</option>
                <option value="bored">Bored</option>
                <option value="curious">Curious</option>
                <option value="excited">Excited</option>
                <option value="frustrated">Frustrated</option>
                <option value="confused">Confused</option>
            </select>
        </div>
        <div class="form-group">
            <input type="text" name="title" placeholder="Title" value="${entry.title}">
        </div>
        <div class="form-group">
            <textarea name="content" placeholder="Content">
            ${entry.content}
            </textarea>
        </div>
        <div class="form-group">
            <button type="submit">Save</button>
        </div>
        </form>
    `
        : `
        <h2>Add Entry</h2>
        <form id="entry-form">
        <div class="form-group">
            <select name="mood" id="mood">
                <option value="happy">Happy</option>
                <option value="sad">Sad</option>
                <option value="angry">Angry</option>
                <option value="bored">Bored</option>
                <option value="curious">Curious</option>
                <option value="excited">Excited</option>
                <option value="frustrated">Frustrated</option>
                <option value="confused">Confused</option>
            </select>
        </div>
        <div class="form-group">
            <input type="text" name="title" placeholder="Title">
        </div>
        <div class="form-group">
            <textarea name="content" placeholder="Content"></textarea>
        </div>
        <div class="form-group">
            <button type="submit">Save</button>
        </form>
    `;
}
// show or hide form modal
export function showFormModal() {
    // get entry form modal
    const entryFormModal = elements.entryFormModal;
    // show entry form modal
    entryFormModal.classList.remove("hidden");
}
export function hideFormModal() {
    // get entry form modal
    const entryFormModal = elements.entryFormModal;
    // hide entry form modal
    entryFormModal.classList.add("hidden");
}
// handle search
export function handleSearch(event) { }
// show confirmation modal
export function showConfirmationModal(entryId) {
    // create confirmation modal
    const confirmationModal = document.createElement("div");
    confirmationModal.classList.add("confirmation-modal");
    confirmationModal.innerHTML = `
        <h2>Delete Entry</h2>
        <p>Are you sure you want to delete this entry?</p>
        <button class="confirm-btn">Yes</button>
        <button class="cancel-btn">No</button>
    `;
    document.body.appendChild(confirmationModal);
    // add event listener to confirm button
    const confirmBtn = confirmationModal.querySelector(".confirm-btn");
    if (confirmBtn) {
        confirmBtn.addEventListener("click", () => {
            // delete entry
            journal.deleteEntry(entryId);
            // Hide confirmation modal
            hideConfirmationModal();
            // refresh entries list
            renderEntriesList(journal.getEntries());
            // show toast notification
            showToast("Entry deleted successfully");
        });
    }
    // add event listener to cancel button
    const cancelBtn = confirmationModal.querySelector(".cancel-btn");
    if (cancelBtn) {
        cancelBtn.addEventListener("click", () => {
            // hide confirmation modal
            hideConfirmationModal();
        });
    }
    function hideConfirmationModal() {
        // get confirmation modal
        const confirmationModal = document.querySelector(".confirmation-modal");
        if (confirmationModal && confirmationModal.parentNode) {
            // remove confirmation modal from DOM
            confirmationModal.remove();
        }
    }
}
// show toast notification for messages (e.g. success, error, warning, info)
export function showToast(message) {
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
    const closeBtn = toast.querySelector(".close-btn");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            toast.remove();
        });
    }
}
//# sourceMappingURL=ui.js.map