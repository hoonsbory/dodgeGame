

import store from './store.js'

export default class randomPos{
     x
     y
     X_Sum = Math.random() * store.getState().enemySpeed + 1
     Y_Sum = Math.random() * store.getState().enemySpeed + 1
     plusMinusRandom = Math.floor(Math.random() * 2 + 1)
     positionRandom = Math.floor(Math.random() * 4)
     enemyPosition = ['left', 'right', 'top', 'bottom']
     plusMinus = ['plus','minus']

    constructor(startPos){
        this.X_Random = Math.random() * ((canvas.width-startPos) - startPos) + startPos
        this.Y_Random = Math.random() * ((canvas.height-startPos) - startPos) + startPos
        this.startPos = startPos
        this.random()
    } 

    random(){
        switch (this.enemyPosition[this.positionRandom]) {
            case 'left':
                if (this.plusMinus[this.plusMinusRandom] == 'minus') this.Y_Sum = -(this.Y_Sum)
                this.y = this.Y_Random
                this.x = this.startPos;
                break;
            case 'right':
                this.X_Sum = -(this.X_Sum)
                if (this.plusMinus[this.plusMinusRandom] == 'minus') this.Y_Sum = -(this.Y_Sum)
                this.y = this.Y_Random
                this.x = canvas.width-this.startPos;
                break;
            case 'top':
                if (this.plusMinus[this.plusMinusRandom] == 'minus') this.X_Sum = -(this.X_Sum)
                this.x = this.X_Random
                this.y = this.startPos
                break;
            case 'bottom':
                if (this.plusMinus[this.plusMinusRandom] == 'minus') this.X_Sum = -(this.X_Sum)
                this.Y_Sum = -(this.Y_Sum)
                this.x = this.X_Random
                this.y = canvas.height-this.startPos
                break;
            default:
                break;
        }
    }
}
