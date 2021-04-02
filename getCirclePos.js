export default class getCirclePos {
    pos = []
    circleX = x + 10
    circleY = y + 10
    constructor(radius) {
        this.radius = radius
        return this.getPos()
    }
    getPos() {
        for (let i = 0; i <= 180; i += 6) {
            let x = Math.cos(this.degreesToRadian(i)) * 60 + this.circleX
            let y = Math.sin(this.degreesToRadian(i)) * 60 + this.circleY
            this.pos.push([x, y])
        }
        for (let i = -6; i > -180; i -= 6) {
            let x = Math.cos(this.degreesToRadian(i)) * 60 + this.circleX
            let y = Math.sin(this.degreesToRadian(i)) * 60 + this.circleY
            this.pos.push([x, y])
        }
        return this.pos
    }
    degreesToRadian(degrees) {
        return degrees * (Math.PI / 180)
    }
}