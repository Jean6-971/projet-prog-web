let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x = canvas.width/2;
let y = canvas.height-60;
let dx = 2;
let dy = -2;
let rayonBall = 10;

let paddleHeight = 10;
let paddleWidth = 100;
let paddleX = (canvas.width-paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let JeuEnCours = true;

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

//Dessine la bille rouge
function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, rayonBall, 0, Math.PI*2);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
}

//dessine les différentes briques
function drawRects(){
    ctx.beginPath();
    for(let i = 20; i<530; i+=106){
        for(let j = 20; j<150; j+=50){
            ctx.rect(i, j, 86, 30);
            ctx.fillStyle = "#34B1F2";
            ctx.fill();
            ctx.closePath();
        }   
    }
}

//Définit la raquette
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight - 10, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
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
    drawPaddle();
    drawRects();
    drawBall();
    if(x-rayonBall<0 || x+rayonBall>canvas.width){
        dx=-dx;
    }
    if(y-rayonBall<0){
        dy=-dy;
    }    
    // Si la balle entre en collision avec la raquette
    if(y  > canvas.height-rayonBall-paddleHeight-10){
        if(x > paddleX && x < paddleX + paddleWidth){
            dy = -dy;
        }
           else {
                setTimeout(GameOver,400);
            }
    }

    if(rightPressed && paddleX+paddleWidth<canvas.width){
        paddleX += 4;
    }
    if(leftPressed && paddleX>0){
        paddleX -= 4;
    }
    x+=dx;
    y+=dy;
}
let interval = setInterval(draw, 10);
