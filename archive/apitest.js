
const bookURL = 'https://www.googleapis.com/books/v1/volumes?q=';
//google API key
const apiKey = 'AIzaSyDQ58dHc4Xza5p60pM_CMbzHy0MKYu2y1o';
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myform');
    const resultDiv = document.getElementById('result');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const searchInput = document.getElementById('books').value;
        const url = `${bookURL}intitle:${searchInput}&key=${apiKey}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            resultDiv.textContent = JSON.stringify(data, null, 2);
            const form = document.getElementById('myform');
            const bookList = document.getElementById('book-list');
            data.items.forEach(book => {
                //adding title
                const bookContainer = document.createElement('div');
                const title = document.createElement('h2');
                title.textContent = book.volumeInfo.title;
                bookContainer.appendChild(title);
                //adding image to the book
                const image = document.createElement('img');
                image.src = book.volumeInfo.imageLinks.thumbnail;
                bookContainer.appendChild(image);
                //adding description
                const description = document.createElement('p');
                const descText = book.volumeInfo.description;
                const lines = descText.split('\n').slice(0, 2);
                description.textContent = lines.join('\n');
                bookContainer.appendChild(description);
            bookList.appendChild(bookContainer);
        });
        document.body.appendChild(bookList);
        } catch (error) {
            console.error('Error while fetching data:', error);
            resultDiv.textContent = "An error occurred while fetching data.";
        }
    });
});
