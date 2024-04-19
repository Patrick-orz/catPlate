const { contextBridge, ipcRenderer } = require('electron')

window.ipcRenderer = ipcRenderer;

// Allows for save-load in web js
contextBridge.exposeInMainWorld('plate', {
    savePlate: (key, content) => ipcRenderer.send('plate:save-plate', key, content),
    loadPlate: (key) => ipcRenderer.invoke('plate:load-plate', key),
})
