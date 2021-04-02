
import endDraw from './endDraw.js'
import moveRed from './moveRed.js'
import drawInfo from './drawInfo.js'
import randomPos from './randomPos.js'
import drawEnemy from './drawEnemy.js'
import drawItem from './drawItem.js'


canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas2.width = window.innerWidth
canvas2.height = window.innerHeight
canvas3.width = window.innerWidth
canvas3.height = window.innerHeight

window.addEventListener('resize', async () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvas2.width = window.innerWidth
    canvas2.height = window.innerHeight
    canvas3.width = window.innerWidth
    canvas3.height = window.innerHeight
    if (endCheck) {
        drawInfo()
        new endDraw(handleMove, handleStart, startGame)
    }
})

window.addEventListener("touchmove", handleMove, false);
window.addEventListener("touchstart", handleStart, false);

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
    if (slowCheck) slowTime += 50
    if (slowTime > 13000) {
        slowTime = 13000;
        slowCheck = false
    }

    if (speedCheck) {
        speedTime += 50
        if (!bgInterval)
            bgInterval = setInterval(() => {
                if (document.body.style.background == "rgb(255, 202, 236)")
                    document.body.style.background = "rgba(255, 90, 90,.5)"
                else
                    document.body.style.background = "rgb(255, 202, 236)"
            }, 200);
    }
    if (speedTime > 13000) {
        clearInterval(bgInterval)
        bgInterval = false
        document.body.style.background = "rgb(255, 202, 236)"
        speedTime = 13000;
        speedCheck = false
        mainSpeed = 5
    }

    if (cnt >= 1250 && cnt % 1250 == 0 && cnt < 10001) {
        if (checkMobile)
            speed = speed < 3 ? speed + 1 : speed
        else
            speed = speed < 5 ? speed + 1 : speed
        unit -= 5
    }

    endCheck = false
    cnt += 5

    if (cnt % unit == 0) {
        let pos = new randomPos()
        animation2.push(requestAnimationFrame(() => {
            ctx3.fillStyle = "#368AFF"
            drawEnemy(pos.x2, pos.y2, pos.X_Sum, pos.Y_Sum, animation2.length, handleMove, handleStart, startGame)
        }))
    }



    animation = requestAnimationFrame(startGame)

    if (cnt % 1000 == 0 && itemUnit < 3) {
        let pos = new randomPos()
        itemUnit++
        ctx.fillStyle = "black"
        if (pos.y2 >= canvas.height - 20) pos.y2 -= 120
        if (pos.x2 >= canvas.width - 20) pos.x2 -= 120
        if (pos.y2 <= 20) pos.y2 += 120
        if (pos.x2 <= 20) pos.x2 += 120

        let random = Math.floor(Math.random() * 3 + 1)
        if (itemRandom[random - 1] == "shield")
            shieldAni.push(requestAnimationFrame(() => {
                drawItem(pos.x2, pos.y2, pos.X_Sum, pos.Y_Sum, shieldAni.length, itemRandom[random - 1], shieldIcon)
            }))
        else if (itemRandom[random - 1] == "speed")
            speedAni.push(requestAnimationFrame(() => {
                drawItem(pos.x2, pos.y2, pos.X_Sum, pos.Y_Sum, speedAni.length, itemRandom[random - 1], speedIcon)
            }))
        else
            slowAni.push(requestAnimationFrame(() => {
                drawItem(pos.x2, pos.y2, pos.X_Sum, pos.Y_Sum, slowAni.length, itemRandom[random - 1], slowIcon)
            }))
    }


    ctx.fillStyle = "#FF4848"
    await ctx.clearRect(0,0,canvas.width,canvas.height);
    moveRed()

    if (shieldCheck) {
        // await ctx.save();
        // ctx.globalCompositeOperation = 'destination-out';
        // await ctx.beginPath();
        // await ctx.arc(x + 10, y + 10, 80, 0, 2 * Math.PI);
        // await ctx.fill();
        // await ctx.restore();
        await ctx.beginPath();
        await ctx.arc(x + 10, y + 10, 60, 0, 2 * Math.PI);
        ctx.lineWidth = 5;
        await ctx.stroke();
    } 
    await ctx.fillRect(x, y, 20, 20)
    drawInfo()
}

ctx.fillRect(x, y, 20, 20)

animation = requestAnimationFrame(startGame)
