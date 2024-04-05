// Starter books object containing a variety of example books.
const books = [
    { id: 1, title: 'Brave New World', author: 'Aldous Huxley', genre: 'Science Fiction', year: 1932, stock: 5 },
    { id: 2, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', year: 1925, stock: 8 },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', year: 1960, stock: 2 },
    { id: 4, title: '1984', author: 'George Orwell', genre: 'Dystopian', year: 1949, stock: 6 },
    { id: 5, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', genre: 'Fantasy', year: 1954, stock: 3 }
  ];

// Function to display book list
function displayBooksList(books){
    let booksHtml = `<table>
        <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Year</th>
            <th>Stock</th>
            <th>Remove</th>
        </tr>`;

    for(const book of books) {
    booksHtml += `

        <tr>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td>${book.year}</td>
            <td>${book.stock}</td>
            <td><button class="delete-book-btn" value=${book.id}>X</button></td>
        </tr>` 
    }

    booksHtml += `</table>`;

    // Now, set the innerHTML of the container element to the booksHtml string
    document.getElementById("book-inventory").innerHTML = booksHtml;

}

document.addEventListener("DOMContentLoaded", () => displayBooksList(books));


// Function to empty newBooks Form upon submission of data
function emptyFormData(form){
    form.bookTitle.value = "";
    form.bookAuthor.value = "";
    form.bookGenre.value = "";
    form.bookYear.value = "";
    form.bookStock.value = "";
}


// Function to add a New Item to the Book Object
const newBookForm = document.getElementById("new-book-form");
newBookForm.addEventListener("submit", addNewBook)

function addNewBook(event){
    event.preventDefault();
    const form = event.target;
    const title = form.bookTitle.value;
    const author = form.bookAuthor.value;
    const genre = form.bookGenre.value;
    const year = form.bookYear.value;
    const stock = parseInt(form.bookStock.value);
    if (form){
        const nextBookID = books.length+1;
        console.log(nextBookID);
        const newItem = { 
            id: nextBookID, 
            title: title, 
            author: author, 
            genre: genre, 
            year: year, 
            stock: stock 
        }
        books.push(newItem);
    }
    displayBooksList(books);
    emptyFormData(form);
}

// Function to Filter the displayed booklist by Genre
const genreFilter = document.getElementById("genre-filter-btn");

console.log
genreFilter.addEventListener("click", () => filterByGenre(books))


function filterByGenre(books){
    const genre = document.getElementById("genreSelect").value;
    if(genre==="All"){
        displayBooksList(books);
    }else{
        const filteredBooks = books.filter((book) => book.genre ===genre);
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
// Chat GPT helped me build this function. 
    const bookId = Number(e.target.value);
    const bookIndex = books.findIndex(book => book.id === bookId);

    if (bookIndex !== -1) { // Make sure the book was found
        books.splice(bookIndex, 1); // Remove the book from the array
        displayBooksList(books); // Refresh the display
    } else {
        console.log("Book not found");
    }
}

// Stock Count Text Container Variable
let stockCountContainer = document.getElementById("stock-count-container")

// Event Listener for the stock counts
const stockCounts = document.getElementById("stock-count-btn")
stockCounts.addEventListener("click", () => calculateTotalStock(books)) 

function calculateTotalStock(books){
    displayBooksList(books);
    const filterBtn = document.getElementById("genreSelect");
    filterBtn.value = "All";
    let total = books.reduce((acc, curr)=>{
        return acc + curr.stock;
    }, 0)
    
    stockCountContainer.innerHTML = total;
}


