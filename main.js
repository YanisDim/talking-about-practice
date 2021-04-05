//canvas
let canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');
canvas.style.border = '5px solid white';


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
let userX = 260, userY= canvas.height-270, userIncr= 5, userWidth=150, userHeight = 150
let cpuX = 260,  cpuWidth = 150, cpuHeight=150, cpuY = 70;
let ballHeight = 50, ballWidth = 50
let isArrowLeft = false, isArrowRight = false;
let incrX = 5;//increment x position of cpu
let isGameOver = false;
let intervalId = 0
let score = 0
//let balls = []
let myBall = new Ball (cpuX, cpuY)
let nextBall = {}




//---------------------
//creation of the balls
function passTheBall(){
    ctx.drawImage(ball, myBall.x, myBall.y, ballWidth, ballHeight)
    myBall.y = myBall.y + myBall.incrBall
    let staticBall = new Ball(cpuX, cpuY)
    ctx.drawImage(ball, staticBall.x + (cpuWidth/2), staticBall.y+(cpuHeight/2), ballWidth, ballHeight)

    if (myBall.y == userY){
        console.log(myBall.y == userY)
        nextBall = new Ball (cpuX, cpuY)
        
        
    
    }if (nextBall.y){
        ctx.drawImage(ball, nextBall.x, nextBall.y, ballWidth, ballHeight)
        nextBall.y = nextBall.y + nextBall.incrBall
        
    } if (nextBall.y == userY){
        myBall = new Ball (cpuX, cpuY)
    }
    //balls.push(new Ball(ball.x, ball.y, ball.incrBall))    
    }
    


//add background
function start(){
    startPage.style.display = 'none'
        gamePage.style.display = ''
        draw()
        animate() 
         
}

function restart (){

}

function draw(){
ctx.drawImage(court, 0, 0)
    //adding user player
ctx.drawImage(user, userX, userY, userWidth, userHeight)//530 moving line
//adding computer player
ctx.drawImage(cpu, cpuX, cpuY, cpuWidth, cpuHeight) //70 moving line

}


//Keyboard use
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



function animate(){
//auto animation cpu
ctx.clearRect(0, 0, canvas.width, canvas.height)
draw()
passTheBall()

//score
ctx.fillStyle = 'brown'
ctx.font = '24px Kaushan Script'
ctx.fillText(`Score is : ${score}`, 20, 30)
//Right hand side 
if (cpuX > canvas.width - cpuWidth ){
    incrX = -incrX
}

//Left hand
if(cpuX < 0){
    incrX = 5
}
cpuX = cpuX + incrX


//animate userPlayer
if(isArrowRight && userX + userWidth < canvas.width){
    userX = userX + 5
}
if(isArrowLeft && userX > 0){
    userX = userX - 5
}

//game over condition
if (isGameOver){
    cancelAnimationFrame(intervalId)
} else{
    intervalId = requestAnimationFrame(animate)
}


}
















window.addEventListener('load', ()=>{
    startPage.style.display = 'block'
    gamePage.style.display = 'none'
    gameOverPage.style.display = 'none'
    startBtn.addEventListener('click', ()=>{
        start()
    })
    /*gameOverPage.style.display('click', ()=>{
        restart()
    })*/
})
