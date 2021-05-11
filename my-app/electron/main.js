const { ipcMain, app, BrowserWindow, session, Menu } = require('electron');
const path = require('path');
const os = require('os');
const isDev = require('electron-is-dev');
const db = require('./databases/database');
const shortcuts = require('./shortcuts');

//Habilitar las herramientas  de desarrollo
const reactDevToolsPath = path.join(os.homedir(),
    "/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.11.0_0")


//Creaci'on de la ventana
let win;

//Creaci'on del menu
const menu = new Menu();

function createWindow() {

    win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        resizable: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    //Verificando el estado actual de la app, si es esta en desarrollo o no
    const startURL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;

    //Cargando la ventana
    win.loadURL(startURL);

    //Abriendo las herramientas de desarrollo desde el principio
    win.webContents.openDevTools()

    //Incializando el menu mientas le paso el argumento de la ventana actual,
    // para poder enviar mensaje desde el proceso principal el proceso de renderizado
    menu.append(shortcuts(win));
    Menu.setApplicationMenu(menu)
}

app.whenReady().then(async () => {
    // await session.defaultSession.loadExtension(reactDevToolsPath)
}).then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        db.run('CREATE TABLE langs(name text)');
        db.close((err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Close the database connection.');
            app.quit();
        });
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
});

//Window actions

//Quit Window
ipcMain.on('quit', () => {
    if (process.platform !== 'darwin') {
        win.close();
        app.quit();
    }
});

//Minimize Window
ipcMain.on('minimize', () => {
    win.minimize();
});

//Maximize Window
ipcMain.on('maximize', () => {
    win.maximize();
});


//Handle saved document
db.createLocalDB();