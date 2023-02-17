export default class Canvas extends HTMLCanvasElement {
    context;
    constructor() {
        super();
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.style.position = 'absolute';
        this.style.top = '0';
        this.style.left = '0';
        this.style.zIndex = '9';
        this.style.pointerEvents = 'none';
        this.style.backgroundColor = '#77c825';
        this.context = this.getContext('2d');
        this.context.fillStyle = 'black';
        this.context.fill();
        window.addEventListener('resize', this.resize.bind(this));
        console.log('Canvas created');
    }
    resize = () => {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    };
    add = (element) => {
        element.draw();
    };
    clear = () => {
        this.context.clearRect(0, 0, this.width, this.height);
    };
}
//# sourceMappingURL=canvas.js.map