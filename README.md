# Talkin' About Practice! 
[Link Deploy](http://github.com)


## Description
Do you want to be in the Starting Five next game?? 

If you want to be a part of the team you need to practice! In this game you will work on your basketball fundamentals and more specifically your passing game. You need to move on the court baseline (horizontally) in order to catch all the passes made by your teammate. The more passes you catch the more points you will earn. If you don't catch the ball the coach will take you out...

Catch as many as you can to become the future Star of the team!


## MVP
* The User player moves horizontally at the bottom of the screen
* The Computer player is facing the user player at the top op the page and moves also horizontally
* The computer player throws from random places the ball to the User player
* Every time User player catches the ball the other player throws another pass
* Every caught pass increases the score by 10 points
* If the User player doesn't catch the ball, the game ends


## Backlog
* Choose between different players to play the game
* Different types of balls with different scoring points for each
* Gatorade (Energy system) - refuels health catching the drinks to remain more in the game
* High Scores shown at the end of the game (Starting Five)
* Ranking score (level 1: noob, ... last level: you're the G.O.A.T)


## Data structure

## main.js
- splashScreen(){}
- gameScreen () {}
- gameoverScreen () {}

## game.js

* Game(){}
* drawCanvas(){}
* StarLoop (){}
* checkCollisions(){}
* updateCanvas(){}
* clearCanvas (){}
* GameOver(){}

## userPlayer.js

* player(){x, y, direction, size}
* draw(){}
* move(){}
* catchPass(){}
* checkScreenCollision(){}

## cpuPlayer.js

* player(){x, y, direction, size}
* draw(){}
* move(){}
* throwPass(){}

## ball.js
* draw(){}
* move(){}
* checkCollision(){}


## States y States Transitions

* build a SplashScreen(){}
* build a GameScreen (){}
* build a GameOverScreen(){}




## Task
* main - buildDom
* main - buildSplashScreen
* main - addEventListener
* main - buildGameScreen
* main - buildGameOverScreen
* game - startLoop
* game - buildCanvas
* game - updateCanvas
* game - drawCanvas
* UserPlayer - draw
* UserPlayer - move
* CpuPlayer - draw
* CpuPlayer - move
* Ball - draw
* CpuPlayer - throwsBall
* game - checkCollision(){}
* game - GameOver
* game - addEventListener



## Additional Links


### Trello
[Link url](https://trello.com)


### Slides
[Link Slides.com](http://slides.com)