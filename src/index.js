import '../node_modules/bootstrap/scss/bootstrap.scss';
import teamData from './helpers/teamData';
import devData from './helpers/devData';
import { CreateElement, BuildSearch, buildProfile, animate } from './helpers';
import hairImg from '../assets/images/hair.png';
import tortImg from '../assets/images/tort.png';
import launchImg from '../assets/images/launch.png';

document.getElementById('app').style.position = 'relative';
//Create images
new CreateElement('#app', 'img', [{ src: hairImg }, { class: 'app__hair' }]);
new CreateElement('#app', 'img', [{ src: tortImg }, { style: 'position: absolute; right: 80%; z-index: 1' }, { class: 'app__tort' }]);
new CreateElement('#app', 'img', [{ src: launchImg }, { style: 'position: absolute; right: 0' }, { class: 'app__launch' }]);

//Animate tortoise
const tort = document.querySelector('.app__tort');
animate(tort);

//create container
new CreateElement('#app', 'div', [{ class: 'container' }]);
document.getElementsByClassName('container')[0].style.textAlign = 'center';

//Create Headers
new CreateElement('.container', 'h1', [{ class: 'app__slogan' }], 'The race is not always to the swift.');
const appSlogan = document.querySelector('.app__slogan');
appSlogan.style.fontSize = '4rem';
appSlogan.style.textTransform = 'capitalize';
appSlogan.style.marginBottom = '2rem';
new CreateElement('.container', 'h1', [{ class: 'app__header' }], 'Learn About the Bitovi Team!!');
new CreateElement('.container', 'div', [{ class: 'team' }]);
new CreateElement('.team', 'h3', [{ class: 'team__header' }], "Type in a Bitovi Team Member's First or Last Name to View Their Profile.");

//Create first input and etc
new CreateElement('.team', 'input', [{ class: 'team__input' }]);
const teamInput = document.querySelector('.team__input');
teamInput.style.width = '75%';
teamInput.style.margin = '2rem 0';
new BuildSearch('.team__input', 'Search Team Members...', teamData);
new CreateElement('.team', 'div', [{ class: 'team__profile' }]);
buildProfile('.team__input', '.team__profile', teamData);

//Create new input and etc
//Using the same functions and classes to create new inputs, data lists, and profiles
new CreateElement('.team', 'h3', [{ class: 'team__header' }, { style: 'display: inline-block; margin-top: 2rem' }], "Type in a Dev/Designer's First or Last Name to View Their Profile.");
new CreateElement('.team', 'input', [{ class: 'team__input2' }]);
const teamInput2 = document.querySelector('.team__input2');
teamInput2.style.width = '75%';
teamInput2.style.margin = '2rem 0';
new BuildSearch('.team__input2', 'Search Team Members...', devData);
new CreateElement('.team', 'div', [{ class: 'team__profile2' }]);
buildProfile('.team__input2', '.team__profile2', devData);
