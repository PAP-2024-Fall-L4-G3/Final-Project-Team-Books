
const searchInput = document.getElementById('search-input');
const searchOnlineBtn = document.getElementById('search-online-btn');


function searchForPDFOrSummary() {
    const query = searchInput.value.trim();
    if (query) {
     
        const googlePDFSearchURL = `https://www.google.com/search?q=${encodeURIComponent(query)}+filetype:pdf+OR+summary+OR+preview`;

       
        const googleBooksSearchURL = `https://www.google.com/search?q=${encodeURIComponent(query)}+site:books.google.com`;

        
        window.open(googlePDFSearchURL, '_blank');
    } else {
        alert("Please enter a book title or author to search.");
    }
}

// Event listener for the "Search Online" button
searchOnlineBtn.addEventListener('click', searchForPDFOrSummary);
