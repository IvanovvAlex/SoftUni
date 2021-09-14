import { setUpHome, showHome } from './home.js';
import { setUpDetails } from './details.js';
import { setUpLogin } from './login.js';
import { setUpRegister } from './register.js';
import { setUpCreate } from './create.js';
import { setUpEdit } from './edit.js';
import { setUpNavigation } from './navigation.js';

const main = document.querySelector('main');

setUpSection('home-page', setUpHome);
setUpSection('add-movie', setUpCreate);
setUpSection('movie-details', setUpDetails);
setUpSection('edit-movie', setUpEdit);
setUpSection('form-login', setUpLogin);
setUpSection('form-sign-up', setUpRegister);

setUpNavigation();

showHome();

function setUpSection(sectionID, setup) {
    const section = document.getElementById(sectionID);
    setup(main, section);
}