function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', getPosts);
    document.getElementById('btnViewPost').addEventListener('click', getComments);
}

attachEvents();

async function getPosts() {
    const url = 'http://localhost:3030/jsonstore/blog/posts';

    const response = await fetch(url);
    const data = await response.json();

    const select = document.getElementById('posts');
    select.innerHTML = '';

    Object.values(data).map(createOption).forEach(o => select.appendChild(o));
}

function createOption(post) {
    const result = document.createElement('option');
    result.textContent = post.title;
    result.value = post.id;

    return result;
}

async function getComments() {
    const postID = document.getElementById('posts').value;

    if (postID) {
        const postsURL = 'http://localhost:3030/jsonstore/blog/posts/' + postID;
        const commentsURL = 'http://localhost:3030/jsonstore/blog/comments';

        const [postResponse, commentsResponse] = await Promise.all([
            fetch(postsURL), 
            fetch(commentsURL)
        ])

        const postData = await postResponse.json();
        const commentsData = await commentsResponse.json();

        const postTitle = document.getElementById('post-title');
        postTitle.textContent = postData.body;

        const commentsUl = document.getElementById('post-comments');

        const comments = Object.values(commentsData).filter((p) => p.postId == postID);

        comments.map(createComment).forEach(c => commentsUl.appendChild(c));
    } else {
        alert('No post.');
    }
}

function createComment(comment) {
    const result = document.createElement('li');
    result.textContent = comment.text;
    result.id = comment.id;
    return result;
}