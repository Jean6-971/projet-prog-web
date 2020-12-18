let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x = canvas.width/2;
let y = canvas.height-60;
let dx = -1.8;
let dy = 1.8;
let rayonBall = 10;

let espaceBord = 10;
let paddleX = 10;
let paddleY = 100;
let Defilement1= (canvas.height-paddleY)/2;
let Defilement2= (canvas.height-paddleY)/2;

let downPressed = false;
let upPressed = false;

let zPressed = false;
let sPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


//si les touches sont appuyées
function keyDownHandler(event){
    if(event.keyCode == "38" ){ //flèche du haut
        upPressed = true;
    }
    else if( event.keyCode == "40"){ //flèche du bas
        downPressed = true;
    }
    else if(event.keyCode == "90"){ //touche z
        zPressed = true;
    }
    else if(event.keyCode == "83"){ //touche s
        sPressed = true;
    }
}

//si les touches sont relâchées
function keyUpHandler(event) {
    if(event.keyCode == "38") {
        upPressed = false;
    }
    else if(event.keyCode == "40") {
        downPressed = false;
    }
    else if(event.keyCode == "90"){ //touche z
        zPressed = false;
    }
    else if(event.keyCode == "83"){ //touche s
        sPressed = false;
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

//Dessine la délimitation du terrain
function drawTiret(){
    posx=canvas.width/2 - 2;
    ctx.beginPath();
    for(let j = 20; j<canvas.height-20; j+=20){
        ctx.rect(posx, j, 4, 10);
        ctx.fillStyle = "#EFF1F5";
        ctx.fill();
    }
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
    drawTiret();
    drawPaddle1();
    drawPaddle2();
    drawBall();
    if(y-rayonBall<0 || y+rayonBall>canvas.height){
        dy=-dy;
    }    
    
    // Si la balle entre en collision avec la raquette Gauche
    if(x < espaceBord+paddleX+rayonBall ){
        if(y>Defilement1){
            dx=-dx
        }
    }
    
    // Si la balle entre en collision avec la raquette Droite
    if(x  > canvas.width-espaceBord-paddleX-rayonBall){
        if(y > Defilement2){
            dx = -dx;
        }
    }
           
    // Contrôle clavier
    if(upPressed && Defilement1>0){
        Defilement1 -= 4;
        console.log("haut");
    }
    if(downPressed && Defilement1+paddleY<canvas.height){
        Defilement1 += 4;
        console.log("bas");
    }
    if(zPressed && Defilement2>0){
        Defilement2 -= 4;
    }
    if(sPressed && Defilement2+paddleY<canvas.height){
        Defilement2 += 4;
    }
    
    y+=dy;
    x+=dx;
    
}
let interval = setInterval(draw, 10);
