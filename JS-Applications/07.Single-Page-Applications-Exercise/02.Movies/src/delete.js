import { showHome } from "./home.js";

export async function onDelete(ev, id) {
    ev.preventDefault();
    const confirmation = confirm('Are you sure you want to delete this movie?');

    if (confirmation == true) {
        const response = await fetch('http://localhost:3030/data/movies/' + id, {
            method: 'delete',
            headers: { 'X-Authorization': sessionStorage.getItem('authToken') }
        });

        if (response.ok == true) {
            alert('Movie deleted!');
            showHome();
        } else {
            const error = await response.json();
            alert(error.message);
        }
    }
}