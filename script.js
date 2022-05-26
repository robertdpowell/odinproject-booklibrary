
// book constructor class
class Book {
  constructor (title, author, pages, isbn, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isbn = isbn;
    this.read = read;
  }
}

// UI class
class UI {
  //display all books in UI from storage
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }

  //create card for each book in storE
  static addBookToList(book){
    const list = document.getElementById('bookList');
    const card = document.createElement('div');
    
    card.innerHTML = `
      <div class = 'card' id = 'bookCard'>
        <div class = 'card-body' id = 'cardBody' style="width: 100rem;">
          <div class='card-subtitle'>${book.title}</div>
          <div class='card-subtitle'>${book.author}</div>
          <div class='card-subtitle'>${book.pages}</div>
          <div class='card-subtitle' id = 'isbn'>${book.isbn}</div>
          <div><a href="#" class="btn btn-danger btn-sm delete id='removeButton">REMOVE</a></div>
          <div><a href="#" class="btn btn-danger btn-sm btnRead id ='btnRead">${book.read}</a><div>
        </div>  
      </div>
    `;


    list.append(card);
  }

  static deleteBook(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.parentElement.remove();
    }
  }

  static updateReadStatusUI(el) {
    if(el.classList.contains('btnRead')) {
      if(el.textContent.includes('false')) {
        el.textContent = 'true';
      } else if(el.textContent.includes ('true')){
         el.textContent = 'false';
      }
    }
  }




  static showAlert(message, className){
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.id = 'missingBookFieldsAlert';
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('#createBookForm');
    const submit = document.querySelector('#submit');
    container.insertBefore(div, submit);

    setTimeout(() => document.querySelector('#missingBookFieldsAlert').remove(), 1000);
  }

  static clearFields(){
    document.querySelector('#createBookForm').reset(); 
  }
}


// storage class
class Store {

  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  } 

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
    if(book.isbn === isbn) {
      books.splice(index, 1);
    }
  });

  localStorage.setItem('books', JSON.stringify(books));
  }

  static updateReadStatusStore(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
    if(book.isbn === isbn) {
      book.read = !book.read;
     }
  }); 
  localStorage.setItem('books', JSON.stringify(books));
  }
}

// EVENTS
// event display books from local storage in UI
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// event add a book to UI and storage
document.querySelector('#createBookForm').addEventListener('submit', (e) => {
  
  //prevent actual submit
  e.preventDefault();
  
  //get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const isbn = document.querySelector('#isbn').value;
  const read = document.querySelector('#read').checked;
  
  // Validate form
  if(title === '' || author === '' || pages === '' | isbn === '') {
    UI.showAlert('Please complete all fields', 'alert-danger');
  } else {
  
  //instantiate a book
  const book = new Book(title, author, pages, isbn, read);
  UI.addBookToList(book);
  Store.addBook(book);
  UI.showAlert('Book Added', 'alert-success')
  UI.clearFields();
  }
});

bookList.addEventListener('click', (e) => {
  UI.updateReadStatusUI(e.target);
  Store.updateReadStatusStore(e.target.parentElement.parentElement.children['isbn'].textContent);   
});

bookList.addEventListener('click', (e) => {
  UI.deleteBook(e.target);
  Store.removeBook(e.target.parentElement.parentElement.children['isbn'].textContent);
  UI.showAlert('Book Removed', 'alert-success')
});



const albumFactory = (band, title) => {
  const printReview = () => console.log(title + ' by ' + band + ' is great! ');
  return { band, title, printReview };
 };

const first = albumFactory('radiohead', 'KOL');

console.log(first.band);
