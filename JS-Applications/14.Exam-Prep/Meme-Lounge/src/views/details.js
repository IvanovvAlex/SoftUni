import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMemeByID, deleteMeme } from '../api/data.js';

const detailsTemplate = (meme, isOwner, onDelete) => html`
<section id="meme-details">
            <h1>Meme Title: ${meme.title}</h1>
            <div class="meme-details">
                <div class="meme-img">
                    <img alt="meme-alt" src=${meme.imageUrl}>
                </div>
                <div class="meme-description">
                    <h2>Meme Description</h2>
                    <p>
                        ${meme.description}
                    </p>

                    ${isOwner ? html`
                    <a class="button warning" href="/edit/${meme._id}">Edit</a>
                    <button @click=${onDelete} class="button danger">Delete</button>` : ''}
                    
                </div>
            </div>
        </section>`;

export async function detailsPage(context) {
    const userID = sessionStorage.getItem('userId');

    const memeID = context.params.id;
    const meme = await getMemeByID(memeID);
    
    const isOwner = userID === meme._ownerId;

    context.render(detailsTemplate(meme, isOwner, onDelete));

    async function onDelete() {
        const confirmation = confirm('Are you sure you want to delete this meme?');

        if (confirmation) {
            await deleteMeme(memeID);
            context.page.redirect('/catalog');
        }
    }
}