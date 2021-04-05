import { createAction } from './redux.js';
import store from './store.js'

export default class touchEvent {
    constructor(ctx) {
        this.ctx = ctx
        window.addEventListener("touchmove", this.handleMove.bind(this), false);
        window.addEventListener("touchstart", this.handleStart.bind(this), false);
    }
    handleStart(e) {
        let touches = e.changedTouches
        this.beforeTouchX = touches[0].clientX
        this.beforeTouchY = touches[0].clientY
    }
    handleMove(e) {
        if(!store.getState().isEnd){
        let x = store.getState().x
        let y = store.getState().y
        let touches = e.changedTouches
        let touchX = touches[0].clientX
        let touchY = touches[0].clientY
        //터치시작 이벤트에서 저장한 이전 좌표값과의 차이를 계산
        let afterX = x + touchX - this.beforeTouchX  
        let afterY = y + touchY - this.beforeTouchY
        
        //캔버스 밖으로 나갈 시에 못나가게 처리
         if (afterX >= window.innerWidth - 20) afterX = window.innerWidth - 20
         else if (afterX <= 0) afterX = 0

         if (afterY >= window.innerHeight - 20) afterY = window.innerHeight - 20
         else if (afterY <= 0) afterY = 0

        store.dispatch(createAction("UPDATEY", { newY: afterY }))
        store.dispatch(createAction("UPDATEX", { newX: afterX }))

        //새롭게 생성된 좌표는 이전좌표가 된다.
        this.beforeTouchX = touchX
        this.beforeTouchY = touchY
        }
    }
}