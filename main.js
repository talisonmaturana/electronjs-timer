const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const data = require('./data');
const templateGenerator = require('./template');

let tray = null;

app.on('ready', () => {
    console.log('Application started');

    let mainWindow = new BrowserWindow({
        width: 800,
        height: 500
    });
    tray = new Tray(__dirname + '/app/img/icon.png');
    let template = templateGenerator.generateTrayTemplate(mainWindow);
    let trayMenu = Menu.buildFromTemplate(template);
    tray.setContextMenu(trayMenu);

    

    mainWindow.loadURL(`file://${__dirname}/app/index.html`)
});

app.on('window-all-closed', () => {
    app.quit();
});

let aboutWindow = null;

ipcMain.on('open-about-window', () => {
   if(aboutWindow == null){
        aboutWindow = new BrowserWindow({
            width: 400,
            height: 265,
            alwaysOnTop: true,
            frame: false
        });

        aboutWindow.on('closed', () => {
            aboutWindow = null;
        });
    }
    aboutWindow.loadURL(`file://${__dirname}/app/about.html`);
});

ipcMain.on('close-window-about', () => {
    aboutWindow.close();
});

ipcMain.on('stopped-course', (event, course, studiedTime) => {
    console.log(`The course ${course} was studied for ${studiedTime}`)
    data.saveDatas(course, studiedTime);
});