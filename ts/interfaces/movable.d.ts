export default interface Movable {
    x: number
    y: number
    width: number
    height: number
    speed: number
    angle: number
    trailLength: number
    trailOpacity: number
    previousPositions: {x: number, y: number}[]
    move(): void
    turn(): void
    stop(): void
}
