import Canvas from "./canvas.js";
import Background from "./background.js";
import Pegasus, {Pegasi} from "./pegasus.js";

export default function Game (players: {left: string, right: string}[]) {
        const canvas = document.createElement('canvas', { is: 'awesome-canvas' }) as Canvas
    document.body.appendChild(canvas)

    let pegasi = []
    players.forEach((player, i) => {
        pegasi.push(new Pegasus(Pegasi.dash, i, canvas, {x: window.innerWidth / 2, y: window.innerHeight / 4 * (3 + i * 0.1)}, player))
    })
    console.log(pegasi)

    const map = new Background(canvas)

    const animate = () => {
        canvas.clear()
        map.draw()
        pegasi.forEach(pegasus => pegasus.move())
        if (pegasi.map(pegasus => pegasus.alive).length <=1) {
            alert("Koniec gry. Wygrał gracz " + pegasi.findIndex(pegasus => pegasus.alive))
        }
        requestAnimationFrame(animate)
    }

    animate()
}
