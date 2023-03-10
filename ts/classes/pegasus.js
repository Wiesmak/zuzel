var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import CanvasElement from "./canvas-element.js";
import { KeyboardEvent } from "./Keyboard.js";
import { Turn } from "./Transformations.js";
import { addLap } from "./Game.js";
export var Pegasi;
(function (Pegasi) {
    Pegasi["dash"] = "dash";
    Pegasi["shy"] = "shy";
    Pegasi["soarin"] = "soarin";
    Pegasi["twilight"] = "twilight";
})(Pegasi || (Pegasi = {}));
export default class Pegasus extends CanvasElement {
    pegasus;
    x;
    y;
    bindings;
    speed;
    angle = 0;
    trailLength = 200;
    colors;
    trailOpacity;
    previousPositions = [];
    width = 30;
    height = 30;
    laps = 0;
    colides = true;
    id;
    alive = true;
    constructor(pegasus, id, canvas, position, bindings, speed) {
        super(canvas);
        this.id = id;
        this.pegasus = pegasus;
        this.x = position.x;
        this.y = position.y;
        this.bindings = bindings;
        this.speed = speed || 3;
        this.turn();
        this.colors = this.color;
        this.previousPositions = [];
    }
    colisionTimeout() {
        this.colides = false;
        setTimeout(() => {
            this.colides = true;
        }, 1000);
    }
    get color() {
        switch (this.pegasus) {
            case Pegasi.dash:
                return [
                    [99, 46, 134],
                    [95, 187, 78],
                    [250, 245, 171],
                    [239, 113, 53],
                    [236, 65, 65],
                    [27, 152, 209]
                ];
            case Pegasi.shy:
                return [
                    [99, 46, 134],
                    [95, 187, 78],
                    [250, 245, 171],
                    [239, 113, 53],
                    [236, 65, 65],
                    [27, 152, 209]
                ];
            case Pegasi.soarin:
                return [
                    [99, 46, 134],
                    [95, 187, 78],
                    [250, 245, 171],
                    [239, 113, 53],
                    [236, 65, 65],
                    [27, 152, 209]
                ];
            case Pegasi.twilight:
                return [
                    [99, 46, 134],
                    [95, 187, 78],
                    [250, 245, 171],
                    [239, 113, 53],
                    [236, 65, 65],
                    [27, 152, 209]
                ];
        }
    }
    draw() {
        this.previousPositions ||= [];
        this.colors ||= [[]];
        for (let i = 0; i < this.colors.length; i++) {
            const color = this.colors[i];
            this.canvas.context.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`;
            this.previousPositions.forEach((position, index) => {
                const width = 50 * (index / 200) / 3;
                const height = 50 * (index / 200) / 3;
                const sliceHeight = height / this.colors.length;
                this.canvas.context.fillRect(position.x + 5 - width / 2, position.y + 5 - height / 2 + sliceHeight * i, width, sliceHeight);
            });
            this.canvas.context.stroke();
        }
        this.canvas.context.save();
        this.canvas.context.translate(this.x, this.y);
        this.canvas.context.rotate(this.angle + Math.PI);
        this.canvas.context.translate(-this.width, -this.height);
        const source = `/res/${this.pegasus}.svg`;
        const img = new Image();
        img.src = source;
        this.canvas.context.drawImage(img, 0, 0, this.width * 2, this.height * 2);
        this.canvas.context.restore();
    }
    move() {
        this.previousPositions.push({ x: this.x, y: this.y });
        if (this.previousPositions.length > this.trailLength)
            this.previousPositions.shift();
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.draw();
        this.checkCollision();
    }
    checkCollision() {
        const ratioX = window.innerWidth / 1000;
        const ratioY = window.innerHeight / 500;
        if (this.x < 50 * ratioX || this.x > 950 * ratioX || this.y < 50 * ratioY || this.y > 450 * ratioY) {
            this.stop();
            this.alive = false;
        }
        if (this.x > 250 * ratioX && this.x < 750 * ratioX && this.y > 150 * ratioY && this.y < 350 * ratioY) {
            this.stop();
            this.alive = false;
        }
        if (this.x > ratioX * 750) {
            if (((this.x - 750 * ratioY) ** 2) + ((this.y - 250 * ratioY) ** 2) > (200 * ratioY) ** 2) {
                this.stop();
                this.alive = false;
            }
        }
        if (this.x < ratioX * 250) {
            if (((this.x - 250 * ratioY) ** 2) + ((this.y - 250 * ratioY) ** 2) > (200 * ratioX) ** 2) {
                this.stop();
                this.alive = false;
            }
        }
        if (this.x > 750 * ratioX) {
            if (Math.pow(this.x - 750 * ratioX, 2) + Math.pow(this.y - 250 * ratioY, 2) < Math.pow(100 * ratioY, 2)) {
                this.stop();
                this.alive = false;
            }
        }
        if (this.x < 250 * ratioX) {
            if (Math.pow(this.x - 250 * ratioX, 2) + Math.pow(this.y - 250 * ratioY, 2) < Math.pow(100 * ratioY, 2)) {
                this.stop();
                this.alive = false;
            }
        }
        if (this.colides && this.y > 350 * ratioY && this.x > 480 * ratioX && this.x < 490 * ratioX) {
            console.log('hit');
            console.log(this.laps);
            switch (this.laps) {
                case 0:
                    this.laps++;
                    this.colisionTimeout();
                    addLap();
                    break;
                case 1:
                    this.stop();
                    addLap();
                    alert(`Wygra?? gracz ${this.id}`);
            }
        }
    }
    stop() {
        console.log('stop');
        this.speed = 0;
    }
    turn() {
        return this.bindings;
    }
}
__decorate([
    KeyboardEvent('keydown'),
    Turn
], Pegasus.prototype, "turn", null);
//# sourceMappingURL=pegasus.js.map