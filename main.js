
let canvas = document.getElementById("canvas")
let canvas2 = document.getElementById("canvas2")
let ctx2 = canvas2.getContext('2d')
let ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas2.width = window.innerWidth
canvas2.height = window.innerHeight

let x = canvas.width / 2;
let y = canvas.height / 2;
let left;
let right;
let up;
let down;
let animation2

let plusMinus = ['plus', 'minus']
let enemyPosition = ['left', 'right', 'top', 'bottom']



let set = new Set()
ctx.fillRect(x, y, 20, 20)

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


let cnt = 0;
let speed = 3;
let unit = 50;

const startGame = async () => {
    if (cnt >= 5000 && cnt % 5000 == 0 && cnt < 20001) {
        speed++
        unit -= 5
        console.log('speed up!')
    }
    cnt += 10
    ctx.fillStyle = "red"
    await ctx.clearRect(x - 1, y - 1, 22, 22)
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



    await ctx.fillRect(x, y, 20, 20)
    if (cnt % unit == 0) {
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

        animation2 = requestAnimationFrame(() => {
            ctx.fillStyle = "blue"
            drawEnemy(x2, y2, X_Sum, Y_Sum)
        })
    }

    animation = requestAnimationFrame(startGame)

    ctx2.clearRect(0, 0, canvas.width, canvas.height)
    ctx2.font = 'bold 16px Arial'
    ctx2.textAlign = "center"
    ctx2.fillText(`점수 : ${cnt}`, 100, 50)
    ctx2.fillText('made by 비트주세요', canvas.width / 2, canvas.height - 15)
}
var animation = requestAnimationFrame(startGame)




const drawEnemy = async (x2, y2, X_Sum, Y_Sum) => {
    ctx.fillStyle = "blue"

    await ctx.fillRect(x2, y2, 10, 10)
    await ctx.clearRect(x2 - 1, y2 - 1, 12, 12)
    x2 += X_Sum
    y2 += Y_Sum
    await ctx.fillRect(x2, y2, 10, 10)
    if ((x + 20 >= x2 && x - 10 <= x2) && (y2 <= y + 20 && y2 >= y - 10)) {
        cancelAnimationFrame(animation)
        cancelAnimationFrame(animation2)
        await ctx.clearRect(0, 0, canvas.width, canvas.height)

        let long = window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth
        ctx2.font = `${long / 30}pt Arial`
        ctx2.textAlign = "center"
        ctx2.fillStyle = "black"
        await ctx2.fillText("GAMEOVER", canvas.width / 2, canvas.height / 2)
        ctx2.font = `${long / 50}px Arial`
        await ctx2.fillText("다시하기", canvas.width / 2, canvas.height / 2 + 70,)
        canvas2.onclick = (e) => {
            let mouseX = e.offsetX
            let mouseY = e.offsetY
            if ((mouseX > canvas.width / 2 - 90 && mouseX < canvas.width / 2 + canvas.width / 25) && (mouseY > canvas.height / 2 + 40 && mouseY < canvas.height / 2 + 80)) {
                cnt = 0
                speed = 3
                unit = 50
                ctx2.clearRect(0, 0, canvas.width, canvas.height)
                x = canvas.width / 2;
                y = canvas.height / 2;
                animation = requestAnimationFrame(startGame)
                canvas2.style.cursor = "unset"
                canvas2.onmousemove = ''
            }
        }
        canvas2.onmousemove = (e) => {
            let mouseX = e.offsetX
            let mouseY = e.offsetY
            if ((mouseX > canvas.width / 2 - 90 && mouseX < canvas.width / 2 + canvas.width / 25) && (mouseY > canvas.height / 2 + 40 && mouseY < canvas.height / 2 + 80))
                canvas2.style.cursor = "pointer"
            else
                canvas2.style.cursor = "unset"

        }
    }
    animation2 = requestAnimationFrame(() => {
        drawEnemy(x2, y2, X_Sum, Y_Sum)
    })
}



