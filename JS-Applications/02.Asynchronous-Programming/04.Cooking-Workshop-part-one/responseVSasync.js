const url = 'http://localhost:3030/jsonstore/cookbook/recipes';
const main = document.querySelector('main');

// RESPONSE SOLUTION
fetch(url)
    .then(response => response.json())
    .then(recipes => {
        main.innerHTML = '';

        Object.values(recipes).forEach(recipe => {
            const result = e('article', { className: 'preview' },
                e('div', { className: 'title' }, e('h2', {}, recipe.name)),
                e('div', { className: 'small' }, e('img', { src: recipe.img })));

            console.log(result);
            main.appendChild(result);
        })
    })
    .catch(error => {
        alert(error.message);
    })

// ASYNC SOLUTION
try {
    const response = await fetch(url);
    const recipes = await response.json();
    
    main.innerHTML = '';
    
    Object.values(recipes).forEach(recipe => {
        const result = e('article', { className: 'preview' },
            e('div', { className: 'title' }, e('h2', {}, recipe.name)),
            e('div', { className: 'small' }, e('img', { src: recipe.img })));
    
        console.log(result);
        main.appendChild(result);
    })
} catch (error) {
    alert(error.message);
}