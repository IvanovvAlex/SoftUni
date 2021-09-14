import { setUpNewPost, setUpPostButtons } from './create.js';

const main = document.querySelector('main');
const topicNameInput = document.querySelector('#topicName');
const userNameInput = document.querySelector('#username');
const postTextInput = document.querySelector('#postText');

setUpNewPost(main, topicNameInput, userNameInput, postTextInput);

const postButton = document.querySelector('.public');
const cancelButton = document.querySelector('.cancel');

setUpPostButtons(postButton, cancelButton);