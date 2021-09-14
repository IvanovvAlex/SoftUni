import { html } from '../../node_modules/lit-html/lit-html.js';
import { getBookByID, deleteBook } from '../api/data.js';

const detailsTemplate = (book, isOwner, userID, onDelete) => html`
<section id="details-page" class="details">
            <div class="book-information">
                <h3>${book.title}</h3>
                <p class="type">Type: ${book.type}</p>
                <p class="img"><img src=${book.imageUrl}></p>
                <div class="actions">
                    ${isOwner ? html`
                    <a class="button" href="/edit/${book._id}">Edit</a>
                    <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>
                    ` : ''}

                    <!-- Bonus -->
                    <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
                    ${userID == null || isOwner ? '' : html`<a class="button" href="#">Like</a>`}

                    <!-- ( for Guests and Users )  -->
                    <div class="likes">
                        <img class="hearts" src="/images/heart.png">
                        <span id="total-likes">Likes: 0</span>
                    </div>
                    <!-- Bonus -->
                    
                </div>
            </div>
            <div class="book-description">
                <h3>Description:</h3>
                <p>
                    ${book.description}
                </p>
            </div>
        </section>`;

export async function detailsPage(context) {
    const userID = sessionStorage.getItem('userId');

    const bookID = context.params.id;
    const book = await getBookByID(bookID);
    
    const isOwner = userID === book._ownerId;
    
    context.render(detailsTemplate(book, isOwner, userID, onDelete));

    async function onDelete() {
        const confirmation = confirm('Are you sure you want to delete this book?');

        if (confirmation) {
            await deleteBook(bookID);
            context.page.redirect('/');
        }
    }
}