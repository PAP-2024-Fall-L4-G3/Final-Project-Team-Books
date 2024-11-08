const bookSection = document.getElementById("books-section");
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlay-title");
const overlayAuthors = document.getElementById("overlay-authors");
const overlayDescription = document.getElementById("overlay-description");
const overlayPages = document.getElementById("overlay-pages");
const overlayThumbnail = document.getElementById("overlay-thumbnail");
const overlayDate = document.getElementById("overlay-date");

function displayBook(book) {
    console.log(book);

    // Unhide overlay
    overlay.style.display = "block";
    overlayTitle.textContent = book.title;
    overlayAuthors.textContent = book.authors ? book.authors.join(", ") : "Unknown Author";
    overlayDescription.textContent = book.description;
    overlayPages.textContent = book.pageCount;
    overlayDate.textContent = book.publishedDate;

    overlayThumbnail.src = book.thumbnail;
    overlayThumbnail.alt = book.title;
}

class Book {
    constructor(title, authors, description, publishedDate, pageCount, thumbnail) {
        this.title = title;
        this.authors = authors || []; // Default to an empty array if undefined
        this.description = description;
        this.publishedDate = publishedDate;
        this.pageCount = pageCount;
        this.thumbnail = thumbnail || "book1.jpg";
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

export default Book;