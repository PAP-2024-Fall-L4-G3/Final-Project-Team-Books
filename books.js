const BOOK_URL = 'https://www.googleapis.com/books/v1/volumes?q=';
const API_KEY = 'AIzaSyDQ58dHc4Xza5p60pM_CMbzHy0MKYu2y1o';

/* book.volumeInfo.title;
book.volumeInfo.imageLinks.thumbnail; <- IMAGE SRC
book.volumeInfo.description; */

export async function fetchBooks(input) {
    const url = `${BOOK_URL}intitle:${input}&key=${API_KEY}`;
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Error while fetching API data: ', error);
    }
}