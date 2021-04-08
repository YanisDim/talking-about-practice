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
let finalscore = document.querySelector('#final-score')
//-------------------
//load all images

//background image
let court = new Image();
court.src = './Img/halfcourt.jpg';


let user = new Image();
//user.src = './Img/player1.png';


let cpu = new Image();
cpu.src = './Img/player4.png';

let ball = new Image();
ball.src = './Img/ball.png'

let gator = new Image();
gator.src = './Img/gatorade.png'

let deady = new Image();
deady.src = './Img/deady.png'

//ball touch sounds
let audio = new Audio()
audio.src = './sounds/mixkit-catching-a-basketball-ball-2081.wav'

let audioBounce = new Audio()
audioBounce.src= './sounds/mixkit-basketball-ball-hard-hit-2093.wav'
let audioMainPage = new Audio ()
audioMainPage.src = './sounds/Alan Parsons Project - eye in sky - 01 - Sirius.mp3'
audioMainPage.volume = 0.1
let audioGameOver = new Audio ()
audioGameOver.src = './sounds/Full Crate - Pump Up The Jam [Remix].mp3'
audioGameOver.volume= 0.1
let audioSip = new Audio ()
audioSip.src= './sounds/152363__cogitoandcradle__the-sound-someone-makes-after-take-n-a-drink-of-delicious-milk.wav'

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
let myBall = new Ball (cpuX+(cpuWidth/2), cpuY+(cpuHeight/2))
let nextBall = {}

//energy variables
let maxEnergy = 5;
let gatorBottle;
let gatorWidth = 46;
let bottleScore = 5;





//---------------------
//creation of the balls
function passTheBall(){
    ctx.drawImage(ball, myBall.x, myBall.y, ballWidth, ballHeight)
    myBall.y = myBall.y + myBall.incrBall
    let staticBall = new Ball(cpuX+(cpuWidth/2), cpuY+(cpuHeight/2))
    ctx.drawImage(ball, staticBall.x , staticBall.y, ballWidth, ballHeight)
    
    if (myBall.y >= userY && myBall.y < userY+10){
        nextBall = new Ball (cpuX+(cpuWidth/2), cpuY+(cpuHeight/2))
        
        
    
    }if (nextBall.y){
        ctx.drawImage(ball, nextBall.x , nextBall.y, ballWidth, ballHeight)
        nextBall.y = nextBall.y + nextBall.incrBall
        
    } if (nextBall.y >= userY && nextBall.y< userY+10){
        console.log('myBall is creatd')
        myBall = new Ball (cpuX+(cpuWidth/2), cpuY+(cpuHeight/2))
       
    }
    //balls.push(new Ball(ball.x, ball.y, ball.incrBall))    
    }


    function collision(){
        
        //this collision is for gamover when both balls touch the baseline
       /*if (myBall.y >= (userY+220) && myBall.y <= userY+240 || nextBall.y >= (userY+220) && nextBall.y <= userY+240 ){
            isGameOver = true 
            
        }*/ 
        if (myBall.y >= userY+70 && myBall.y<=userY+75 && (myBall.x >= userX )&& (myBall.x <= userX+userWidth  ) ){
            score ++
            audio.play()
            
            myBall.y = canvas.height + ballHeight
           
         } 
         if (nextBall.y >= userY+70 && nextBall.y <=userY+75  && nextBall.x >userX && nextBall.x < userX+userWidth ){
             score++
             audio.play()
             nextBall.y = canvas.height + ballHeight

         }

            
        

         
    }

    
    


//add background
function start(){
    startPage.style.display = 'none'
    audioMainPage.pause()
        gamePage.style.display = ''
        selectPlayer()
        draw()
        animate() 
        
        
}

function energy(){
    
    // condition. if (score is modulus 5. create new bottle)
    if (score >= bottleScore && maxEnergy < 5 && !gatorBottle){
        console.log('gatorBottle created')
        gatorBottle = new Gator
    }
    if (gatorBottle) {
        ctx.drawImage(gator,gatorBottle.gatorx, gatorBottle.gatory)
    }

    
    //decreasing energy
    if (maxEnergy <= 5 && maxEnergy > 0 && myBall.y > canvas.height && myBall.y < canvas.height + 10) maxEnergy--
    if (maxEnergy <= 5 && maxEnergy > 0 && nextBall.y > canvas.height && nextBall.y < canvas.height + 10) maxEnergy--
    //catching the bottle increase energy
    if (gatorBottle && maxEnergy < 5 && (userX+userWidth/2) >= gatorBottle.gatorx && (userX+userWidth/2) <= (gatorBottle.gatorx + gatorWidth)) {
            maxEnergy++
            audioSip.play()
            gatorBottle = null
            bottleScore = score + 5
            
            
        }
        

    
    if (maxEnergy == 0) isGameOver = true

    
    
    

}

function selectPlayer(){
    if (document.querySelector('#btn-radio1').checked){
        user.src = './Img/player1.png'
       }else if (document.querySelector('#btn-radio2').checked){
           user.src = './Img/player2.png'
       }
       else if (document.querySelector('#btn-radio3').checked){
           user.src='./Img/player3.png'
       } else{
           user.src = './Img/Marvel characters/deady.png'
       }
    
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
energy()
passTheBall()
collision()
marvelTransformation()


ctx.fillStyle = 'brown'
ctx.font = '24px Kaushan Script'
ctx.fillText(`Score is : ${score}`, 20, 30)
ctx.fillText(`Energy Level : ${maxEnergy}`, 20, 60)
//Right hand side 
if (cpuX > canvas.width - 120 ){
    incrX = -incrX
}

//Left hand
if(cpuX + 30 < 0){
    incrX = 5
}
cpuX = cpuX + incrX




//animate userPlayer
if(isArrowRight && userX + userWidth < canvas.width +40){
    userX = userX + 5
}
if(isArrowLeft && userX + 40 > 0){
    userX = userX - 5
}

//game over condition
if (isGameOver){
    cancelAnimationFrame(intervalId)
    gameOverPage.style.display = 'block'
    audioGameOver.play()
    startPage.style.display = 'none'
    gamePage.style.display = 'none'
    finalscore.textContent = `Your score is: ${score}`
} else{
    intervalId = requestAnimationFrame(animate)
}



}

function restart(){
    gameOverPage.style.display = 'none'
    audioGameOver.pause()
    isGameOver = false
    userX = 260 
    userY = canvas.height-270
    score = 0
    maxEnergy = 5
    start()
}














window.addEventListener('load', ()=>{
    startPage.style.display = 'block'
    audioMainPage.play()
    gamePage.style.display = 'none'
    gameOverPage.style.display = 'none'
    startBtn.addEventListener('click', ()=>{
        start()
    })
    restartBtn.addEventListener('click', ()=>{
        restart()
    })
   
})
