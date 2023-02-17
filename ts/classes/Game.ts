import Canvas from "./canvas.js";
import Background from "./background.js";
import Pegasus, {Pegasi} from "./pegasus.js";

export let laps = 0
export const addLap = () => laps++

export default function Game (players: {left: string, right: string}[]) {
        const canvas = document.createElement('canvas', { is: 'awesome-canvas' }) as Canvas
    document.body.appendChild(canvas)

    let pegasi = []
    players.forEach((player, i) => {
        pegasi.push(new Pegasus(Pegasi.dash, i, canvas, {x: window.innerWidth / 2, y: window.innerHeight / 4 * (3 + i * 0.1)}, player))
    })
    console.log(pegasi)

    const map = new Background(canvas)

    laps = 0
    const lapscounter = document.createElement('div')
    lapscounter.style.position = 'absolute'
    lapscounter.style.zIndex = '100'
    lapscounter.style.top = '0'
    lapscounter.style.left = '0'
    lapscounter.style.color = 'white'
    lapscounter.style.fontSize = '50px'
    lapscounter.innerText = '0/2'
    document.body.appendChild(lapscounter)

    const animate = () => {
        canvas.clear()
        map.draw()
        pegasi.forEach(pegasus => pegasus.move())
        if (pegasi.map(pegasus => pegasus.alive).length <=1) {
            console.log('koniec')
            alert("Koniec gry. Wygrał gracz " + pegasi.findIndex(pegasus => pegasus.alive))
        }
        lapscounter.innerText = `${laps}/2`
        requestAnimationFrame(animate)
    }

    animate()
}
