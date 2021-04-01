
import endDraw from './endDraw.js'
import moveRed from './moveRed.js'
import drawInfo from './drawInfo.js'
import makeEnemy from './makeEnemy.js'

canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas2.width = window.innerWidth
canvas2.height = window.innerHeight

window.addEventListener('resize', async () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvas2.width = window.innerWidth
    canvas2.height = window.innerHeight
    if (endCheck) {
        drawInfo()
        new endDraw(handleMove, handleStart, startGame)
    }
})

canvas2.addEventListener("touchmove", handleMove, false);
canvas2.addEventListener("touchstart", handleStart, false);

function handleStart(evt) {
    evt.preventDefault()
    try {
        let touches = evt.changedTouches
        beforeTouchX = touches[0].clientX
        beforeTouchY = touches[0].clientY
    } catch (error) {
        alert(error)
    }
}
function handleMove(evt) {
    evt.preventDefault()
    try {
        let touches = evt.changedTouches
        let touchX = touches[0].clientX
        let touchY = touches[0].clientY

        ctx.clearRect(x - 1, y - 1, 22, 22)
        x += touchX - beforeTouchX
        y += touchY - beforeTouchY
        beforeTouchX = touchX
        beforeTouchY = touchY
    } catch (error) {
        alert(error)
    }
}

onkeydown = (e) => {
    let key = e.keyCode
    switch (key) {
        case 37:
            left = true
            break;
        case 38:
            up = true
            break;
        case 39:
            right = true
            break;
        case 40:
            down = true
            break;
        default:
            break;
    }
}

onkeyup = (e) => {
    let key = e.keyCode
    switch (key) {
        case 37:
            left = false
            break;
        case 38:
            up = false
            break;
        case 39:
            right = false
            break;
        case 40:
            down = false
            break;
        default:
            break;
    }
}

const startGame = async () => {
    if (cnt >= 1250 && cnt % 1250 == 0 && cnt < 10001) {
        if (navigator.userAgent.indexOf("Mobile"))
            speed = speed < 3 ? speed + 1 : speed
        else
            speed = speed < 5 ? speed + 1 : speed
        unit -= 5
        console.log('speed up!')
    }
    endCheck = false
    cnt += 5
    ctx.fillStyle = "#FF4848"
    await ctx.clearRect(x - 1, y - 1, 22, 22)

    moveRed()

    await ctx.fillRect(x, y, 20, 20)


    if (cnt % unit == 0) makeEnemy(handleMove,handleStart,startGame)

    animation = requestAnimationFrame(startGame)

    drawInfo()
}

ctx.fillRect(x, y, 20, 20)

animation = requestAnimationFrame(startGame)
