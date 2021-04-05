class Ball{
    constructor(x, y, vx, vy ){
        this.x = x;
        this.y = y;
        this.velox = vx;
        this.veloy = vy;
        this.nextBall= false;
        this.ballReceived = false; 
        this.ballWidth = 50;
        this.ballHeight = 50;
    }
}