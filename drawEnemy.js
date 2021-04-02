import endDraw from './endDraw.js'


const drawEnemy = async (x2, y2, X_Sum, Y_Sum, idx, handleMove, handleStart, startGame) => {
    ctx.fillStyle = "#368AFF"
    await ctx.fillRect(x2, y2, 10, 10)
    await ctx.clearRect(x2 - 1, y2 - 1, 12, 12)
    x2 += X_Sum
    y2 += Y_Sum

    await ctx.fillRect(x2, y2, 10, 10)

    if(shieldCheck&&(x + 50 >= x2 && x - 40 <= x2) && (y2 <= y + 50 && y2 >= y - 40)){
        cancelAnimationFrame(animation2[idx])
        await ctx.clearRect(x2 - 1, y2 - 1, 12, 12)
        cnt+=100
        return
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