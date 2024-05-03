// Referenced
// https://gist.github.com/ccnokes/d666eee93b7c86e661dbd0f930a9a6c2#file-app-with-storage-js
const { app, BrowserWindow, ipcMain } = require('electron');
const { Tray, Menu, nativeImage } = require('electron/main');
const path = require('path');
const fs = require('fs');
const Store = require('./src/js/store.js');

// Store class for todo, or what's on plate
const plate = new Store({
    configName: 'plate',
    defaults: {
        text: "Write something!", // Pure text (what you see when editing)
        events: [],
        sortBy: 0, // how events are listed
    }
})

// New app window
const createWindow = () => {
    const win = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'src/js/preload.js'),
        },
        width: 800,
        height: 600,
    });

    win.loadFile('src/index.html');
}

// Set tray icon
const setTray = async() => {
    // Create and display tray icon
    const icon = await nativeImage.createThumbnailFromPath("./icon/trayTemplate.png",{ width: 19, height: 19 });
    icon.setTemplateImage(true);
    let tray = new Tray(icon);

    const contextMenu = Menu.buildFromTemplate([
        { label: 'Item1', type: 'radio' },
        { label: 'Item2', type: 'radio' },
        { label: 'Item3', type: 'radio', checked: true },
        { label: 'Item4', type: 'radio' }
    ]);
    tray.setToolTip('This is my application.');
    tray.setContextMenu(contextMenu);
}

//Save & load plateRaw
function handleSavePlate(event, key = "text", content){
    plate.set(key, content);
}
function handleLoadPlate(event, key = "text") {
    console.log(key);
    console.log(plate.get(key));
    return plate.get(key);
}


// OnStart
app.whenReady().then(() => {

    // listen for plate save event
    ipcMain.on('plate:save-plate', handleSavePlate);
    // listen and respond for plate load event
    ipcMain.handle('plate:load-plate', handleLoadPlate);

    // Generate window
    createWindow();

    // Set tray icon
    setTray();

    // Automatically open window
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
})

// Quit application on window closure
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
