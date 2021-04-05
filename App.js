import drawEnemy from './drawEnemy.js'
import drawInfo from './drawInfo.js'
import drawItem from './drawItem.js'
import itemEat from './itemEat.js'
import { createAction } from './redux.js'
import store from './store.js'
import touchEvent from './touchEvent.js'

export default class App {
    //방향키
    left
    right
    up
    down

    constructor() {
        //아이템 아이콘 로드
        this.shieldIcon = new Image()
        this.shieldIcon.src = './shield.png'
        this.speedIcon = new Image()
        this.speedIcon.src = './speedUp.png'
        this.slowIcon = new Image()
        this.slowIcon.src = './slow.png'

        this.icon = store.getState().checkMobile ? [this.shieldIcon, this.slowIcon] : [this.shieldIcon, this.speedIcon, this.slowIcon]

        this.canvas = document.getElementById("canvas")
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight

        //키보드 이벤트
        this.keyUp()
        this.keyDown()

        //모바일용 터치 이벤트
        if (store.getState().checkMobile) new touchEvent(this.ctx)

        //다시하기 버튼 이벤트
        this.canvas.onclick = (e) => this.onclick(e)
        this.canvas.onmousemove = (e) => this.onMove(e)

        //리사이즈 이벤트
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth
            this.canvas.height = window.innerHeight
            store.dispatch((createAction("UPDATE_REDSIZE")))
            store.dispatch((createAction("UPDATE_ENEMY_SIZE")))
            //큰 화면에서 작은 화면이 되면 좌표값에 따라 캔버스 밖에 위치할 확률이 높기 때문에 캔버스를 벗어나면 중앙으로 재조정
            if (store.getState().x <= 0 || store.getState().x >= window.innerWidth - 20 || store.getState().y <= 0 || store.getState().y >= window.innerHeight - 20) {
                store.dispatch(createAction("UPDATEY", { newY: this.canvas.height / 2 }))
                store.dispatch(createAction("UPDATEX", { newX: this.canvas.width / 2 }))
            }
        })

        //animate
        store.dispatch(createAction("UPDATEANIMATION", { newAni: requestAnimationFrame(this.animate.bind(this)) }))
    }


    async animate() {
        await this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)


        if (store.getState().isEnd) {  //게임 종료시 
            this.ctx.font = `60px Arial`
            this.ctx.textAlign = "center"
            this.ctx.fillStyle = "black"
            await this.ctx.fillText("GAMEOVER", this.canvas.width / 2, this.canvas.height / 2)
            this.ctx.font = `30px Arial`
            await this.ctx.fillText("다시하기", this.canvas.width / 2, this.canvas.height / 2 + 70,)
        }
        else {
            store.dispatch(createAction("UPDATE_SCORE", { newScore: 5 })) //점수 업데이트


            if (store.getState().score >= 1250 && store.getState().score % 1250 == 0 && store.getState().score < 12501) {
                let speed = store.getState().enemySpeed
                if (window.innerWidth + window.innerHeight > 1700)
                    speed = speed < 6 ? speed + 1 : speed
                store.dispatch(createAction("UPDATE_ENEMY_SPEED", { newData: speed }))
                store.dispatch(createAction("UPDATE_ENEMY_UNIT", { newData: store.getState().enemyUnit - 5 }))
            }

            if (store.getState().score % 2000 == 0) { //1000점마다 아이템 생성
                let random = store.getState().checkMobile ? Math.floor(Math.random() * 2) : Math.floor(Math.random() * 3) //랜덤으로 생성

                store.dispatch(createAction("PUSH_ITEM", { newData: new drawItem(this.ctx, this.icon[random]) })) //객체 푸쉬
            }

            //enemy 생성
            if (store.getState().score % store.getState().enemyUnit == 0) store.dispatch(createAction("PUSH_ENEMY", { newData: new drawEnemy(this.slowCheck, this.ctx) }))

            //아이템먹었을시 효과 적용
            new itemEat(this.ctx)

            //캐릭터 이동
            this.moveRed()
        }

        this.ctx.fillStyle = "#FF4848"
        //캐릭터 draw
        await this.ctx.fillRect(store.getState().x, store.getState().y, store.getState().redSize, store.getState().redSize)

        //저장된 적,아이템 객체들 전부 animation 시작
        store.getState().itemArr.forEach(i => {
            i.animate()
        })
        store.getState().enemyArr.forEach(i => {
            i.animate()
        })

        //점수 정보 draw
        drawInfo(this.ctx, this.canvas, store.getState().score)

        //animate
        store.dispatch(createAction("UPDATEANIMATION", { newAni: requestAnimationFrame(this.animate.bind(this)) }))
    }


    updateX(plusMinus) { //x좌표 업데이트
        store.dispatch(createAction("UPDATEX", { newX: store.getState().x + store.getState().mainSpeed * plusMinus }))
    }
    updateY(plusMinus) { //y좌표 업데이트
        store.dispatch(createAction("UPDATEY", { newY: store.getState().y + store.getState().mainSpeed * plusMinus }))
    }



    onclick(e) {
        let mouseX = e.offsetX
        let mouseY = e.offsetY
        if ((mouseX > this.canvas.width / 2 - 70 && mouseX < this.canvas.width / 2 + 70) && (mouseY > this.canvas.height / 2 + 40 && mouseY < this.canvas.height / 2 + 80)) {
            //다시하기 좌표 클릭 시 restart
            store.dispatch(createAction("UPDATE_SPEEDUP_TIME", { time: store.getState().speedUpTime * -1 }))
            store.dispatch(createAction("UPDATE_SLOW_TIME", { time: store.getState().slowTime * -1 }))
            store.dispatch(createAction("UPDATE_SCORE", { newScore: store.getState().score * -1 }))
            store.dispatch(createAction("UPDATEX", { newX: this.canvas.width / 2 }))
            store.dispatch(createAction("UPDATEY", { newY: this.canvas.height / 2 }))
            store.dispatch(createAction("UPDATE_ISEND", { newData: false }))
            store.dispatch(createAction("UPDATE_ENEMY_SPEED", { newData: 2 }))
            store.dispatch(createAction("UPDATE_ENEMY_UNIT", { newData: window.innerWidth + window.innerHeight > 1700 ? 50 : 60 }))
            this.canvas.style.cursor = "unset"
        }
    }

    onMove(e) { //다시하기 좌표에 마우스 오버될 시 커서 포인트 적용
        let mouseX = e.offsetX
        let mouseY = e.offsetY
        if ((mouseX > this.canvas.width / 2 - 70 && mouseX < this.canvas.width / 2 + 70) && (mouseY > this.canvas.height / 2 + 40 && mouseY < this.canvas.height / 2 + 80))
            this.canvas.style.cursor = "pointer"
        else
            this.canvas.style.cursor = "unset"
    }

    keyUp() {
        onkeyup = (e) => {
            let key = e.keyCode
            switch (key) {
                case 37:
                    this.left = false
                    break;
                case 38:
                    this.up = false
                    break;
                case 39:
                    this.right = false
                    break;
                case 40:
                    this.down = false
                    break;
                default:
                    break;
            }
        }
    }

    keyDown() {
        onkeydown = (e) => {
            let key = e.keyCode
            switch (key) {
                case 37:
                    this.left = true
                    break;
                case 38:
                    this.up = true
                    break;
                case 39:
                    this.right = true
                    break;
                case 40:
                    this.down = true
                    break;
                default:
                    break;
            }
        }
    }
    moveRed() {
        if (this.left) {
            if (this.up) {
                if (store.getState().y <= 0 && store.getState().x <= 0) return
                else if (store.getState().y <= 0) this.updateX(-1)
                else if (store.getState().x <= 0) this.updateY(-1)
                else {
                    this.updateX(-1)
                    this.updateY(-1)
                }
            }
            else if (this.down) {
                if (store.getState().y >= this.canvas.height - 20 && store.getState().x <= 0) return
                else if (store.getState().y >= this.canvas.height - 20) this.updateX(-1)
                else if (store.getState().x <= 0) this.updateY(1)
                else {
                    this.updateX(-1)
                    this.updateY(1)
                }
            }
            else {
                if (store.getState().x <= 0) return
                else
                    this.updateX(-1)
            }
        }
        else if (this.right) {
            if (this.up) {
                if (store.getState().y <= 0 && store.getState().x >= this.canvas.width - 20) return
                else if (store.getState().y <= 0) this.updateX(1)
                else if (store.getState().x >= this.canvas.width - 20) this.updateY(-1)
                else {
                    this.updateX(1)
                    this.updateY(-1)
                }
            }
            else if (this.down) {
                if (store.getState().y >= this.canvas.height - 20 && store.getState().x >= this.canvas.width - 20) return
                else if (store.getState().y >= this.canvas.height - 20) this.updateX(1)
                else if (store.getState().x >= this.canvas.width - 20) this.updateY(1)
                else {
                    this.updateX(1)
                    this.updateY(1)
                }
            }
            else {
                if (store.getState().x >= this.canvas.width - 20) return
                else
                    this.updateX(1)
            }
        }
        else if (this.down) {
            if (store.getState().y >= this.canvas.height - 20) return
            else this.updateY(1)
        }
        else if (this.up) {
            if (store.getState().y <= 0) return
            else this.updateY(-1)
        }
    }
}