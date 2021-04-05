import { createStore, createAction } from "./redux.js";

// Action 정의
const PUSH_ENEMY = "PUSH_ENEMY";
const DELETE_ENEMY = "DELETE_ENEMY"
const PUSH_ITEM = "PUSH_ITEM";
const DELETE_ITEM = "DELETE_ITEM"
const UPDATEX = "UPDATEX"
const UPDATEY = "UPDATEY"
const UPDATE_SCORE = "UPDATE_SCORE"
const UPDATE_SHIELD_TIME = "UPDATE_SHIELD_TIME"
const UPDATE_SPEEDUP_TIME = "UPDATE_SPEEDUP_TIME"
const UPDATE_SLOW_TIME = "UPDATE_SLOW_TIME"
const UPDATE_SPEED = "UPDATE_SPEED"
const UPDATEANIMATION = "UPDATEANIMATION"
const UPDATE_ISEND = "UPDATE_ISEND"
const UPDATE_ENEMY_UNIT = "UPDATE_ENEMY_UNIT"
const UPDATE_ENEMY_SPEED = "UPDATE_ENEMY_SPEED"
const UPDATE_ENEMY_SIZE = "UPDATE_ENEMY_SIZE"
const UPDATE_REDSIZE = "UPDATE_REDSIZE"
// Reducer 정의
function reducer(state, /* action */ { type, payload }) {

  switch (type) {
    case UPDATE_REDSIZE:
      let redSize = ((window.innerHeight + window.innerWidth) / 2) / 30
      if (redSize >= 25) redSize = 25
      return {
        ...state,
        redSize: redSize
      }
    case UPDATE_ENEMY_SIZE:
      let enemySize = ((window.innerHeight + window.innerWidth) / 2) / 60
      if (enemySize >= 12) enemySize = 12
      return {
        ...state,
        enemySize: enemySize
      }
    case UPDATE_ENEMY_SPEED:
      return {
        ...state,
        enemySpeed: payload.newData
      }
    case UPDATE_ENEMY_UNIT:
      return {
        ...state,
        enemyUnit: payload.newData
      }
    case UPDATE_ISEND:
      return {
        ...state,
        isEnd: payload.newData
      }
    case UPDATEANIMATION:
      return {
        ...state,
        animation: payload.newAni
      }
    case UPDATE_SPEED:
      return {
        ...state,
        mainSpeed: payload.speed
      }
    case UPDATE_SHIELD_TIME:
      return {
        ...state,
        shieldTime: state.shieldTime + payload.time
      }
    case UPDATE_SPEEDUP_TIME:
      return {
        ...state,
        speedUpTime: state.speedUpTime + payload.time
      }
    case UPDATE_SLOW_TIME:
      return {
        ...state,
        slowTime: state.slowTime + payload.time
      }
    case UPDATE_SCORE:
      return {
        ...state,
        score: state.score + payload.newScore,
      }
    case PUSH_ENEMY:
      return {
        ...state,
        enemyArr: payload.newData,
      }
    case DELETE_ENEMY:
      if (payload.newData != -1)
        state.enemyArr.splice(payload.newData, 1)
      return {
        ...state,
      }
    case PUSH_ITEM:
      return {
        ...state,
        itemArr: payload.newData,
      }
    case DELETE_ITEM:
      state.itemArr.splice(payload.newData, 1)
      return {
        ...state,
      }
    case UPDATEX:
      return {
        ...state,
        x: payload.newX,
      }
    case UPDATEY:
      return {
        ...state,
        y: payload.newY,
      }
    default:
      return { ...state };
  }
}

// Store 생성
const store = createStore(reducer);
// Subscriber 등록
// store.subscribe(() => {
//   console.log(store.getState());
// });
export default store
// Dispatch Wrapper 정의
// const reset = (count = 0) => store.dispatch(createAction(ACTION_INIT, { count }));
// const increament = () => store.dispatch(createAction(ACTION_INCR));
// const decreament = () => store.dispatch(createAction(ACTION_DECR));

// // function 실행
// increament();
// increament();
// increament();
// decreament();
// reset();
// reset(100);
// increament();
// decreament();