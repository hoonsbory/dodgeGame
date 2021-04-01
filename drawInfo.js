
const drawInfo = () => {
    ctx2.clearRect(0, 0, canvas.width, canvas.height)
    ctx2.font = 'bold 16px Arial'
    ctx2.textAlign = "center"
    ctx2.fillText(`점수 : ${cnt}`, 100, 30)
    ctx2.fillText('made by 비트주세요', canvas.width / 2, canvas.height - 15)
}

export default drawInfo