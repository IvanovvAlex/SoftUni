import { html } from '../node_modules/lit-html/lit-html.js';

export { mainTemplate };

const mainTemplate = (data, functions, bookToEdit) => html`
    <button id="loadBooks" @click=${functions.loadBooks}>LOAD ALL BOOKS</button>
    ${tableTemplate(data,functions, bookToEdit)}
    ${bookToEdit ? editFormTemplate(functions,bookToEdit) : addFormTemplate(functions)}`;

const tableTemplate = (data, functions) => html`
    <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody @click=${functions.onClick}>
                ${data.map(x=>rowTempl(x))}
            </tbody>
    </table>`;

const rowTempl = (data) => html `
    <tr id=${data._id}>
        <td>${data.title}</td>
        <td>${data.author}</td>
        <td>
            <button id="editBtn">Edit</button>
            <button id="deleteBtn">Delete</button>
        </td>
    </tr>`;

const addFormTemplate = (functions) => html`
    <form id="add-form" @submit=${functions.onAdd}>
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Submit">
    </form>`;

const editFormTemplate = (functions, book) => html `
    <form id="edit-form" @submit=${functions.onEdit}>
            <input type="hidden" name="id" .value=${book._id}>
            <h3>Edit book</h3>
            <label>TITLE</label>
            <input type="text" name="title" placeholder="Title..." .value=${book.title}>
            <label>AUTHOR</label>
            <input type="text" name="author" placeholder="Author..." .value=${book.author}>
            <input type="submit" value="Save">
    </form>`