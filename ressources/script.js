function ReglesPong(){
    alert("Pour jouer à Pong : \nJoueur 1 : Z et S \nJoueur 2 : flèche du haut et flèche du bas");
}

function ReglesSnake(){
    alert("Pour jouer à Snake : \nUtilisez les flèches directionnelles ou les touches Z,Q,S,D pour déplacer le serpent afin de manger les pommes \nEspace pour faire pause \nLes touches K,L,B,P permettent de changer la difficulté (respectivement Facile, Moyen, Difficile, Impossible)");
}

function GetPseudo(){
    var pseudo = prompt("Avant de jouer, il vous faut un pseudo !")
    
        if (pseudo)  { 
            alert  ("A vous de jouer "+ pseudo + "!"); }
        else if (pseudo==""){
            alert ("il faut un pseudo ! ") //vérifie qu'un pseudo a été renseigné  avant de faire ok 
            GetPseudo();
        }
        else //cas d'annulation 
        {
            window.open(index.html); 
        }      
}