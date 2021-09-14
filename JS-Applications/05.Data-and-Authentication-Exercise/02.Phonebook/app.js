function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', loadPosts);
    document.getElementById('btnCreate').addEventListener('click', createPost);
}

attachEvents();

async function loadPosts() {
    const postsUl = document.getElementById('phonebook');

    const response = await fetch('http://localhost:3030/jsonstore/phonebook');
    const data = await response.json();

    postsUl.innerHTML = ''

    Object.values(data).map(createElement).forEach((p) => postsUl.appendChild(p));
}

async function deletePost(ev) {
    const id = ev.target.parentNode.id;
    const url = `http://localhost:3030/jsonstore/phonebook/` + id;

    const response = await fetch(url, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
    })

    ev.target.parentNode.remove();
}

async function createPost() {
    const person = document.getElementById('person').value;
    const phone = document.getElementById('phone').value;

    if (person && phone) {
        const response = await fetch('http://localhost:3030/jsonstore/phonebook', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ person, phone })
        });

        document.getElementById('person').value = '';
        document.getElementById('phone').value = '';

        loadPosts();
    } else {
        return alert('All fields are required!');
    }
}

function createElement({ person, phone, _id }) {
    const contact = document.createElement('li');
    contact.setAttribute('id', _id);
    contact.textContent = `${person}: ${phone}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', deletePost);
    contact.append(deleteButton);

    return contact;
}