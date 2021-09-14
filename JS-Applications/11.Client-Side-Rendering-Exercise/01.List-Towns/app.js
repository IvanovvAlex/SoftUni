import { html, render } from '../node_modules/lit-html/lit-html.js';

const listTemplate = (data) => html`
<ul>
    ${data.map(t => html`<li>${t}</li>`)}
</ul>`;

document.getElementById('btnLoadTowns').addEventListener('click', updateList);

function updateList(ev) {
    ev.preventDefault();

    const townsString = document.getElementById('towns').value;

    const towns = townsString.split(',').map(x => x.trim());

    const result = listTemplate(towns);
    const root = document.getElementById('root');
    
    render(result, root);
}