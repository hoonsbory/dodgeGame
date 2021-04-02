

export default class randomPos{
     x2
     y2
     X_Random = Math.random() * canvas.width + 1
     Y_Random = Math.random() * canvas.height + 1
     X_Sum = Math.random() * speed + 1
     Y_Sum = Math.random() * speed + 1
     plusMinusRandom = Math.floor(Math.random() * 2 + 1)
     positionRandom = Math.floor(Math.random() * 4)
    constructor(){
        this.random()
    } 

    random(){
        switch (enemyPosition[this.positionRandom]) {
            case 'left':
                if (plusMinus[this.plusMinusRandom] == 'minus') this.Y_Sum = -(this.Y_Sum)
                this.y2 = this.Y_Random
                this.x2 = 0;
                break;
            case 'right':
                this.X_Sum = -(this.X_Sum)
                if (plusMinus[this.plusMinusRandom] == 'minus') this.Y_Sum = -(this.Y_Sum)
                this.y2 = this.Y_Random
                this.x2 = canvas.width;
                break;
            case 'top':
                if (plusMinus[this.plusMinusRandom] == 'minus') this.X_Sum = -(this.X_Sum)
                this.x2 = this.X_Random
                this.y2 = 0
                break;
            case 'bottom':
                if (plusMinus[this.plusMinusRandom] == 'minus') this.X_Sum = -(this.X_Sum)
                this.Y_Sum = -(this.Y_Sum)
                this.x2 = this.X_Random
                this.y2 = canvas.height
                break;
            default:
                break;
        }
    }
}
