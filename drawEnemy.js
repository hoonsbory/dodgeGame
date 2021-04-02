import endDraw from './endDraw.js'
import getCirclePos from './getCirclePos.js'


const drawEnemy = async (x2, y2, X_Sum, Y_Sum, idx, handleMove, handleStart, startGame) => {
    ctx3.fillStyle = "#368AFF"
    await ctx3.fillRect(x2, y2, 10, 10)
    await ctx3.clearRect(x2 - 1, y2 - 1, 12, 12)
    if (slowCheck) {
        x2 += X_Sum * (1 / (Math.abs(X_Sum) * 2))
        y2 += Y_Sum * (1 / (Math.abs(Y_Sum) * 2))
    } else {
        x2 += X_Sum
        y2 += Y_Sum
    }

    await ctx3.fillRect(x2, y2, 10, 10)
    if (shieldCheck) {
        let pos = new getCirclePos(60)
        pos.forEach(async (i) => {
            if ((i[0] + 2 >= x2 && i[0] - 10 <= x2) && (y2 <= i[1] + 2 && y2 >= i[1] - 10)) {
                await ctx3.clearRect(x2 - 1, y2 - 1, 12, 12)
                cancelAnimationFrame(animation2[idx])
                cnt += 100
                return
            }
        })
    }

    if ((x + 20 >= x2 && x - 10 <= x2) && (y2 <= y + 20 && y2 >= y - 10)) {
        if (endCheck) return
        new endDraw(handleMove, handleStart, startGame)
    }
    if (x2 > canvas.width + 10 || x2 < -10 || y2 > canvas.height + 10 || y2 < -10) {
        cancelAnimationFrame(animation2[idx])
        return
    }
    animation2[idx] = requestAnimationFrame(() => {
        drawEnemy(x2, y2, X_Sum, Y_Sum, idx, handleMove, handleStart, startGame)
    })
}

export default drawEnemy