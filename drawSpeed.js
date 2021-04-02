import endDraw from './endDraw.js'


const drawSpeed = async (x2, y2, X_Sum, Y_Sum, idx) => {
    await ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    await ctx.beginPath();
    await ctx.arc(x2, y2, 21, 0, 2 * Math.PI, false);
    await ctx.fill();
    await ctx.restore();
    x2 += X_Sum
    y2 += Y_Sum
    await ctx.save();
    await ctx.beginPath();
    await ctx.arc(x2, y2, 20, 0, 2 * Math.PI, false);
    await ctx.closePath()
    await ctx.clip()


    await ctx.drawImage(speedIcon, x2 - 20, y2 - 20, 40, 40)

    await ctx.beginPath()
    await ctx.arc(x2 - 20, y2 - 20, 20, 0, Math.PI * 2, true);
    await ctx.clip();
    await ctx.closePath();
    await ctx.restore();

    if (x2 <= 20) X_Sum *= -1
    else if (x2 >= canvas.width - 20) X_Sum *= -1
    else if (y2 < 20) Y_Sum *= -1
    else if (y2 > canvas.height - 20) Y_Sum *= -1

    if ((x + 30 >= x2 && x - 20 <= x2) && (y2 <= y + 30 && y2 >= y - 20)) {
        await ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        await ctx.beginPath();
        await ctx.arc(x2, y2, 20, 0, 2 * Math.PI, false);
        await ctx.fill();
        await ctx.restore();
        mainSpeed = 9
        itemUnit--
        cancelAnimationFrame(speedAni[idx])
        speedTime -= 13000
        speedCheck = true
        return
    }


    speedAni[idx] = requestAnimationFrame(() => {
        drawSpeed(x2, y2, X_Sum, Y_Sum, idx)
    })
}

export default drawSpeed