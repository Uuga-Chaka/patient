const { MenuItem } = require('electron');

const submenu = (win) => {
    return new MenuItem({
        label: 'Electron',
        submenu: [{
            role: 'copy',
            accelerator: process.platform === 'darwin' ? 'Cmd+C' : 'Ctrl+C',
            click: () => { console.log('Electron rocks!') },
        }, {
            role: 'cut',
            accelerator: process.platform === 'darwin' ? 'Cmd+X' : 'Ctrl+X',
            click: () => { console.log('Electron rocks!') },
        }, {
            role: 'paste',
            accelerator: process.platform === 'darwin' ? 'Cmd+V' : 'Ctrl+V',
            click: () => { console.log('Electron rocks!') },
        }, {
            role: 'services',
            accelerator: process.platform === 'darwin' ? 'Cmd+I' : 'Ctrl+I',
            click: () => { console.log('Electron rocks!') },
        }, {
            role: 'save',
            accelerator: process.platform === 'darwin' ? 'Cmd+S' : 'Ctrl+S',
            click: () => {
                win.webContents.send('activate-save', { 'SAVED': 'File saved' })
            }
        }]
    });
}

module.exports = submenu;