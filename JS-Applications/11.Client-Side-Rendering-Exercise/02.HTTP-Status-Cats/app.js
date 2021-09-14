import { html, render } from '../node_modules/lit-html/lit-html.js';
import { styleMap } from '../node_modules/lit-html/directives/style-map.js';
import { cats as catData } from './catSeeder.js';

const catCardTemplate = (cat) => html`
<li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button class="showBtn">Show status code</button>
        <div class="status" style=${styleMap(cat.info ? {} : {display: 'none'})} id=${cat.id}>
            <h4>Status Code: ${cat.statusCode}</h4>
            <p>${cat.statusMessage}</p>
        </div>
         </div>
</li>`;

const main = document.getElementById('allCats');
catData.forEach(c => c.info = false);
update();

function update() {
    const cats = html`
    <ul @click=${toggleInfo}>
        ${catData.map(catCardTemplate)}
    </ul>`;
    
    render(cats, main);
}

function toggleInfo(ev) {
    const elementID = ev.target.parentNode.querySelector('.status').id;
    const cat = catData.find(c => c.id == elementID);
    cat.info = !cat.info;
    update();
}