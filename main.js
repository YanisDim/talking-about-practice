//canvas
let canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');
canvas.style.border = '5px solid white';
//the DOM pages selectors
let startPage = document.querySelector('#start-page')
let gamePage = document.querySelector('#game-page')
let gameOverPage = document.querySelector('#game-over-page')
let gameWinningPage = document.querySelector('#game-winning-page')
//and the buttons selectors
let startBtn = document.querySelector('#start-btn')
let restartBtn = document.querySelector('#restart')
let finalscore = document.querySelector('#final-score')
//load images
let court = new Image();
court.src = './Img/halfcourt.jpg';
let user = new Image();
let cpu = new Image();
cpu.src = './Img/player4.png';
let ball = new Image();
ball.src = './Img/ball.png'
let gator = new Image();
gator.src = './Img/gatorade.png'
//sounds
let audio = new Audio()
audio.src = './sounds/mixkit-catching-a-basketball-ball-2081.wav'
let audioBounce = new Audio()
audioBounce.src= './sounds/mixkit-basketball-ball-hard-hit-2093.wav'
let audioMainPage = new Audio ()
audioMainPage.src = './sounds/Alan Parsons Project - eye in sky - 01 - Sirius.mp3'
audioMainPage.volume = 0.1
let audioGame = new Audio ()
audioGame.src = './sounds/Full Crate - Pump Up The Jam [Remix].mp3'
audioGame.volume= 0.1
let audioSip = new Audio ()
audioSip.src= './sounds/152363__cogitoandcradle__the-sound-someone-makes-after-take-n-a-drink-of-delicious-milk.wav'
let audioBuzzer = new Audio ()
audioBuzzer.src= './sounds/buzzer.wav'
audioBuzzer.volume = 0.1
let teammateApplause = new Audio ()
teammateApplause.src= './sounds/teammateaplause.wav'
teammateApplause.volume = 0.1
//Variables creation
let userX = 260, userY= canvas.height-270, userIncr= 5, userWidth=150, userHeight = 150 //User is our character
let cpuX = 260,  cpuWidth = 150, cpuHeight=150, cpuY = 70; //CPU is the compputer player
let ballHeight = 50, ballWidth = 50
let isArrowLeft = false, isArrowRight = false;
let incrX = 5;
let isGameWin = false;
let isGameOver = false;
let intervalId = 0
let score = 0
let myBall = new Ball (cpuX+(cpuWidth/2), cpuY+(cpuHeight/2))
let nextBall = {}
let maxEnergy = 5;
let gatorBottle;// gator is short for gatorade
let gatorWidth = 46;
let bottleScore = 5;

//creation of the balls and movement (here three balls are created in total)
function passTheBall(){
    ctx.drawImage(ball, myBall.x, myBall.y, ballWidth, ballHeight)
    myBall.y = myBall.y + myBall.incrBall
    let staticBall = new Ball(cpuX+(cpuWidth/2), cpuY+(cpuHeight/2))
    ctx.drawImage(ball, staticBall.x , staticBall.y, ballWidth, ballHeight)
    if (myBall.y >= userY && myBall.y < userY+10){
        nextBall = new Ball (cpuX+(cpuWidth/2), cpuY+(cpuHeight/2))
    }
    if (nextBall.y){
        ctx.drawImage(ball, nextBall.x , nextBall.y, ballWidth, ballHeight)
        nextBall.y = nextBall.y + nextBall.incrBall 
    } 
    if (nextBall.y >= userY && nextBall.y< userY+10){
        myBall = new Ball (cpuX+(cpuWidth/2), cpuY+(cpuHeight/2)) 
    }
    }

// collision between the balls and the player to increment score
function collision(){
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

//start function displaying the game page
function start(){
    startPage.style.display = 'none'
    audioMainPage.pause()
    audioGame.play()
    gamePage.style.display = ''
    selectPlayer()
    draw()
    animate()        
}

function energyTracking(){
// condition. if (score is modulus 5. create new bottle)
    if (score >= bottleScore && maxEnergy < 5 && !gatorBottle){
        gatorBottle = new Gator
    }
    if (gatorBottle){
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
//GameOverCondition
    if (maxEnergy == 0){
        audioGame.pause()
        audioBuzzer.play()
        isGameOver = true
    }
//Game Winning condition
    if (score == 300){
        audioGame.pause()
        teammateApplause.play()
        isGameWin = true
    }
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
           user.src='./Img/deady.png'
       }
}

function draw(){
    ctx.drawImage(court, 0, 0)
    ctx.drawImage(user, userX, userY, userWidth, userHeight)
    ctx.drawImage(cpu, cpuX, cpuY, cpuWidth, cpuHeight)
}

function marvelTransformation(){
    if (score > 275){
        user.src = './Img/goat.png'
    } else if (score > 250){
        user.src = './Img/jordan.png'
    } else if (score > 225){
        user.src = './Img/hulk.png'
    } else if (score > 200){
        user.src = './Img/captainmarvel.png'
    } else if (score > 175){
        user.src = './Img/captainamerica.png'
    } else if (score > 150){
        user.src = './Img/blackwidow.png'
    } else if (score > 125){
        user.src = './Img/blackpanther.png'
    } else if (score > 100){
        user.src = './Img/wolvy.png'
    } else if (score > 75){
        user.src = './Img/storm.png'
    } else if (score > 50){
        user.src = './Img/spiderman.png'
    } else if (score > 25){
        user.src = './Img/ironman.png'
    }
    
}

//Keyboard use
document.addEventListener('keydown', (event)=>{
    if(event.code == 'ArrowRight'){
        isArrowRight = true
        isArrowLeft = false
    } else if (event.code =='ArrowLeft'){
        isArrowRight = false
        isArrowLeft = true
    }

})
document.addEventListener('keyup', (event)=>{
    isArrowRight = false
    isArrowLeft = false
})

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    draw()
    energyTracking()
    passTheBall()
    collision()
    marvelTransformation()
    ctx.fillStyle = 'brown'
    ctx.font = '24px Kaushan Script'
    ctx.fillText(`Score is : ${score}`, 20, 30)
    ctx.fillText(`Energy Level : ${maxEnergy}`, 20, 60)
//checking right hand side of the computer player
    if (cpuX > canvas.width - 120 ){
        incrX = -incrX
    }
//Left hand side checking
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

//game over setup
    if (isGameOver){
        cancelAnimationFrame(intervalId)
        gameOverPage.style.display = 'block'
        startPage.style.display = 'none'
        gamePage.style.display = 'none'
        gameWinningPage.style.display = 'none'
        finalscore.textContent = `Your score is: ${score}`
    } else if (isGameWin){
        cancelAnimationFrame(intervalId)
        gameWinningPage.style.display = 'block'
        startPage.style.display = 'none'
        gamePage.style.display = 'none'
        gameOverPage.style.display= 'none'
    } else{
        intervalId = requestAnimationFrame(animate)
    }
}

function restart(){
    gameOverPage.style.display = 'none'
    isGameOver = false
    gameWinningPage.style.display='none'
    isGameWin = false
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
    gameWinningPage.style.display = 'none'
    startBtn.addEventListener('click', ()=>{
        start()
    })
    restartBtn.addEventListener('click', ()=>{
        restart()
    })
   
})
