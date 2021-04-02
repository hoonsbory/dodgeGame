import clearArc from './clearArc.js'


const drawItem = async (x2, y2, X_Sum, Y_Sum, idx, item, icon) => {
    clearArc(x2, y2, 21)
    x2 += X_Sum
    y2 += Y_Sum
    await ctx.save();
    await ctx.beginPath();
    await ctx.arc(x2, y2, 20, 0, 2 * Math.PI, false);
    await ctx.closePath()
    await ctx.clip()

    await ctx.drawImage(icon, x2 - 20, y2 - 20, 40, 40)

    await ctx.beginPath()
    await ctx.arc(x2 - 20, y2 - 20, 20, 0, Math.PI * 2, true);
    await ctx.clip();
    await ctx.closePath();
    await ctx.restore();

    if (x2 <= 20) X_Sum *= -1
    else if (x2 >= canvas.width - 20) X_Sum *= -1
    else if (y2 <= 20) Y_Sum *= -1
    else if (y2 >= canvas.height - 20) Y_Sum *= -1

    if ((x + 30 >= x2 && x - 20 <= x2) && (y2 <= y + 30 && y2 >= y - 20)) {
        clearArc(x2, y2, 21)
        itemUnit--
        if (item == "shield") {
            shieldCheck = true
            shieldTime -= 13000
            cancelAnimationFrame(shieldAni[idx])
        }
        else if (item == "speed") {
            mainSpeed = 9
            cancelAnimationFrame(speedAni[idx])
            speedTime -= 13000
            speedCheck = true
        } else {
            cancelAnimationFrame(slowAni[idx])
            slowTime -= 13000
            slowCheck = true
        }

        return
    }

    if (item == 'shield')
        shieldAni[idx] = requestAnimationFrame(() => {
            drawItem(x2, y2, X_Sum, Y_Sum, idx, item, icon)
        })
    else if (item == 'speed')
        speedAni[idx] = requestAnimationFrame(() => {
            drawItem(x2, y2, X_Sum, Y_Sum, idx, item, icon)
        })
    else
        slowAni[idx] = requestAnimationFrame(() => {
            drawItem(x2, y2, X_Sum, Y_Sum, idx, item, icon)
        })
}

export default drawItem