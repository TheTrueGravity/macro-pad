import { app, BrowserWindow } from 'electron'
import { join } from 'path'

if (require('electron-squirrel-startup')) {
    app.quit()
}

async function main() {
    const window = new BrowserWindow({
        width: 800, height: 600,
        autoHideMenuBar: true,
        webPreferences: { nativeWindowOpen: true }
    })

    window.loadFile(join(__dirname, '../app/index.html'))
}

app.on('ready', main)
app.on('window-all-closed', () => { if (process.platform !== 'darwin') { app.quit() } })
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) { main() } })