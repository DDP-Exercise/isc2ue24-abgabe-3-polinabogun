"use strict";

/**
 * Selects a random full image at the start and displays it.
 */
function showRandomImageAtStart() {
    const links = document.querySelectorAll('#thumbnails a');
    const randomIndex = getRandomInt(0, links.length);
    const randomLink = links[randomIndex];
    const imageUrl = randomLink.href;
    const imageDescription = randomLink.querySelector('img').alt;
    switchFullImage(imageUrl, imageDescription);

    // Highlight the current card
    const cardBody = randomLink.closest('.card').querySelector('.card-body');
    cardBody.parentElement.classList.add('bg-dark', 'text-white');
}

/**
 * Prepare the links on the full images so that they execute the following tasks:
 * - Switch the full image to the one that has been clicked on.
 * - Set the highlight under the current thumbnail.
 * - Load the notes for the current image.
 */
function prepareLinks() {
    const links = document.querySelectorAll('#thumbnails a');
    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();


            document.querySelectorAll('.card-body').forEach(cardBody => {
                cardBody.classList.remove('bg-dark', 'text-white');
            });

            const cardBody = this.closest('.card').querySelector('.card-body');
            cardBody.classList.add('bg-dark', 'text-white');

            const imageUrl = this.href;
            const imageDescription = this.querySelector('img').alt;
            switchFullImage(imageUrl, imageDescription);

            loadNotes(imageUrl);
        });
    });
}

/**
 * Stores or deletes the updated notes of an image after they have been changed.
 */
function storeNotes() {
    const notesField = document.getElementById('notes');
    notesField.addEventListener('blur', function () {
        const currentImageUrl = document.querySelector('figure img').src;
        const notes = this.innerText.trim();

        if (notes) {
            localStorage.setItem(currentImageUrl, notes);
        } else {
            localStorage.removeItem(currentImageUrl);
        }
    });
}

/**
 * Switches the full image in the <figure> element to the one specified in the parameter. Also updates the image's alt
 * attribute and the figure's caption.
 * @param {string} imageUrl The URL to the new image (the image's src attribute value).
 * @param {string} imageDescription The image's description (used for the alt attribute and the figure's caption).
 */
function switchFullImage(imageUrl, imageDescription) {
    const fullImage = document.querySelector('figure img');
    fullImage.src = imageUrl;
    fullImage.alt = imageDescription;

    const figcaption = document.querySelector('figure figcaption');
    figcaption.textContent = imageDescription;
}

/**
 * Loads the notes from local storage for a given key and sets the contents in the notes field with the ID notes.
 * @param {string} key The key in local storage where the entry is found.
 */
function loadNotes(key) {
    const notesField = document.getElementById('notes');
    const notes = localStorage.getItem(key);
    if (notes) {
        notesField.innerText = notes;
    } else {
        notesField.innerText = "Enter your notes here!";
    }
}

/**
 * Returns a random integer value between min (included) and max (excluded).
 * @param {number} min The minimum value (included).
 * @param {number} max The maximum value (excluded).
 * @returns {number} A random integer value between min (included) and max (excluded).
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Gets the whole thing started.
 */
showRandomImageAtStart();
prepareLinks();
storeNotes();
