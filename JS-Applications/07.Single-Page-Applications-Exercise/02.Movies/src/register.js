import { showHome } from './home.js';

let main;
let section;

export function setUpRegister(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    const form = section.querySelector('form');
    form.addEventListener('submit', onSubmit);
}

async function onSubmit(ev) {
    ev.preventDefault();

    let email = ev.target.querySelector('input[name="email"]').value;
    let password = ev.target.querySelector('input[name="password"]').value;
    let repass = ev.target.querySelector('input[name="repeatPassword"]').value;

    const body = JSON.stringify({ email, password });

    if (email = '' || password == '') {
        return alert('All fields are required!');
    } else if (password != repass) {
        return alert('Passwords don\'t match!');
    }

    const response = await fetch('http://localhost:3030/users/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: body
    });

    if (response.ok == true) {
        ev.target.reset(); 

        const data = await response.json();

        sessionStorage.setItem('authToken', data.accessToken);
        sessionStorage.setItem('userId', data._id);
        sessionStorage.setItem('email', data.email);

        document.getElementById('welcome-msg').textContent = `Welcome, ${data.email}`;

        Array.from(document.querySelectorAll('nav .user')).forEach(l => l.style.display = "block");
        Array.from(document.querySelectorAll('nav .guest')).forEach(l => l.style.display = "none");

        showHome();

    } else {
        const error = await response.json();
        alert(error.message);
    }
}

export async function showRegister() {
    main.innerHTML = '';
    main.appendChild(section);
}