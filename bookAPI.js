const BOOK_URL = 'https://www.googleapis.com/books/v1/volumes?q=';
const API_KEY = 'AIzaSyDQ58dHc4Xza5p60pM_CMbzHy0MKYu2y1o';

/* book.volumeInfo.title;
book.volumeInfo.imageLinks.thumbnail; <- IMAGE SRC
book.volumeInfo.description; */

async function fetchAPI(query) {
    try {
        console.log(query);
        const response = await fetch(`${BOOK_URL}${query}`);
        return await response.json();
    } catch (error) {
        console.error('Error while fetching API data: ', error);
    }
}

export async function fetchBooks(input) {
    const query = `intitle:${input}&maxResults=36&key=${API_KEY}`;
    return fetchAPI(query);
}

export async function fetchBooksBySubject(subject) {
    const query = `subject:${subject}&maxResults=36&key=${API_KEY}`;
    return fetchAPI(query);
}