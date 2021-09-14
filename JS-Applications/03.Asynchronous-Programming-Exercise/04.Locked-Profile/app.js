function lockedProfile() {
    getUsers();
}

async function getUsers() {
    const main = document.querySelector('main');

    try {
        const url = 'http://localhost:3030/jsonstore/advanced/profiles';
        const response = await fetch(url);
        const users = await response.json();

        main.innerHTML = ''

        Object.values(users).map(createUser).forEach((u) => main.appendChild(u));
    } catch (error) {
        alert(error);
    }
}

function createUser({ age, email, username, _id }) {
    const profileDiv = createElement('div');
    profileDiv.className = 'profile';

    const img = createElement('img', undefined, 'userIcon', { src: './iconProfile2.png' }, profileDiv);
    const labelLock = createElement('label', 'Lock', undefined, undefined, profileDiv);
    const inputLock = createElement('input', undefined, undefined, { type: 'radio', name: 'user1Locked', value: 'lock', checked: true }, profileDiv);
    const labelUnlock = createElement('label', 'Unlock', undefined, undefined, profileDiv);
    const inputUnlock = createElement('input', undefined, undefined, { type: 'radio', name: 'user1Locked', value: 'unlock' }, profileDiv);

    const br = createElement('br');
    profileDiv.appendChild(br);

    const hr = createElement('hr');
    profileDiv.appendChild(hr);

    const labelUser = createElement('label', 'Username', undefined, undefined, profileDiv);
    const inputUser = createElement('input', undefined, undefined, { type: 'text', name: 'user1Username', value: username, disabled: true, readonly: true }, profileDiv);

    const divId = createElement('div', undefined, undefined, { id: _id }, profileDiv);
    const hr2 = createElement('hr');
    divId.appendChild(hr2);

    const labelEmail = createElement('label', 'Email:', undefined, undefined, divId);
    const inputEmail = createElement('input', undefined, undefined, { type: 'email', name: 'user1Email', value: email, disabled: false, readonly: true }, divId);

    const labelAge = createElement('label', 'Age:', undefined, undefined, divId);
    const inputAge = createElement('input', undefined, undefined, { type: 'email', name: 'user1Age', value: age, disabled: true, readonly: true }, divId);

    const showMoreButton = createElement('button', 'Show more', undefined, undefined, profileDiv);

    divId.style.display = 'none';
    showMoreButton.addEventListener('click', () => {
        if (inputLock.checked) {
            return;
        }
        
        divId.style.display = showMoreButton.textContent === 'Hide it' ? 'none' : 'block';
        showMoreButton.textContent = showMoreButton.textContent === 'Show more' ? 'Hide it' : 'Show more';
    });

    return profileDiv;
}

function createElement(type, text, className, attributes, appender) {
    const element = document.createElement(type);
    if (text) {
        element.textContent = text;
    }
    if (className) {
        element.className = className;
    }
    if (attributes) {
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value == true ? '' : value);
        });
    }
    if (appender) {
        appender.appendChild(element);
    }

    return element;
}