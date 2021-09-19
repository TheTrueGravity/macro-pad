const controllerList = document.getElementById('controller-list')

class Controller {
    constructor(name) {
        this.div = document.createElement('div')
        this.div.className = "controller"

        this.name = name
    }
}

function createController(name) {
    const controller = new Controller(name)
    controllerList.appendChild(controller.div)
    return controller
}

document.getElementById('create-controller').onclick = () => {
    console.log(createController("Test"))
}
