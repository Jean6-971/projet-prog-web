var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height/2;
var dx = 2;
var dy = -2;
var squareHeight = 20;
var rightPressed = false;
var leftPressed = false;
var AppleX = Math.floor((Math.random() * (canvas.width-40))+20)
var AppleY = Math.floor((Math.random() * (canvas.height-40))+20)

function drawSquare() {
    ctx.beginPath();
    ctx.rect(x, y, squareHeight, squareHeight);
    ctx.fillStyle = "lime";
    ctx.fill();
    ctx.closePath();
}

function drawApple() {
    ctx.beginPath();
    ctx.arc(AppleX, AppleY, 10, 0, Math.PI*2, false);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}
  
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSquare();
    drawApple()
    if(y + dy > canvas.height-squareHeight || y + dy < 0) {
        
    }
    if(x + dx > canvas.width-squareHeight || x + dx < 0) {
        
    }
    if(rightPressed) {
        x += dx;
        if (x + squareHeight > canvas.width){
            x = canvas.width - squareHeight;
        }
    }
    else if(leftPressed) {
        x -= dx;
        if (x < 0){
            x = 0;
        }
    }


}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

setInterval(draw, 10);