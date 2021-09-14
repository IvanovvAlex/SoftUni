function loadCommits() {
    const username = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;
    const ulCommits = document.getElementById('commits');

    const url = `https://api.github.com/repos/${username}/${repo}/commits`;
    ulCommits.innerHTML = '';

    fetch(url)
        .then((response) => {
            if (response.status == 404) {
                throw new Error(`<li>${response.status} (${response.statusText})</li>`);
            }
            return response.json();
        })
        .then((data) => {
            data.forEach(d => {
                const li = document.createElement('li')
                li.textContent = `${d.commit.author.name}: ${d.commit.message}`;
                ulCommits.appednChild(li);
            });
        })
        .catch(error => {
            ulCommits.innerHTML = error.message;
        });
}