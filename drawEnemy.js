import randomPos from './randomPos.js'
import { createAction } from './redux.js'
import store from './store.js'
import getCirclePos from './getCirclePos.js'


export default class drawEnemy {
    constructor(slowCheck, ctx) {
        this.slowCheck = slowCheck
        this.enemyPos = new randomPos(0) //랜덤 좌표
        this.ctx = ctx
    }
    async animate() {
        let x = store.getState().x
        let y = store.getState().y

        this.ctx.fillStyle = '#368AFF'

        if (store.getState().slowTime > 0) { //슬로우 적용
            this.enemyPos.x += this.enemyPos.X_Sum * (1 / (Math.abs(this.enemyPos.X_Sum) * 2))
            this.enemyPos.y += this.enemyPos.Y_Sum * (1 / (Math.abs(this.enemyPos.Y_Sum) * 2))
        } else {
            this.enemyPos.x += this.enemyPos.X_Sum
            this.enemyPos.y += this.enemyPos.Y_Sum
        }

        await this.ctx.fillRect(this.enemyPos.x, this.enemyPos.y, store.getState().enemySize, store.getState().enemySize) //enemy draw

        this.isCrash(x, y) //부딪힘 계산

        this.isOut() //캔버스 범위 밖으로 나간 경우

    }
    isCrash(x, y) {
        if (store.getState().shieldTime > 0) { //실드 아이템 적용 시 원 둘레의 좌표를 구해서 해당 좌표에 부딪히면 처리
            let pos = new getCirclePos(store.getState().redSize*3, store.getState().x, store.getState().y)
            pos.forEach((i) => {
                // this.ctx.fillStyle = "blue"
                // this.ctx.fillRect(i[0],i[1],5,5)
                if ((i[0] + 2 >= this.enemyPos.x && i[0] - store.getState().enemySize <= this.enemyPos.x) && (this.enemyPos.y <= i[1] + 2 && this.enemyPos.y >= i[1] - store.getState().enemySize)) {
                    this.deleteEnemy()
                    store.dispatch(createAction("UPDATE_SCORE", { newScore: 100 }))
                    return
                }
            })
            if (store.getState().checkMobile) {  //모바일용은 드래그 속도에 따라서 순식간에 범위를 이탈해서 실드 안으로 들어와버리기때문에 따로 실드 안에 사각형을 만들어 처리
                let rectX = pos[52][0]
                let rectY = pos[52][1]
                let rectSize = pos[7][0] - pos[22][0]
                if ((rectX + rectSize >= this.enemyPos.x && rectX - store.getState().enemySize <= this.enemyPos.x) && (this.enemyPos.y <= rectY + rectSize && this.enemyPos.y >= rectY - store.getState().enemySize)) {
                    this.deleteEnemy()
                    store.dispatch(createAction("UPDATE_SCORE", { newScore: 100 }))
                    return
                }
            }
        } else {
            if ((x + store.getState().redSize >= this.enemyPos.x && x - store.getState().enemySize <= this.enemyPos.x) && (this.enemyPos.y <= y + store.getState().redSize && this.enemyPos.y >= y - store.getState().enemySize)) { //아이템 미적용시 충돌 처리
                this.deleteEnemy()
                store.dispatch(createAction("UPDATE_ISEND", { newData: true }))
            }
        }
    }

    isOut() {
        if (this.enemyPos.x > window.innerWidth + store.getState().enemySize || this.enemyPos.x < -store.getState().enemySize || this.enemyPos.y > window.innerHeight || this.enemyPos.y < -store.getState().enemySize)
            this.deleteEnemy()
    }
    deleteEnemy() {
        store.dispatch(createAction("DELETE_ENEMY", {
            newData: store.getState().enemyArr.indexOf(this)
        }))
    }
}