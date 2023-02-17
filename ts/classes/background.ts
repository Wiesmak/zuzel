import CanvasElement from "./canvas-element.js"
import Canvas from "./canvas.js"

export default class Background extends CanvasElement {
    constructor(canvas: Canvas) {
        super(canvas)
    }

    draw() {
        const width = window.innerWidth
        const height = window.innerHeight
        const canvas = this.canvas.context.canvas
        canvas.width = width
        canvas.height = height

        const scaleFactor = Math.min(width / 1000, height / 500)
        this.canvas.context.scale(scaleFactor, scaleFactor)

        this.canvas.context.fillStyle = '#6d8f8e'
        this.canvas.context.beginPath()
        this.canvas.context.moveTo(500, 450)
        this.canvas.context.lineTo(250, 450)
        this.canvas.context.arcTo(50, 450, 50, 250, 200)
        this.canvas.context.arcTo(50, 50, 250, 50, 200)
        this.canvas.context.lineTo(750, 50)
        this.canvas.context.arcTo(950, 50, 950, 250, 200)
        this.canvas.context.arcTo(950, 450, 750, 450, 200)
        this.canvas.context.lineTo(500, 450)
        this.canvas.context.fill()

        this.canvas.context.fillStyle = '#345c22'
        this.canvas.context.strokeStyle = 'white'
        this.canvas.context.beginPath()
        this.canvas.context.moveTo(500, 350)
        this.canvas.context.lineTo(250, 350)
        this.canvas.context.arcTo(150, 350, 150, 150, 100)
        this.canvas.context.arcTo(150, 150, 250, 150, 100)
        this.canvas.context.lineTo(750, 150)
        this.canvas.context.arcTo(850, 150, 850, 350, 100)
        this.canvas.context.arcTo(850, 350, 750, 350, 100)
        this.canvas.context.lineTo(500, 350)
        this.canvas.context.fill()

        this.canvas.context.strokeStyle = '#BC1D75'
        this.canvas.context.beginPath()
        this.canvas.context.moveTo(500, 450)
        this.canvas.context.lineTo(500, 350)
        this.canvas.context.stroke()

        // Reset the canvas scale to 1 so that future drawing won't be affected.
        this.canvas.context.setTransform(1, 0, 0, 1, 0, 0)

        const source = '/res/cutie.svg'
        const img = new Image()
        img.src = source
        this.canvas.context.drawImage(img, width / 2 - 100, height / 2 - 100, 180, 180)
    }
}
