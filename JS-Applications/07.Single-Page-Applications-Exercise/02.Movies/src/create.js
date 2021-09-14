import { showHome } from "./home.js";

let main;
let section;

export function setUpCreate(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    const form = section.querySelector('form');
    form.addEventListener('submit', onSumbit);
}

async function onSumbit(ev) {
    ev.preventDefault();

    let title = ev.target.querySelector('input[name="title"]').value;
    let description = ev.target.querySelector('textarea[name="description"]').value;
    let image = ev.target.querySelector('input[name="imageUrl"]').value;

    const movie = { title, description, img: image };

    if (title == '' || description == '' || image == '') {
        return alert('All fields are required!');
    }

    const response = await fetch('http://localhost:3030/data/movies', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('authToken')
        },
        body: JSON.stringify(movie)
    });

    if (response.ok == true) {

        ev.target.querySelector('input[name="title"]').value = '';
        ev.target.querySelector('textarea[name="description"]').value = '';
        ev.target.querySelector('input[name="imageUrl"]').value = '';

        showHome();

    } else {
        const error = await response.json();
        alert(error.message);
    }
}

export async function showCreate() {
    main.innerHTML = '';
    main.appendChild(section);
}