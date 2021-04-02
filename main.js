
import endDraw from './endDraw.js'
import moveRed from './moveRed.js'
import drawInfo from './drawInfo.js'
import randomPos from './randomPos.js'
import drawEnemy from './drawEnemy.js'
import drawShield from './drawShield.js'
import drawSpeed from './drawSpeed.js'


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
    if (shieldCheck) shieldTime += 50
    if (shieldTime > 13000) {
        shieldTime = 13000;
        shieldCheck = false
        await ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        await ctx.beginPath();
        await ctx.arc(x + 10, y + 10, 64, 0, 2 * Math.PI, false);
        await ctx.fill();
        await ctx.restore();
    }

    if (speedCheck) speedTime += 50
    if (speedTime > 13000) {
        speedTime = 13000;
        speedCheck = false
        mainSpeed = 5
    }

    if (cnt >= 1250 && cnt % 1250 == 0 && cnt < 10001) {
        if (navigator.userAgent.indexOf("Mobile"))
            speed = speed < 3 ? speed + 1 : speed
        else
            speed = speed < 5 ? speed + 1 : speed
        unit -= 5
    }
    endCheck = false
    cnt += 5
    ctx.fillStyle = "#FF4848"
    if (shieldCheck) {
        await ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        await ctx.beginPath();
        await ctx.arc(x + 10, y + 10, 64, 0, 2 * Math.PI, false);
        await ctx.fill();
        await ctx.restore();
        moveRed()
        await ctx.beginPath();
        await ctx.arc(x + 10, y + 10, 60, 0, 2 * Math.PI);
        ctx.lineWidth = 5;
        await ctx.stroke();
    } else {
        await ctx.clearRect(x - 1, y - 1, 22, 22);
        moveRed()
    }

    await ctx.fillRect(x, y, 20, 20)


    if (cnt % unit == 0) {
        let pos = new randomPos()
        animation2.push(requestAnimationFrame(() => {
            ctx.fillStyle = "#368AFF"
            drawEnemy(pos.x2, pos.y2, pos.X_Sum, pos.Y_Sum, animation2.length, handleMove, handleStart, startGame)
        }))
    }



    animation = requestAnimationFrame(startGame)

    if (cnt % 1000 == 0 && itemUnit < 2) {
        let pos = new randomPos()
        itemUnit++
        ctx.fillStyle = "black"
        if (pos.y2 >= canvas.height) pos.y2 -= 120
        if (pos.x2 >= canvas.width) pos.x2 -= 120
        if (pos.y2 <= 10) pos.y2 += 120
        if (pos.x2 <= 0) pos.x2 += 120
        let random = Math.floor(Math.random() * 2 + 1)
        if (itemRandom[random - 1] == "shield")
            shieldAni.push(requestAnimationFrame(() => {
                drawShield(pos.x2, pos.y2, pos.X_Sum, pos.Y_Sum, shieldAni.length)
            }))
        else
            speedAni.push(requestAnimationFrame(() => {
                drawSpeed(pos.x2, pos.y2, pos.X_Sum, pos.Y_Sum, speedAni.length)
            }))
    }

    drawInfo()
}

ctx.fillRect(x, y, 20, 20)

animation = requestAnimationFrame(startGame)
