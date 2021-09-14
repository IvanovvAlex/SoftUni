async function solution() {
    const main = document.getElementById('main');

    try {
        const url = `http://localhost:3030/jsonstore/advanced/articles/list`;

        const response = await fetch(url);
        const data = await response.json();

        data.forEach(x => {

            const parentDiv = createElement('div', 'accordion', null, main);
            const div = createElement('div', 'head', null, parentDiv);
            const span = createElement('span', null, `${x.title}`, div);
            const btn = createElement('button', 'button', 'More', div);

            btn.setAttribute('id', `${x._id}`);

        });

    } catch(error) {
        alert(error);
    }

    const buttons = Array.from(document.getElementsByTagName('button'));

    buttons.forEach(btn => {
        btn.addEventListener('click', getMoreInfo);
    });

    async function getMoreInfo(ev) {

        let button = ev.target;
        let id = button.getAttribute('id');
        let mainDiv = button.parentNode.parentNode;
        let extraDiv;

        url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;

        try {
            response = await fetch(url);
            data = await response.json();

            extraDiv = mainDiv.querySelector('.extra');

            if (button.textContent == 'Less') {
                button.textContent = 'More';
                extraDiv.style.display = 'none';

                return;
            }

            if (extraDiv) {
                button.textContent = 'Less';
                extraDiv.style.display = 'block';

                return;
            }

            extraDiv = createElement('div', 'extra', null, mainDiv);

            mainDiv.appendChild(extraDiv);

            let paragraph = createElement('p', null, data.content, extraDiv);

            button.textContent = 'Less';
            extraDiv.style.display = 'block';
        } catch(error) {
            alert(error);
        }
    }

    function createElement(type, className, content, parent) {
        const result = document.createElement(type);

        if (className) {
            result.classList.add(className);
        }

        if (content) {
            result.textContent = content;
        }

        parent.appendChild(result);

        return result;
    }
}

solution();