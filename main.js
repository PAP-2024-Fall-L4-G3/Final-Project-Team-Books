import {fetchBooks, fetchBooksBySubject} from "./bookAPI.js";
import {Book, showFavorites} from "./book.js";

const category = document.getElementById("category");
const searchInput = document.getElementById('search-input');
const bookSection = document.getElementById("books-section");
const searchOnlineBtn = document.getElementById('search-online-btn');
const closeOverlayBtn = document.getElementById("close-overlay");
let inFavorites = true;

function clearBookSection() {
    bookSection.innerHTML = "";
}

async function searchBooks(searchBySubject, subject) {
    inFavorites = false;

    let booksList;
    if (searchBySubject === true) {
        booksList = await fetchBooksBySubject(subject);
    } else {
        const query = searchInput.value.trim();
        if (!query) {
            console.error("Please enter a book title or author to search.");
            return;
        }
        booksList = await fetchBooks(query);
    }

    console.log(booksList);
    clearBookSection();

    // Instantiate book
    booksList.items.forEach((book) => {
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
    });
}


// Event listener for the "Search Online" button
searchOnlineBtn.addEventListener('click', () => {
    searchBooks(false);
});
closeOverlayBtn.addEventListener("click", () => {
    document.getElementById("overlay").style.display = "none";
    if (inFavorites) {
        clearBookSection();
        showFavorites();
    }
})

Array.from(category.children).forEach((button) => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        searchBooks(true, button.dataset.category);
    })
})


showFavorites();