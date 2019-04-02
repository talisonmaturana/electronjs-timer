const { ipcRenderer, shell } = require('electron');
const process = require('process');

let closeLink =  document.querySelector('#close-link');
let githubLink = document.querySelector('#github-link');
let electronVersion = document.querySelector('#electron-version');

window.onload = () => {
    electronVersion.textContent = process.versions.electron;
}

closeLink.addEventListener('click', () => {
    ipcRenderer.send('close-window-about');
});

githubLink.addEventListener('click', () => {
    shell.openExternal('https://github.com/talisonmaturana');
});