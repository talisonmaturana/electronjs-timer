const { ipcRenderer } = require('electron');
const moment = require('moment');
let seconds;
let timer;
let time;

module.exports = {
    start(element){
        time = moment.duration(element.textContent);
        seconds = time.asSeconds();
        clearInterval(timer);
        timer = setInterval(() => {
                seconds++;
                element.textContent = this.secondsToTime(seconds);
        }, 1000);
    },
    stop(course){
        clearInterval(timer);
        let studiedTime = this.secondsToTime(seconds);
        ipcRenderer.send('stopped-course', course, studiedTime);
    },
    secondsToTime(seconds){
        return moment().startOf('day').seconds(seconds).format("HH:mm:ss");
    }
}