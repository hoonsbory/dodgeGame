
import endDraw from './endDraw.js'
import drawEnemy from './drawEnemy.js'



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


    if (cnt % unit == 0) makePositionAndEnemy()

    animation = requestAnimationFrame(startGame)

    drawInfo()
}

ctx.fillRect(x, y, 20, 20)

animation = requestAnimationFrame(startGame)





const moveRed = () => {
    if (left) {
        if (up) {
            x -= 5
            y -= 5
        }
        else if (down) {
            x -= 5
            y += 5
        }
        else x -= 5
    }
    else if (right) {
        if (up) {
            x += 5
            y -= 5
        }
        else if (down) {
            x += 5
            y += 5
        }
        else x += 5
    }
    else if (down) y += 5
    else if (up) y -= 5
}

const makePositionAndEnemy = () => {
    let x2
    let y2
    let X_Random = Math.random() * canvas.width + 1
    let Y_Random = Math.random() * canvas.height + 1
    let X_Sum = Math.random() * speed + 1
    let Y_Sum = Math.random() * speed + 1
    let plusMinusRandom = Math.floor(Math.random() * 2 + 1)
    let positionRandom = Math.floor(Math.random() * 4)


    switch (enemyPosition[positionRandom]) {
        case 'left':
            if (plusMinus[plusMinusRandom] == 'minus') Y_Sum = -(Y_Sum)
            y2 = Y_Random
            x2 = 0;
            break;
        case 'right':
            X_Sum = -(X_Sum)
            if (plusMinus[plusMinusRandom] == 'minus') Y_Sum = -(Y_Sum)
            y2 = Y_Random
            x2 = canvas.width;
            break;
        case 'top':
            if (plusMinus[plusMinusRandom] == 'minus') X_Sum = -(X_Sum)
            x2 = X_Random
            y2 = 0
            break;
        case 'bottom':
            if (plusMinus[plusMinusRandom] == 'minus') X_Sum = -(X_Sum)
            Y_Sum = -(Y_Sum)
            x2 = X_Random
            y2 = canvas.height
            break;

        default:
            break;
    }
    animation2.push(requestAnimationFrame(() => {
        ctx.fillStyle = "#368AFF"
        drawEnemy(x2, y2, X_Sum, Y_Sum, animation2.length,handleMove,handleStart,startGame)
    }))
}

const drawInfo = () => {
    ctx2.clearRect(0, 0, canvas.width, canvas.height)
    ctx2.font = 'bold 16px Arial'
    ctx2.textAlign = "center"
    ctx2.fillText(`점수 : ${cnt}`, 100, 30)
    ctx2.fillText('made by 비트주세요', canvas.width / 2, canvas.height - 15)
}