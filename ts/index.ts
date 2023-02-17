import Canvas from "./classes/canvas.js"
import Pegasus, {Pegasi} from "./classes/pegasus.js"
import Background from "./classes/background.js"
import Game from "./classes/Game.js";

customElements.define('awesome-canvas', Canvas, { extends: 'canvas' })

const start = document.getElementById('startButton')
start.addEventListener('click', () => {
    let players = []
    for (let i = 1; i < 5; i++) {
        const t1 = document.getElementById(`p${i}t1`) as HTMLInputElement
        const t2 = document.getElementById(`p${i}t2`) as HTMLInputElement
        const c = document.getElementById(`p${i}c`) as HTMLInputElement
        if (c.checked) {
            if(t1.value == '' || t2.value == '') {
                alert('Podaj sterowanie dla gracza ' + i)
                return
            }
            if(t1.value == t2.value) {
                alert('Podaj inne sterowanie dla gracza ' + i)
                return
            }
            players.push({left: t1.value, right: t2.value})
        }
    }
    Game(players)
})
