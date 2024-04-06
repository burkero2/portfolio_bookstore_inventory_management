// Starter books object containing a variety of example books.
const books = [
    { id: 1, title: 'Brave New World', author: 'Aldous Huxley', genre: 'Science Fiction', year: 1932, stock: 5 },
    { id: 2, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', year: 1925, stock: 8 },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', year: 1960, stock: 2 },
    { id: 4, title: '1984', author: 'George Orwell', genre: 'Dystopian', year: 1949, stock: 6 },
    { id: 5, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', genre: 'Fantasy', year: 1954, stock: 3 }
  ];

const genre = ["Fantasy", "Fiction", "Science-Fiction", "Dystopian"]




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
        const nextBookID = books[books.length-1].id+1;
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
    genreStockCount(books)
}

// Function to Filter the displayed booklist by Author
const authorSearchBTn = document.getElementById("authorSearchBtn");
authorSearchBTn.addEventListener("click", ()=>authorSearch(books))

function authorSearch(books){
    const author= document.getElementById("searchByAuthor").value;
    const filteredAuthors = books.filter((book) => book.author ===author);
    displayBooksList(filteredAuthors);
}





// Function to Filter the displayed booklist by Genre
const genreFilter = document.getElementById("genre-filter-btn");
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
    // Get the value of the bookId you are removing
    const bookId = Number(e.target.value);
    // Get the index value of that bookID
    const bookIndex = books.findIndex(book => book.id === bookId);

    const currentBookStock = books[bookIndex].stock;
    if (bookIndex !== -1) { 
        if(currentBookStock>1){
            books[bookIndex].stock-=1;
        } else{
            books.splice(bookIndex, 1); 
        }
        displayBooksList(books);
         
    } else {
        console.log("Book not found");
    }
    genreStockCount(books)
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
    let displayText = `<table>
    <tr>
        <th>Genre</th>
        <th>Stock</th>
    </tr>
    `;
    for (const genre in stockByGenre) {
        if (stockByGenre.hasOwnProperty(genre)) {
            displayText += `<tr><td>${genre}:</td><td>${stockByGenre[genre]}</td></tr>`;
        }
    }
    const totalStocks = calculateTotalStock(books);
    displayText += `<tr><td><strong>Total</strong></td><td><strong>${totalStocks}</strong></td></tr></table>`
    filterBookText.innerHTML = displayText;
}


// Event Listener for the stock counts
function calculateTotalStock(books){
    displayBooksList(books);
    const filterBtn = document.getElementById("genreSelect");
    filterBtn.value = "All";
    let total = books.reduce((acc, curr)=>{
        return acc + curr.stock;
    }, 0)
    
    return total;
}

// Function to display book list
document.addEventListener("DOMContentLoaded", () => displayBooksList(books));
document.addEventListener("DOMContentLoaded", () => genreStockCount(books));

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

// Function to empty newBooks Form upon submission of data
function emptyFormData(form){
    form.bookTitle.value = "";
    form.bookAuthor.value = "";
    form.bookGenre.value = "Fiction";
    form.bookYear.value = "2024";
    form.bookStock.value = "1";
}