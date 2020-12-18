let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x = canvas.width/2;
let y = canvas.height-60;
let dx = 1.8;
let dy = -1.8;
let rayonBall = 10;

let espaceBord = 10;
let paddleX = 10;
let paddleY = 100;
Defilement1= (canvas.height-paddleY)/2;
Defilement2= (canvas.height-paddleY)/2;

let rightPressed = false;
let leftPressed = false;

let aPressed = false;
let ePressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


//si les touches sont appuyées
function keyDownHandler(event){
    if(event.key == "Right" || event.key =="ArrowRight"){
        rightPressed = true;
    }
    else if(event.key == "Left" || event.key == "ArrowLeft"){
        leftPressed = true;
    }
}

//si les touches sont relâchées
function keyUpHandler(event) {
    if(event.key == "Right" || event.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(event.key == "Left" || event.key == "ArrowLeft") {
        leftPressed = false;
    }
}

//Dessine la bille
function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, rayonBall, 0, Math.PI*2);
    ctx.fillStyle = "#EFF1F5";
    ctx.fill();
    ctx.closePath();
}

//Dessine la raquette du joueur 1
function drawPaddle1(){
    ctx.beginPath();
    ctx.rect(espaceBord, Defilement1, paddleX, paddleY);
    ctx.fillStyle = "#EFF1F5";
    ctx.fill();
    ctx.closePath();
}

//Dessine la raquette du joueur 2
function drawPaddle2(){
    ctx.beginPath();
    ctx.rect(canvas.width-espaceBord-paddleX, Defilement2, paddleX, paddleY);
    ctx.fillStyle = "#EFF1F5";
    ctx.fill();
    ctx.closePath();
}

function GameOver(){
    document.location.reload();
    clearInterval(interval);   
    alert("Game Over");  
}

//Gère l'ensemble des dessins
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle1();
    drawPaddle2();
    drawBall();
    if(x-rayonBall<0 || x+rayonBall>canvas.width){
        dx=-dx;
    }
    if(y-rayonBall<0 || y+rayonBall>canvas.height){
        dy=-dy;
    }    
 

    if(leftPressed && paddleX>0){
        Defilement1 -= 4;
    }
    if(rightPressed && paddleX+paddleWidth<canvas.width){
        Defilement1 += 4;
    }
    
    x+=dx;
    y+=dy;
}
let interval = setInterval(draw, 10);
