import { createAction } from './redux.js';
import store from './store.js'

export default class itemEat {
    constructor(ctx) {
        this.ctx = ctx
        this.effect()
    }
    async effect() {
        if (store.getState().shieldTime > 0) { //실드 아이템 실드 테두리 그리기
            await this.ctx.beginPath();
            await this.ctx.arc(store.getState().x + store.getState().redSize/2, store.getState().y + store.getState().redSize/2, store.getState().redSize*3, 0, 2 * Math.PI);
            this.ctx.lineWidth = 5;
            await this.ctx.stroke();
            store.dispatch(createAction("UPDATE_SHIELD_TIME", { time: -50 })) //아이템 타이머
        }

        //스피드 아이템 타이머
        if (store.getState().speedUpTime > 0) store.dispatch(createAction("UPDATE_SPEEDUP_TIME", { time: -50 }))
        else if (store.getState().mainSpeed != 5&&store.getState().starTime == 0) store.dispatch(createAction("UPDATE_SPEED", { speed: 5 })) //타이머 종료 시 스피드 원상복구

        //슬로우 아이템 타이머
        if (store.getState().slowTime > 0) store.dispatch(createAction("UPDATE_SLOW_TIME", { time: -50 }))

        //무적star 아이템 타이머
        if (store.getState().starTime > 0) store.dispatch(createAction("UPDATE_STAR_TIME", { time: -50 }))
        else if(store.getState().redSize >((window.innerHeight + window.innerWidth)/2)/30)
        store.dispatch(createAction("UPDATE_REDSIZE"))
    }
}