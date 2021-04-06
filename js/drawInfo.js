
const drawInfo = (ctx,canvas,score) => {
    ctx.fillStyle = "black"
    ctx.font = 'bold 16px Arial'
    ctx.textAlign = "center"
    ctx.fillText(`점수 : ${score}`, 100, 30)
    ctx.fillText('made by 비트주세요', canvas.width / 2, canvas.height - 15)
}

export default drawInfo