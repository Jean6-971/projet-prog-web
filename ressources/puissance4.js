let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

// zone de jeu. "plateau"
function roundRect(x, y, w, h, radius)
{
    let r = x + w;
    let b = y + h;
    ctx.beginPath();
    ctx.fillStyle="#57B1A8";
    ctx.lineWidth="4";
    ctx.moveTo(x+radius, y);
    ctx.lineTo(r-radius, y);
    ctx.quadraticCurveTo(r, y, r, y+radius);
    ctx.lineTo(r, y+h-radius);
    ctx.quadraticCurveTo(r, b, r-radius, b);
    ctx.lineTo(x+radius, b);
    ctx.quadraticCurveTo(x, b, x, b-radius);
    ctx.lineTo(x, y+radius);
    ctx.quadraticCurveTo(x, y, x+radius, y);
    ctx.fill();
}
roundRect(60, 40, 480, 380, 35);

// Affiche une unique "balle"
function ball(posx, posy, rayon, couleur){
    ctx.beginPath();
    ctx.arc(posx, posy, 2*rayon, 0, Math.PI*2);
    ctx.fillStyle = couleur;
    ctx.fill();
    ctx.closePath();
}

//affiche les cases libres au début du jeu. 8 colonnes, 6 lignes
function drawGame(){
    for(let i = 90; i<570; i+=60){
        for(let j = 90; j<420; j+=55){
            ball(i, j, 8.5, "white" );
        }   
    }
}
drawGame();

//Récupération des coordonnées de la souris au clique
document.addEventListener("click", function(event){
    let x = event.clientX;
    let y = event.clientY;
    console.log("position x et y:", x, y);
});
