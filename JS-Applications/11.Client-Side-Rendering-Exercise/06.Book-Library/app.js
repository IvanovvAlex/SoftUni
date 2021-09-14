import { render } from '../node_modules/lit-html/lit-html.js';
import { mainTemplate } from './views.js';
import api from './data.js';

const body = document.querySelector('body');
let books = [];

const functions = {
    loadBooks,
    onClick,
    onAdd,
    onEdit
}

start();

function start() {
    render(mainTemplate(books, functions), body);
}

async function loadBooks() {
    books = await api.getAllBooks();
    render(mainTemplate(books, functions), body);
}

async function onAdd(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);

    const book = {
        title: formData.get('title'),
        author: formData.get('author')
    }

    if (book.title == '' || book.author == '') {
        alert('All fields are required!')
        return;
    }

    await api.addBook(book);
    loadBooks();
    ev.target.reset();
}

async function onEdit(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const id = formData.get('id');

    const book = {
        title: formData.get('title'),
        author: formData.get('author')
    }

    const confirmed = confirm('Book info will be modified!');

    if (!confirmed) {
        return;
    }

    await api.editBook(id, book);

    loadBooks();
    ev.target.reset();
}

async function onClick(ev) {
    ev.preventDefault();

    if (ev.target.id == 'editBtn') {
        const bookId = ev.target.parentNode.parentNode.id;
        const bookToEdit = await api.getBook(bookId);

        render(mainTemplate(books, functions, bookToEdit), body);
    }

    if (ev.target.id == 'deleteBtn') {
        const deleteID = ev.target.parentNode.parentNode.id;
        const deletedBook = await api.deleteBook(deleteID);

        loadBooks();
    }
}