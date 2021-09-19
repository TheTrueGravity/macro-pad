const { app, BrowserWindow } = require('electron')
const { join } = require('path')

if (require('electron-squirrel-startup')) { app.quit() }

require('@electron/remote/main').initialize()

async function main() {
    const window = new BrowserWindow({
        width: 1280, height: 720,
        minWidth: 1300, minHeight: 600,
        frame: false, backgroundColor: '#FFF',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    })

    await window.loadFile(join(__dirname, './app/index.html'))

    // window.webContents.openDevTools()

    window.on('close', (event) => {
        event.preventDefault()

        const width  = window.getSize()[0]
        const height = window.getSize()[1]

        console.log(width, height)

        window.destroy()
    })
}

app.on('ready', main)
app.on('window-all-closed', () => { if (process.platform !== 'darwin') { app.quit() } })
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) { main() } })