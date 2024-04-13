const { app, BrowserWindow, ipcMain } = require('electron')
const { Tray, Menu, nativeImage } = require('electron/main')
const path = require('node:path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
}

let tray

app.whenReady().then(async() => {
    const icon = await nativeImage.createThumbnailFromPath("../catPlate/Icon/icons8-cat-64.jpg",{ width: 19, height: 19 })
    tray = new Tray(icon)

    const contextMenu = Menu.buildFromTemplate([
        { label: 'Item1', type: 'radio' },
        { label: 'Item2', type: 'radio' },
        { label: 'Item3', type: 'radio', checked: true },
        { label: 'Item4', type: 'radio' }
    ])

    tray.setToolTip('This is my application.')
    tray.setContextMenu(contextMenu)
    ipcMain.handle('ping', () => 'pong')
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
