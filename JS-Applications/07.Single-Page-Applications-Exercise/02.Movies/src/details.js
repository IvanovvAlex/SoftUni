import { e } from './dom.js';
import { onDelete } from './delete.js';
import { showEdit } from './edit.js';

async function getLikesByMovieId(id) {
    const response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);
    const data = await response.json();
    return data;
}

async function getOwnLikesByMovieId(id) {
    const userID = sessionStorage.getItem('userId');

    const response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${userID}%22`);
    const data = await response.json();
    return data;
}

async function getMovieById(id) {
    const response = await fetch('http://localhost:3030/data/movies/' + id);
    const data = await response.json();
    return data;
}

function createMovieCard(movie, likes, ownLike) {

    const controls = e('div', { className: 'col-md-4 text-center' },
        e('h3', { className: 'my-3' }, 'Movie Description'),
        e('p', {}, movie.description)
    );

    const userID = sessionStorage.getItem('userId');

    if (userID != null) {
        if (userID == movie._ownerId) {
            controls.appendChild(e('a', { className: 'btn btn-danger', href: '#', onClick: (e) => onDelete(e, movie._id) }, 'Delete'));
            controls.appendChild(e('a', { className: 'btn btn-warning', href: '#', onClick: () => showEdit(movie._id) }, 'Edit'));
        } else if (ownLike.length == 0) {
            controls.appendChild(e('a', { className: 'btn btn-primary', href: '#', onClick: likeMovie }, 'Like'));
        }
    }

    let likesSpan = e('span', { className: 'enrolled-span' }, likes + ' like' + (likes === 1 ? '' : 's'));
    controls.appendChild(likesSpan);

    const divElement = document.createElement('div');
    divElement.className = 'container';

    divElement.appendChild(e('div', { className: 'row bg-light text-dark' },
        e('h1', {}, `Movie title: ${movie.title}`),
        e('div', { className: 'col-md-8' },
            e('img', { className: 'img-thumbnail', src: movie.img, alt: 'Movie' })),
        controls));

    return divElement;

    async function likeMovie(ev) {
        const response = await fetch('http://localhost:3030/data/likes', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionStorage.getItem('authToken')
            },
            body: JSON.stringify({ movieId: movie._id })
        });

        if (response.ok == true) {
            ev.target.remove();
            likes++;
            likesSpan.textContent = likes + ' like' + (likes === 1 ? '' : 's');
        }
    }

}

let main;
let section;

export function setUpDetails(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
}

export async function showDetails(id) {
    section.innerHTML = '';
    main.innerHTML = '';
    main.appendChild(section);

    const [movie, likes, ownLike] = await Promise.all(
        [getMovieById(id),
            getLikesByMovieId(id),
            getOwnLikesByMovieId(id)
        ]);

    const card = createMovieCard(movie, likes, ownLike);
    section.appendChild(card);
}