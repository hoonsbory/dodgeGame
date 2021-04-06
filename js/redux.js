let checkMobile = navigator.userAgent.indexOf("Mobile") > -1;
let redSize = ((window.innerHeight + window.innerWidth)/2)/30
if(redSize>=25) redSize = 25
let enemySize = ((window.innerHeight + window.innerWidth)/2)/60
if(enemySize>=12) enemySize = 12


export function createStore(reducer) {
    // 상태 저장 변수 선언
    let state = {
        left : false,
        right : false,
        up : false,
        down : false,
        x : window.innerWidth /2,
        y : window.innerHeight /2,
        checkMobile : checkMobile,
        mainSpeed : 5,
        enemySpeed : 2,
        enemyArr : [],
        itemArr : [],
        enemyUnit : window.innerWidth + window.innerHeight>1700 ? 50 : 60,
        score : 0,
        shieldTime : 0,
        speedUpTime : 0,
        minimizeTime : 0,
        slowTime : 0,
        starTime : 0,
        animation : '',
        redSize : redSize,
        enemySize : enemySize,
        isEnd : false
        // aniArr : []
    };

    // 구독자 저장 리스트 선언
    const listeners = [];

    // 구독 함수
    const subscribe = (subscriber) => {
        listeners.push(subscriber);
    };

    // 출판 함수
    const publish = () => {
        listeners.forEach((subscriber) => {
            subscriber()
        });
    };

    // 상태 반환 함수
    const getState = () => ({ ...state });

    // 상태 업데이트 함수
    const dispatch = (action) => {
        state = reducer(state, action);
        publish();
    };

    return {
        getState,
        dispatch,
        subscribe,
    };
};

export const createAction = (type, payload = {}) => ({
    type,
    payload: { ...payload },
});