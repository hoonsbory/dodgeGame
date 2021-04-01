
import drawEnemy from './drawEnemy.js'


const makeEnemy = (handleMove,handleStart,startGame) => {
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

export default makeEnemy