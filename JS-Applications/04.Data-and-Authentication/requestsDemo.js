async function getData() {
    const response = await fetch('http://localhost:3030/jsonstore/advanced/articles/details');
    const data = await response.json();

    console.log(data);
}

async function getDataByID(id) {
    const response = await fetch('http://localhost:3030/jsonstore/advanced/articles/details/' + id);
    const data = await response.json();

    console.log(data);
}

async function postData(data) {
    const response = await fetch('http://localhost:3030/jsonstore/advanced/articles/details/', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }) 

    const result = await response.json();
    console.log(result);
}

async function updateData(id, data) {
    const response = await fetch('http://localhost:3030/jsonstore/advanced/articles/details/' + id, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }) 

    const result = await response.json();
    console.log(result);
}

async function deleteData(id) {
    const response = await fetch('http://localhost:3030/jsonstore/advanced/articles/details/' + id, {
        method: 'delete'
    }) 

    const result = response.json();
    console.log(result);
}