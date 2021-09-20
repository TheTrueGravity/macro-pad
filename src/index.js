const { readdirSync, readFileSync } = require('fs')
const { app, BrowserWindow } = require('electron')
const { promisify } = require('util')
const { join } = require('path')

const exec = promisify(require('child_process').exec)

if (require('electron-squirrel-startup')) { app.quit() }

require('@electron/remote/main').initialize()

async function loadPlugins() {
    for (const plugin of readdirSync('./plugins')) {
        try {
            const pluginFiles = readdirSync(`.\\plugins\\${plugin}`)
            const pluginSettings = JSON.parse(readFileSync(`.\\plugins\\${plugin}\\plugin.json`))
            const _plugin = await require(`.\\plugins\\${plugin}\\index`)
    
            await pluginSettings.dependancies.forEach(async dependancy => { await exec(`npm install ${dependancy}`) })

            const init = _plugin()

            // console.log(init)
            
            if (!init) { throw new Error(`Error initialising plugin "${pluginSettings.name}"!`) }

            // console.log(_plugin)
        } catch {}
    }
}

async function main() {
    const plugins = await loadPlugins()

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

    // window.on('close', (event) => {
    //     event.preventDefault()

    //     const width  = window.getSize()[0]
    //     const height = window.getSize()[1]

    //     console.log(width, height)

    //     window.destroy()
    // })
}

app.on('ready', main)
app.on('window-all-closed', () => { if (process.platform !== 'darwin') { app.quit() } })
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) { main() } })