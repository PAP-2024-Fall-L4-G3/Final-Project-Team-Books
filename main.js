import {fetchBooks} from "./books.js";

const searchInput = document.getElementById('search-input');
const bookSection = document.getElementById("books-section");
const searchOnlineBtn = document.getElementById('search-online-btn');


async function searchBooks() {
    bookSection.innerHTML = "";
    const query = searchInput.value.trim();

    if (!query) {
        console.error("Please enter a book title or author to search.");
        return;
    }

    const booksList = await fetchBooks(query);
    
    // Instantiate book
    booksList.items.forEach((book) => {
        console.log(book.volumeInfo);
        const bookContainer = document.createElement("div");
        bookContainer.className = "book-card";

        const bookThumbnail = document.createElement("img");
        bookThumbnail.src = book.volumeInfo.imageLinks?.thumbnail || 'book1.jpg';
        bookThumbnail.alt = book.volumeInfo.title;

        const bookTitle = document.createElement("p");
        bookTitle.textContent = book.volumeInfo.title;

        bookContainer.appendChild(bookThumbnail);
        bookContainer.appendChild(bookTitle);
        bookSection.appendChild(bookContainer);
    });
}


// Event listener for the "Search Online" button
searchOnlineBtn.addEventListener('click', searchBooks);