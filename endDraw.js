export default class endDraw {
    constructor(handleMove, handleStart, startGame) {
        this.handleMove = handleMove
        this.handleStart = handleStart
        this.startGame = startGame
        this.draw()
    }

    async draw() {
        endCheck = true
        cancelAnimationFrame(animation)
        shieldAni.forEach(i=>{
            cancelAnimationFrame(i)
        })
        speedAni.forEach(i=>{
            cancelAnimationFrame(i)
        })
        canvas2.removeEventListener('touchmove', this.handleMove)
        canvas2.removeEventListener('touchstart', this.handleStart)
        ctx2.font = `60px Arial`
        ctx2.textAlign = "center"
        ctx2.fillStyle = "black"
        await ctx2.fillText("GAMEOVER", canvas2.width / 2, canvas2.height / 2)
        ctx2.font = `30px Arial`
        await ctx2.fillText("다시하기", canvas2.width / 2, canvas2.height / 2 + 70,)
        canvas2.onclick = (e) => this.onclick(e)
        canvas2.onmousemove = (e) => this.onMove(e)
    }
    onclick(e) {
        let mouseX = e.offsetX
        let mouseY = e.offsetY
        if ((mouseX > canvas2.width / 2 - 70 && mouseX < canvas2.width / 2 + 70) && (mouseY > canvas2.height / 2 + 40 && mouseY < canvas2.height / 2 + 80)) {
            canvas2.addEventListener("touchmove", this.handleMove);
            canvas2.addEventListener("touchstart", this.handleStart);
            cnt = 0
            speed = 3
            unit = 50
            mainSpeed = 5
            speedCheck = false
            shieldCheck = false
            speedTime = 13000
            shieldTime = 13000
            itemUnit = 0
            ctx2.clearRect(0, 0, canvas2.width, canvas2.height)
            ctx.clearRect(0, 0, canvas2.width, canvas2.height)
            x = canvas2.width / 2;
            y = canvas2.height / 2;
            animation = requestAnimationFrame(this.startGame)
            canvas2.style.cursor = "unset"
            canvas2.onmousemove = ''
        }
    }

    onMove(e) {
        let mouseX = e.offsetX
        let mouseY = e.offsetY
        if ((mouseX > canvas2.width / 2 - 70 && mouseX < canvas2.width / 2 + 70) && (mouseY > canvas2.height / 2 + 40 && mouseY < canvas2.height / 2 + 80))
            canvas2.style.cursor = "pointer"
        else
            canvas2.style.cursor = "unset"

    }
}