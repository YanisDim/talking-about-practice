//canvas
let canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');
canvas.style.border = '2px solid white';


//the DOM pages selectors
let startPage = document.querySelector('#start-page')
let gamePage = document.querySelector('#game-page')
let gameOverPage = document.querySelector('#game-over-page')
//and the buttons selectors
let startBtn = document.querySelector('#start-btn')
let restartBtn = document.querySelector('#restart')

//-------------------
//load all images

//background image
let court = new Image();
court.src = './Img/halfcourt.jpg';


let user = new Image();
user.src = './Img/player1.png';



let cpu = new Image();
cpu.src = './Img/player4.png';

let ball = new Image();
ball.src = './Img/ball.png'



//---------------------
//Variables creation
let userX = 260, userY= canvas.height-270, userIncr= 5
let cpuX = 260, cpuY= 70, cpuWidth = 150, cpuHeight=150
let isArrowLeft = false, isArrowRight = false;
let incrX = 5;//increment x position of cpu
let isGameOver = false;
let intervalId = 0

//---------------------
//add background
function start(){
    startPage.style.display = 'none'
        gamePage.style.display = ''
        draw()
        moveUser()
        animateCpu()
}

function restart (){

}


function draw(){
ctx.drawImage(court, 0, 0)
    //adding user player
ctx.drawImage(user, userX, userY, 150, 150)//530 moving line
//adding computer player
ctx.drawImage(cpu, cpuX, cpuY, cpuWidth, cpuHeight) //70 moving line
}

//move user
document.addEventListener('keydown', (event)=>{
    if(event.code == 'ArrowRight'){
        isArrowRight = true
        isArrowLeft = false
    }
    else if (event.code =='ArrowLeft'){
        isArrowRight = false
        isArrowLeft = true
    }

})
document.addEventListener('keyup', (event)=>{
    isArrowRight = false
    isArrowLeft = false
})

//animate user

function moveUser (){
    if(isArrowRight){
        userX = userX + 5
    }
    if(isArrowLeft){
        userX = userX - 5
    }
}

function animateCpu(){
ctx.clearRect(0, 0, canvas.width, canvas.height)
draw()

//Right hand side 
if (cpuX > canvas.width - cpuWidth ){
    incrX = -incrX
}

//Left hand
if(cpuX < 0){
    incrX = 5
}
cpuX = cpuX + incrX

if (isGameOver){
    cancelAnimationFrame(intervalId)
} else{
    intervalId = requestAnimationFrame(animateCpu)
}


}
















window.addEventListener('load', ()=>{
    startPage.style.display = 'block'
    gamePage.style.display = 'none'
    gameOverPage.style.display = 'none'
    startBtn.addEventListener('click', ()=>{
        start()
    })
    gameOverPage.style.display('click', ()=>{
        restart()
    })
})

