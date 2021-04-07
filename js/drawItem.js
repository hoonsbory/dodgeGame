import randomPos from './randomPos.js'
import { createAction } from './redux.js'
import store from './store.js'

export default class drawItem {
    constructor(ctx, icon) {
        this.ctx = ctx
        this.icon = icon
        this.pos = new randomPos(80)
        this.type = icon.src.substring(icon.src.lastIndexOf("/") + 1, icon.src.indexOf(".png")) //아이템 타입 
    }
    async animate() {
        await this.drawIcon()
        this.bound() //벽에 부딪힐 시 바운드
        this.Crash() //아이템과 캐릭터 충돌(아이템 먹을 시)
    }

    // async clearArc(x, y, size) {
    //     await this.ctx.save();
    //     this.ctx.globalCompositeOperation = 'destination-out';
    //     await this.ctx.beginPath();
    //     await this.ctx.arc(x, y, size, 0, 2 * Math.PI, false);
    //     await this.ctx.fill();
    //     await this.ctx.restore();
    // }

    async drawIcon() { //아이콘 draw
        this.pos.x += this.pos.X_Sum
        this.pos.y += this.pos.Y_Sum

        await this.ctx.drawImage(this.icon, this.pos.x, this.pos.y, 40, 40)
    }

    bound() {
        if (this.pos.x <= 20) this.pos.X_Sum *= -1
        else if (this.pos.x >= canvas.width - 20) this.pos.X_Sum *= -1
        else if (this.pos.y <= 20) this.pos.Y_Sum *= -1
        else if (this.pos.y >= canvas.height - 20) this.pos.Y_Sum *= -1
    }

    Crash() {
        if ((store.getState().x + store.getState().redSize >= this.pos.x && store.getState().x - 40 <= this.pos.x) && (this.pos.y <= store.getState().y + store.getState().redSize && this.pos.y >= store.getState().y - 40)) {
            store.dispatch(createAction("DELETE_ITEM", {
                newData: store.getState().itemArr.indexOf(this)
            }))
            switch (this.type) {
                case "shield":
                    store.dispatch(createAction("UPDATE_SHIELD_STACK", { stack: 3 }))
                    break;
                case "speedUp":
                    store.dispatch(createAction("UPDATE_SPEEDUP_TIME", { time: 13000 }))
                    store.dispatch(createAction("UPDATE_SPEED", { speed: 9 }))
                    break;
                case "slow":
                    store.dispatch(createAction("UPDATE_SLOW_TIME", { time: 19000 }))
                    break;
                case "star":
                    store.dispatch(createAction("UPDATE_STAR_TIME", { time: 13000 }))
                    store.dispatch(createAction("UPDATE_SPEED", { speed: 9 }))
                    store.dispatch(createAction("UPDATE_REDSIZE", { newData: store.getState().redSize * 2 }))
                    break;
                case "minimize":
                    store.dispatch(createAction("UPDATE_MINIMIZE_TIME", { time: 13000 }))
                    store.dispatch(createAction("UPDATE_REDSIZE", { newData: store.getState().redSize / 2 }))
                    break;
                default:
                    break;
            }

            return true
        }
    }
}