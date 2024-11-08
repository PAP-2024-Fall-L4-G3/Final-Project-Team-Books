class Book {
    constructor(bookTitle, authors, bookDescription, publishedDate, pages) {
        this.bookTitle = bookTitle;
        this.authors = authors;
        this.description = description;
        this.publishedDate = publishedDate;
        this.pages = pages;
    }

    get title() {
        return this.bookTitle;
    }

    get author() {
        let result = "";
        this.authors.forEach((author) => {
            result += author + "  ";
        })
        return result;
    }

    get description() {
        return this.bookDescription;
    }

    get date() {
        return this.publishedDate;
    }

    get pageCount() {
        return this.pages;
    }
}

