import Canvas from "./canvas.js"
import Drawable from "../interfaces/drawable"

export default abstract class CanvasElement implements Drawable {
    constructor(protected canvas: Canvas) {
        this.canvas = canvas
        this.canvas.add(this)
    }

    abstract draw(): void
}
