const { app, BrowserWindow } = require('electron')
const { join } = require('path')

if (require('electron-squirrel-startup')) { app.quit() }

async function main() {
    const window = new BrowserWindow({
        width: 1280,
        height: 720,
        frame: false,
        backgroundColor: '#FFF',
        webPreferences: {
            nodeIntegration: true
        }
    })

    window.setMenuBarVisibility(false)
    await window.loadFile(join(__dirname, './app/index.html'))

    window.webContents.openDevTools()
}

app.on('ready', main)
app.on('window-all-closed', () => { if (process.platform !== 'darwin') { app.quit() } })
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) { main() } })