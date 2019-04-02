const { ipcRenderer } = require('electron');
const timer = require('./timer');
const data = require('../../data');

let aboutLink = document.querySelector('#about-link');
let playButton = document.querySelector('.play-button');
let time = document.querySelector('.tempo');
let course = document.querySelector('.course');

window.onload = () => {

    data.getDatas(course.textContent)
        .then(datas => {
            time.textContent = datas.time;
        })
}

aboutLink.addEventListener('click' , () => {
    ipcRenderer.send('open-about-window');
});

let imgs = ['img/play-button.svg', 'img/stop-button.svg'];
let play = false;
playButton.addEventListener('click', () => {

    imgs = imgs.reverse();
        if(play){
            timer.stop(course.textContent);
            play = false;
        } else {
            timer.start(time);
            play = true;
        }
            
    playButton.src = imgs[0];
});

ipcRenderer.on('changed-course', (event, courseName) => {
    data.getDatas(courseName)
        .then((datas) => {
            time.textContent = datas.time;
        });
    course.textContent = courseName;
});
