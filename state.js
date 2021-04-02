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
let mainSpeed = 5;
let animation2 = []
let animation
let shieldAni = []
let speedAni = []
let shieldCheck = false;
let itemUnit = 0;
let shieldTime = 13000
let speedTime = 13000
let speedCheck = false
let endCheck = false
let plusMinus = ['plus', 'minus']
let enemyPosition = ['left', 'right', 'top', 'bottom']
let itemRandom = ['speed','shield']
let beforeTouchX
let beforeTouchY
let cnt = 0;
let speed = 2;
let unit = 50;
let shield;

let shieldIcon = new Image()
shieldIcon.src = "/shield.png"

let speedIcon = new Image()
speedIcon.src = "/speedUp.png"




