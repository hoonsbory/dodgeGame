let canvas = document.getElementById("canvas")
let canvas2 = document.getElementById("canvas2")
let ctx2 = canvas2.getContext('2d')
let ctx = canvas.getContext('2d')
let x = window.innerWidth / 2;
let y = window.innerHeight / 2;
let left;
let right;
let up;
let down;
let animation2 = []
let animation
let endCheck = false
let plusMinus = ['plus', 'minus']
let enemyPosition = ['left', 'right', 'top', 'bottom']
let beforeTouchX
let beforeTouchY
let cnt = 0;
let speed = 2;
let unit = 50;




