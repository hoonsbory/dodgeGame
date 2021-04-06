export default class getCirclePos {
    pos = []
    constructor(radius,x,y) {
        this.circleX = x + 10
        this.circleY = y + 10
        this.radius = radius
        return this.getPos()
    }
    //원의 둘레 좌표 구하기. 느슨하게 6도로 설정
    getPos() {
        for (let i = 0; i <= 180; i += 6) {
            let x = Math.cos(this.degreesToRadian(i)) * this.radius + this.circleX
            let y = Math.sin(this.degreesToRadian(i)) * this.radius + this.circleY
            this.pos.push([x, y])
        }
        for (let i = -6; i > -180; i -= 6) {
            let x = Math.cos(this.degreesToRadian(i)) * this.radius + this.circleX
            let y = Math.sin(this.degreesToRadian(i)) * this.radius + this.circleY
            this.pos.push([x, y])
        }
        return this.pos
    }
    degreesToRadian(degrees) { //각도를 라디안으로 
        return degrees * (Math.PI / 180)
    }
}