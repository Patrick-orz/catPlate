const { contextBridge, ipcRenderer } = require('electron')

window.ipcRenderer = ipcRenderer;

// Allows for saving in web js
contextBridge.exposeInMainWorld('plate', {
    savePlate: (content) => ipcRenderer.send('plate:save-plate', content),
    loadPlate: () => ipcRenderer.invoke('plate:load-plate'),
})
