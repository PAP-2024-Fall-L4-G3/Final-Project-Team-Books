import {fetchBooks} from "./bookAPI.js";

const bookSection = document.getElementById("books-section");
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlay-title");
const overlayAuthors = document.getElementById("overlay-authors");
const overlayDescription = document.getElementById("overlay-description");
const overlayPages = document.getElementById("overlay-pages");
const overlayThumbnail = document.getElementById("overlay-thumbnail");
const overlayDate = document.getElementById("overlay-date");
const favoriteButton = document.getElementById("favorite-button");

let favorited = false;
let currentId;

function displayBook(book) {
    console.log(book);

    // Configure overlay
    currentId = book.id;
    overlayTitle.textContent = book.title;
    overlayAuthors.textContent = book.authors ? book.authors.join(", ") : "Unknown Author";
    overlayDescription.textContent = book.description;
    overlayPages.textContent = book.pageCount;
    overlayDate.textContent = book.publishedDate;

    overlayThumbnail.src = book.thumbnail;
    overlayThumbnail.alt = book.title;

    // Get local storage favorites list
    favorited = false;
    favoriteButton.textContent = "Click to favorite";
    let keys = Object.keys(localStorage);
    for (let key of keys) {
        if (key === book.id) {
            favorited = true;
            favoriteButton.textContent = "Click to unfavorite";
        }
    }

    // Show overlay
    overlay.style.display = "block";
}

export class Book {
    constructor(title, authors, description, publishedDate, pageCount, thumbnail, id) {
        this.title = title;
        this.authors = authors || []; // Default to an empty array if undefined
        this.description = description;
        this.publishedDate = publishedDate;
        this.pageCount = pageCount;
        this.thumbnail = thumbnail || "book1.jpg";
        this.id = id;
    }

    showBookInDOM() {
        const bookContainer = document.createElement("button");
        bookContainer.className = "book-card";

        const bookThumbnail = document.createElement("img");
        bookThumbnail.src = this.thumbnail;
        bookThumbnail.alt = this.title;

        const bookTitle = document.createElement("p");
        bookTitle.textContent = this.title;

        bookContainer.appendChild(bookThumbnail);
        bookContainer.appendChild(bookTitle);
        bookSection.appendChild(bookContainer);
        bookContainer.addEventListener("click", () => {
            displayBook(this);
        });
    }
}

export async function showFavorites() {
    let keys = Object.keys(localStorage);
    let total = keys.length;
    if (total > 0) {
        for (let key of keys) {
            const booksList = await fetchBooks(key);
            booksList.items.forEach((book) => {
                if (book.id === key) {
                    let bookObject = new Book(
                        book.volumeInfo.title,
                        book.volumeInfo.authors,
                        book.volumeInfo.description,
                        book.volumeInfo.publishedDate,
                        book.volumeInfo.pageCount,
                        book.volumeInfo.imageLinks?.thumbnail,
                        book.id
                    );
                    bookObject.showBookInDOM();
                }
            });
        }
    }
}

favoriteButton.addEventListener("click", () => {
    if (favorited === true) {
        favorited = false;
        localStorage.removeItem(currentId);
        favoriteButton.textContent = "Click to favorite";
    } else {
        favorited = true;
        localStorage.setItem(currentId, "true"); // "true" is never used
        favoriteButton.textContent = "Click to unfavorite";
    }
})