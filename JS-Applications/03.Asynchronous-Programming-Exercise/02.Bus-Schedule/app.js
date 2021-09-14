function solve() {
    const departButton = document.getElementById('depart');
    const arriveButton = document.getElementById('arrive');
    const banner = document.querySelector('#info span');

    let stop = {
        next: 'depot'
    }

    async function depart() {
        const url = 'http://localhost:3030/jsonstore/bus/schedule/' + stop.next;
        const respone = await fetch(url);
        const data = await respone.json();

        stop = data;
        banner.textContent = `Next stop ${stop.name}`;

        departButton.disabled = true;
        arriveButton.disabled = false;
    }

    function arrive() {
        banner.textContent = `Arriving at ${stop.name}`;

        departButton.disabled = false;
        arriveButton.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();