function attachEvents() {
    const catches = document.querySelector('#catches');
    const loadButton = document.querySelector('.load');
    const addButton = document.querySelector('#addForm .add');

    loadButton.addEventListener('click', onLoad);
    addButton.addEventListener('click', onAdd);

    const token = sessionStorage.getItem('userToken');

    if (token) {
        addButton.disabled = false;

        const logoutButton = document.querySelector('#guest [href="login.html"]');
        logoutButton.textContent = 'Logout';
        logoutButton.addEventListener('click', onLogout);

        catches.innerHTML = '';
    }


    async function onAdd(event) {
        event.preventDefault();

        const anglerInput = document.querySelector('#addForm .angler');
        const weightInput = document.querySelector('#addForm .weight');
        const speciesInput = document.querySelector('#addForm .species');
        const locationInput = document.querySelector('#addForm .location');
        const baitInput = document.querySelector('#addForm .bait');
        const captureTimeInput = document.querySelector('#addForm .captureTime');

        const newCatch = {
            angler: anglerInput.value,
            weight: Number(weightInput.value),
            species: speciesInput.value,
            location: locationInput.value,
            bait: baitInput.value,
            captureTime: Number(captureTimeInput.value)
        }

        const response = await fetch('http://localhost:3030/data/catches', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(newCatch)
        })

        const data = await response.json();

        const currentCatch = createHtmlCatch(data);
        catches.appendChild(currentCatch);
    }


    async function onLoad(event) {
        event.preventDefault();

        if (catches.innerHTML != '') {
            catches.innerHTML = '';
        }

        const response = await fetch('http://localhost:3030/data/catches');

        if (!response.ok) {
            const error = await response.json();
            return alert(error.message);
        }

        const catches = await response.json();

        catches.forEach(c => catches.appendChild(createHtmlCatch(c)));

    }

    async function updateCatch(event) {
        event.preventDefault();

        const currCatch = event.target.parentElement;
        const id = currCatch.dataset.id;

        const anglerInput = currCatch.querySelector('.angler');
        const weightInput = currCatch.querySelector('.weight');
        const speciesInput = currCatch.querySelector('.species');
        const locationInput = currCatch.querySelector('.location');
        const baitInput = currCatch.querySelector('.bait');
        const captureTimeInput = currCatch.querySelector('.captureTime');

        const updatedCatch = {
            angler: anglerInput.value,
            weight: Number(weightInput.value),
            species: speciesInput.value,
            location: locationInput.value,
            bait: baitInput.value,
            captureTime: Number(captureTimeInput.value)
        };

        await fetch(`http://localhost:3030/data/catches/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(updatedCatch)
        })
    }

    async function deleteCatch(event) {
        event.preventDefault();

        const currCatch = event.target.parentElement;
        const id = currCatch.dataset.id;

        const response = await fetch(`http://localhost:3030/data/catches/${id}`, {
            method: 'delete',
            headers: { 'X-Authorization': token }
        })

        if (!response.ok) {
            return alert(response.json);
        }

        currCatch.remove();
    }

    // outsourced function
    function createHtmlCatch(currCatch) {

        let anglerLable = createElement('label', undefined, 'Angler');
        let anglerInput = createElement('input', { type: 'text', class: 'angler' }, currCatch.angler);

        let hr1 = createElement('hr');
        let weightLabel = createElement('label', undefined, 'Weight');
        let weightInput = createElement('input', { type: 'number', class: 'weight' }, currCatch.weight);

        let hr2 = createElement('hr');
        let speciesLabel = createElement('label', undefined, 'Species');
        let speciesInput = createElement('input', { type: 'text', class: 'species' }, currCatch.species);

        let hr3 = createElement('hr');
        let locationLabel = createElement('label', undefined, 'Location');
        let locationInput = createElement('input', { type: 'text', class: 'location' }, currCatch.location);

        let hr4 = createElement('hr');
        let baitLabel = createElement('label', undefined, 'Bait');
        let baitInput = createElement('input', { type: 'text', class: 'bait' }, currCatch.bait);

        let hr5 = createElement('hr');
        let captureTimeLabel = createElement('label', undefined, 'Capture Time');
        let captureTimeInput = createElement('input', { type: 'number', class: 'captureTime' }, currCatch.captureTime);

        let hr6 = createElement('hr');
        let updateBtn = createElement('button', { disabled: true, class: 'update' }, 'Update');
        updateBtn.addEventListener('click', updateCatch);
        updateBtn.disabled = sessionStorage.getItem('userId') !== currCatch._ownerId; //!!!


        let deleteBtn = createElement('button', { disabled: true, class: 'delete' }, 'Delete');
        deleteBtn.addEventListener('click', deleteCatch);
        deleteBtn.disabled = sessionStorage.getItem('userId') !== currCatch._ownerId;

        let catchDiv = createElement('div', { class: 'catch' },
            anglerLable, anglerInput, hr1, weightLabel, weightInput, hr2, speciesLabel, speciesInput,
            hr3, locationLabel, locationInput, hr4, baitLabel, baitInput, hr5, captureTimeLabel,
            captureTimeInput, hr6, updateBtn, deleteBtn);

        catchDiv.dataset.id = currCatch._id;
        catchDiv.dataset.ownerId = currCatch._ownerId;

        return catchDiv;
    }


    function createElement(tag, attributes, ...params) {

        let element = document.createElement(tag);
        let firstValue = params[0];

        if (params.length == 1) {

            if (tag == 'input') {
                element.value = firstValue;
            } else {
                element.textContent = firstValue;
            }
        } else {
            element.append(...params);
        }

        if (attributes !== undefined) {
            Object.keys(attributes).forEach(key => {
                element.setAttribute(key, attributes[key]);
            })
        }

        return element;
    }

    async function onLogout(event) {
        event.preventDefault();

        const token = sessionStorage.getItem('userToken');

        const response = await fetch('http:localhost:3030/users/logout', {
            method: 'get',
            headers: { 'X-Authorization': token }
        })

        if (!response.ok) {
            const error = await response.json();
            return alert(error.message);
        }

        sessionStorage.removeItem('userToken');
        sessionStorage.removeItem('userId');

        event.target.textContent = 'Login';

        location.assign('./index.html');
    }
}

attachEvents();