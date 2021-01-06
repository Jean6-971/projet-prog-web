let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let dx = 2;
let dy = 2;

//angle aléatoire au début
let aléat1 = Math.random();
let aléat2 = Math.random();
if(aléat1<0.5){
    dx=-2;
}
if(aléat2<0.5){
    dy=-2;
}


let x = canvas.width/2 ;
let y = Math.floor((Math.random() * (canvas.height-40))+20);

let rayonBall = 10;

let espaceBord = 10;
let paddleX = 10;
let paddleY1 = 100;
let paddleY2 = 100;
let Defilement1= (canvas.height-paddleY1)/2;
let Defilement2= (canvas.height-paddleY2)/2;

let downPressed = false;
let upPressed = false;

let zPressed = false;
let sPressed = false;

let spacePressed = false;

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
    else if(event.keyCode == "4"){ // touche espace
        spacePressed = true;
    }
}

//si les touches sont relâchées
function keyUpHandler(event) {
    if(event.keyCode == "38") { //flèche du haut
        upPressed = false;
    }
    else if(event.keyCode == "40") { //flèche du bas
        downPressed = false;
    }
    else if(event.keyCode == "90"){ //touche z
        zPressed = false;
    }
    else if(event.keyCode == "83"){ //touche s
        sPressed = false;
    }
    else if(event.keyCode == "4"){ //touche espace
        spacePressed = false;
    }
}

//Dessine la bille
function drawBall(x, y, rayonBall, couleur){
    ctx.beginPath();
    ctx.arc(x, y, rayonBall, 0, Math.PI*2);
    ctx.fillStyle = couleur;
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
    ctx.rect(espaceBord, Defilement1, paddleX, paddleY1);
    ctx.fillStyle = "#EFF1F5";
    ctx.fill();
    ctx.closePath();
}

//Dessine la raquette du joueur 2
function drawPaddle2(){
    ctx.beginPath();
    ctx.rect(canvas.width-espaceBord-paddleX, Defilement2, paddleX, paddleY2);
    ctx.fillStyle = "#EFF1F5";
    ctx.fill();
    ctx.closePath();
}

function Game(joueur1, joueur2){
    ctx.font='30px Calibri';
    if(joueur1<5 && joueur2<5){
        ctx.fillText("J1 : " + joueur1, canvas.width/4 -30, 40);
        ctx.fillText("J2 : " + joueur2, 3*canvas.width/4 -30, 40);
        ctx.fillStyle = "#EFF1F5";
   }
    else if(joueur1==5){
        ctx.fillText(joueur1, canvas.width/4 -9 , 40);
        setInterval(GameOver("Joueur 1 "), 400);
        ctx.fillStyle = "#EFF1F5";
   }
    else if(joueur2==5){
        ctx.fillText(joueur2, 3*canvas.width/4 -7, 40);
        setInterval(GameOver("Joueur 2 "), 400);
        ctx.fillStyle = "#EFF1F5";
    } 
}


function GameOver(joueurGagnant){
    document.location.reload();
    clearInterval(interval); 
    alert(joueurGagnant + "a gagné !" );   
}



//Gère l'ensemble des dessins et le jeu
let ptsjoueur1 = 0;
let ptsjoueur2 = 0;



function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawTiret();
    drawPaddle1();
    drawPaddle2();
    drawBall(x, y, rayonBall, "#EFF1F5");
    Game(ptsjoueur1, ptsjoueur2);
    
    // Gère le rebond de la balle en bas et en haut
    if(y-rayonBall<0 || y+rayonBall>canvas.height){
        dy=-dy;
    }    

    // Si la balle entre en collision avec la raquette Gauche
    if(x < espaceBord+paddleX+rayonBall ){
        if(y>Defilement1 && y<Defilement1+paddleY1){
            dx=-dx
        }
        else {
            ptsjoueur2+=1;
            x = canvas.width/2;
            y = Math.floor((Math.random() * (canvas.height-40))+20);
            Defilement1= (canvas.height-paddleY1)/2;
            Defilement2= (canvas.height-paddleY1)/2;
        }
    }
    // Si la balle entre en collision avec la raquette Droite
    if(x  > canvas.width-espaceBord-paddleX-rayonBall){
        if(y > Defilement2 && y<Defilement2+paddleY2){
            dx = -dx;
        }
        else {
            ptsjoueur1+=1;
            x = canvas.width/2;
            y = Math.floor((Math.random() * (canvas.height-40))+20);
            Defilement1= (canvas.height-paddleY2)/2;
            Defilement2= (canvas.height-paddleY2)/2;
        }
    }
           
    // Contrôle clavier
    if(upPressed && Defilement2>0){
        Defilement2 -= 4;
    }
    if(downPressed && Defilement2+paddleY2<canvas.height){
        Defilement2 += 4;
    }
    if(zPressed && Defilement1>0){
        Defilement1 -= 4;
    }
    if(sPressed && Defilement1+paddleY1<canvas.height){
        Defilement1 += 4;
    }
    
    y+=dy;
    x+=dx;
    
}

let interval = setInterval(draw, 10);
