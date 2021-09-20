const controllerList = document.getElementById('controller-list')

class Controller {
    constructor(name, imgUrl) {
        this.name = name
        this.imgUrl = imgUrl

        this.div = document.createElement('div')
        this.div.className = "controller"

        const _img = document.createElement('img')
        _img.className = 'controller-image'
        _img.src = this.imgUrl

        const _name = document.createElement('p')
        _name.className = 'controller-name'
        _name.innerHTML = this.name

        this.div.appendChild(_img)
        this.div.appendChild(_name)
    }
}

function createController(name, imgUrl) {
    const controller = new Controller(name, imgUrl)
    controllerList.appendChild(controller.div)
    return controller
}

document.getElementById('create-controller').onclick = () => {
    createController("Akai APC Mini", "https://th.bing.com/th/id/OIP.q7-RQusilRFZc5aXxarNVQAAAA?pid=ImgDet&rs=1&adlt=strict")
}

const inputs = {}
const outputs = {}

async function midi() {
    const MIDI = await navigator.requestMIDIAccess()

    const _inputs = MIDI.inputs
    const _outputs = MIDI.outputs

    for (var input of _inputs.values()) {
        inputs[input.name] = input

        if (input.name == "APC MINI") {
            input.onmidimessage = console.log
        }
    }
    for (var output of _outputs.values()) {
        outputs[output.name] = output
    }

    console.log(inputs, outputs)
}

midi()