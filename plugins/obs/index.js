const ObsWebSocket = require('obs-websocket-js')

const obs = new ObsWebSocket()

module.exports.init = () => {
    scenes = []
    await obs.connect({
        address: process.env.OBS_ADDRESS,
        password: process.env.OBS_PASSWORD
    })
    const data = await obs.send('GetSceneList')
    await data.scenes.forEach(scene => {
        scenes[scenes.length] = scene
    })
}

module.exports.settings = 

if (msg[0] == 144 && msg[1] == 0) {
    try {
        await obs.send('SetPreviewScene', {
            'scene-name': scenes[0].name
        })
        await apcOut.sendMessage([0x90, 0x00, 0x01])
    } catch {
        setObsError[msg[1]] = true
        await apcOut.sendMessage([0x90, msg[1], 0x04])
        await new Promise(r => setTimeout(r, 2000))
        await apcOut.sendMessage([0x90, msg[1], 0x05])
        setObsError[msg[1]] = false
    }
} else if (msg[0] == 128 && msg[1] == 0) {
    if (!setObsError[msg[1]]) {
        await apcOut.sendMessage([0x90, msg[1], 0x05])
    }
}
if (msg[0] == 144 && msg[1] == 3) {
    try { await obs.send('TransitionToProgram', {}) }
    catch {
        try {
            await ConnectToOBS()
            await apcOut.sendMessage([0x90, 0x03, 0x01])
        } catch {
            setObsError[msg[1]] = true
            await apcOut.sendMessage([0x90, msg[1], 0x04])
            await new Promise(r => setTimeout(r, 2000))
            await apcOut.sendMessage([0x90, msg[1], 0x05])
            setObsError[msg[1]] = false
        }
    }
} else if (msg[0] == 128 && msg[1] == 3) {
    if (!setObsError[msg[1]]) {
        await apcOut.sendMessage([0x90, msg[1], 0x05])
    }
}