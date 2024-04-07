// Starter books object containing a variety of example books.
const books = [
    { id: 1, title: 'Brave New World', author: 'Aldous Huxley', genre: 'Science Fiction', year: 1932, stock: 5 },
    { id: 2, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', year: 1925, stock: 8 },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', year: 1960, stock: 2 },
    { id: 4, title: '1984', author: 'George Orwell', genre: 'Dystopian', year: 1949, stock: 6 },
    { id: 5, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', genre: 'Fantasy', year: 1954, stock: 3 }
  ];

const genre = ["Fantasy", "Fiction", "Science-Fiction", "Dystopian"]

// Below this level, and a book will appear in the low stock warning list
const lowStockWarningValue = 4;

// Function to add a New Item to the Book Object
const newBookForm = document.getElementById("new-book-form");
newBookForm.addEventListener("submit", addNewBook)

function addNewBook(event){
    event.preventDefault();
    // Modal container
    const modal = document.getElementById("modal");


    // Form Values
    const form = event.target;
    const title = form.bookTitle.value;
    const author = form.bookAuthor.value;
    const genre = form.bookGenre.value;
    const year = form.bookYear.value;
    const stock = parseInt(form.bookStock.value);
    
    if (form){
        // If books array is empty set nextBookID to 0 or else use previous item to set new book id
        let nextbookID=0;
        if(books.length===0){
            nextbookID=1;
        } else{
            nextBookID = books[books.length-1].id+1;
        }
        // Create new book item
        const newItem = { 
            id: nextbookID, 
            title: title, 
            author: author, 
            genre: genre, 
            year: year, 
            stock: stock 
        }
        books.push(newItem);
    }
    // Display the book list
    displayBooksList(books);
    // Empty the add new book form data so it's ready for the next book to be entered
    emptyFormData(form);
    // Count the total stock by genre
    genreStockCount(books)
}

// Function to Filter the displayed booklist by Author
const searchFeature = document.getElementById("searchText");
searchFeature.addEventListener("input", ()=> searchFunction(books))


function searchFunction(books){
    //Reset the filter by genre dropdown back to All.
    const genreSelect = document.getElementById("genreSelect");
    genreSelect.value = "All";

    // Use the filter method to search through both the author and title fields
    const searchValue= document.getElementById("searchText").value.toUpperCase();
    const filteredBooks = books.filter((book) => {
        return book.author.toUpperCase().includes(searchValue) || book.title.toUpperCase().includes(searchValue);
    });

    // If the user has entered a value in the search field, show the output, if not, display the full book object. 
    if(searchValue){
        displayBooksList(filteredBooks);
    } else{
        displayBooksList(books);
    }
}

// Function to Filter the displayed booklist by Genre
const genreFilter = document.getElementById("genreSelect");
genreFilter.addEventListener("change", () => filterByGenre(books))

function filterByGenre(books){
    //Reset the search input box to empty.
    const searchText = document.getElementById("searchText");
    searchText.value = "";

    // Filter books by genre
    const filterGenre = document.getElementById("genreSelect").value;
    if(filterGenre==="All"){
        displayBooksList(books);
    } else{
        const filteredBooks = books.filter((book) => book.genre===filterGenre);
        displayBooksList(filteredBooks);
    }  
}

// Function to Delete a book item from the book list
document.addEventListener("DOMContentLoaded", function() {
    document.body.addEventListener("click", function(e) {
        if(e.target.classList.contains("delete-book-btn")) {
            deleteBookFunc(e);
        }
    });
});

function deleteBookFunc(e){
    // Saving values of the filter options so a filtered book list can be displayed if appropriate
    const searchText = document.getElementById("searchText").value;
    const genreSelect = document.getElementById("genreSelect").value;

    // Get the value of the bookId you are removing
    const bookId = Number(e.target.value);
    // Get the index value of that bookID
    const bookIndex = books.findIndex(book => book.id === bookId);
    const currentBookStock = books[bookIndex].stock;
    // Remove 1 from the stock value of that object item
    if (bookIndex !== -1) { 
        if(currentBookStock>1){
            books[bookIndex].stock-=1;
            if(books[bookIndex].stock<lowStockWarningValue){
                displayLowStockWarnings(books);
            }
        } else{
            books.splice(bookIndex, 1); 
            displayLowStockWarnings(books);
        }
    } else {
        console.log("Book not found");
    }

    // Display the genre stock count table 
    genreStockCount(books);

    // Display the different book list depending on whether the filters have values in them.
    if(searchText){
        searchFunction(books);
    } else if(genreSelect){
        filterByGenre(books);
    } else{
        displayBooksList(books);
    }   

    if (books.length===0){
        console.log("Empty");
        console.log(books);
    }
    
}

// Function to calculate stock by genre
function genreStockCount(books){
    const filterBookText = document.getElementById("filtered-books") 
    const stockByGenre = books.reduce((acc, {genre, stock})=>{
        if(!acc[genre]){
            acc[genre]=0;
        }
        acc[genre]+=stock;
        return acc;
    }, {});
    displayGenreStockCount(stockByGenre, filterBookText);
};

function displayGenreStockCount(stockByGenre, filterBookText){
    let displayText = `<table class="table table-striped">
    <thead>
    <tr>
        <th>Genre</th>
        <th>Stock</th>
    </tr>
    </thead>
    <tbody>
    `;
    for (const genre in stockByGenre) {
        if (stockByGenre.hasOwnProperty(genre)) {
            displayText += `<tr><td>${genre}:</td><td>${stockByGenre[genre]}</td></tr>`;
        }
    }
    const totalStocks = calculateTotalStock(books);
    displayText += `<tr><td><strong>Total</strong></td><td><strong>${totalStocks}</strong></td></tr></tbody></table>`
    filterBookText.innerHTML = displayText;
}

// Function to calculate the total stock
function calculateTotalStock(books){
    displayBooksList(books);
    const filterBtn = document.getElementById("genreSelect");
    filterBtn.value = "All";
    let total = books.reduce((acc, curr)=>{
        return acc + curr.stock;
    }, 0)
    return total;
}

// Function to display LowStock Warnings list
function displayLowStockWarnings(books){
    const lowStockBooks = books.filter((book)=> {
        return book.stock<=lowStockWarningValue;
    })
    displayLowStockBooksList(lowStockBooks);
}



// Function to display book list
document.addEventListener("DOMContentLoaded", () => displayBooksList(books));
document.addEventListener("DOMContentLoaded", () => genreStockCount(books));
document.addEventListener("DOMContentLoaded", () => displayLowStockWarnings(books));

function displayBooksList(books){
    let booksHtml = `<table class="table table-striped table-light">
    <thead>
        <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Year</th>
            <th>Stock</th>
            <th>Remove</th>
        </tr>
    </thead>
    <tbody>`;
    if(books.length===0){
        booksHtml += `
        <tr>
            <td colspan=7 style = "text-align:center;">No books available.</td> 
        </tr>`
    } else{
    for(const book of books) {
        booksHtml += `
            <tr>
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.genre}</td>
                <td>${book.year}</td>
                <td>${book.stock}</td>
                <td><button class="btn btn-danger delete-book-btn" value=${book.id}>X</button></td>
            </tr>` 
        }
    }
    booksHtml += `</tbody>
    </table>`;

    // Now, set the innerHTML of the container element to the booksHtml string
    document.getElementById("book-inventory").innerHTML = booksHtml; 
}

// Function to empty newBooks Form upon submission of data
function emptyFormData(form){
    form.bookTitle.value = "";
    form.bookAuthor.value = "";
    form.bookGenre.value = "Fiction";
    form.bookYear.value = "2024";
    form.bookStock.value = "1";
}


// Function to display low stock book list without come columns
function displayLowStockBooksList(books){
    let booksHtml = `<table class="table table-striped">
    <thead>
        <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Author</th>
            <th>Stock</th>
        </tr>
    </thead>
    <tbody>`;
    if(books.length===0){
        booksHtml += `
        <tr>
            <td colspan=7 style = "text-align:center;">No books available.</td> 
        </tr>`
    } else{
    for(const book of books) {
        booksHtml += `
            <tr>
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.stock}</td>
            </tr>` 
        }
    }
    booksHtml += `</tbody>
    </table>`;

    // Now, set the innerHTML of the container element to the booksHtml string
    document.getElementById("low-stock-list").innerHTML = booksHtml; 
}