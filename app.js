// class

class Book {
  constructor(name, author, isbn) {
    this.name = name;
    this.author = author;
    this.isbn = isbn;
  }
}

class Ul {
  static addToBookList(book) {
    const tbody = document.querySelector('tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td> ${book.name}</td>
        <td> ${book.author}</td>
        <td> ${book.isbn}</td>
        <td><button id = "delete">Delete</button></td>
        `;
    tbody.appendChild(tr);
    tr.querySelector('#delete').onclick = this.removeElements
  }
  static showAlert(msg, className) {
    const h3 = document.querySelector('h3');
    h3.innerHTML = msg;
    h3.classList.add(className);
    setTimeout(() => {
      h3.classList.remove(className);
    }, 1500);
  }
  static removeElements() {
    const tr = this.parentNode.parentNode
    const tbody = tr.parentNode
    tbody.removeChild(tr)
    const isbn = this.parentNode.previousElementSibling.innerHTML.trim()
    Store.removeStore(isbn)
    this.showAlert('Deleted Successfully','success')
  }
}

class Store {

  static getBooks() {
    let book
    if (localStorage.getItem('books')) {
      book = JSON.parse(localStorage.getItem('books'))
    } else {
      book = []
    }
    return book
  }

  static booksAdd(book) {
    let books = this.getBooks()
    books.push(book)
    localStorage.setItem('books', JSON.stringify(books))
  }

  static displayShow() {
    const books = this.getBooks()
    books.forEach(book => {
      Ul.addToBookList(book)
    })
  }

  static removeStore(isbn) {
    const books = this.getBooks()
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        console.log(book)
        books.splice(index, 1)
        Ul.showAlert('Deleted Successfully','success')
      }
    })
    // console.log(books)
    localStorage.setItem('books',JSON.stringify(books))
  }
}


const newBook = function (e) {
  e.preventDefault();
  const name = this.bookName.value;
  const author = this.author.value;
  const isbn = this.isbn.value;
  if (name === '' || author === '' || isbn === '') {
    Ul.showAlert('Please Provide Every Details', 'error');
  } else {
    const book = new Book(name, author, isbn);
    Ul.addToBookList(book);
    Ul.showAlert('Successfully Added', 'success');
    Store.booksAdd(book)
  }
  this.reset();
};


document.onDOMElementLoaded = Store.displayShow()
const bookLIst = document.getElementById('bookLIst');
bookLIst.addEventListener('submit', newBook);