document.querySelector('#register-form').addEventListener('submit', onRegister);
document.querySelector('#login-form').addEventListener('submit', onLogin);

const loginButton = document.querySelector('#guest [href="login.html"]');
loginButton.disabled = true;

async function onRegister(ev) {
    ev.preventDefault();

    const dataForm = new FormData(ev.target);

    const email = dataForm.get('email');
    const password = dataForm.get('password');
    const rePass = dataForm.get('rePass');

    if (email == '' || password == '') {
        return alert('All fields are required!');
    }

    if (password != rePass) {
        return alert('Passwords do not match!');
    }

    const response = await fetch('http://localhost:3030/users/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
        const error = await response.json();
        return alert(error.message);
    }

    const data = await response.json();

    sessionStorage.setItem('userToken', data.accessToken);
    sessionStorage.setItem('userId', data._id);

    location.assign('./index.html');
}

async function onLogin(event) {
    event.preventDefault();

    const dataForm = new FormData(event.target);

    const email = dataForm.get('email');
    const password = dataForm.get('password');

    if (email == '' || password == '') {
        return alert('All fields are required!');
    }

    const response = await fetch('http://localhost:3030/users/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        const error = await response.json();
        return alert(error.message);
    }

    const data = await response.json();

    sessionStorage.setItem('userToken', data.accessToken);
    sessionStorage.setItem('userId', data._id);

    location.assign('./index.html');
}