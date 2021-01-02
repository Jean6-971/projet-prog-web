var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var rect_w = canvas.width/10;
var rect_h = canvas.height/10;
var x_dir = [-1, 0, 1, 0];
var y_dir = [0, -1, 0, 1];
var level = 100;
var snake_color = "lime";
var tn = [];
var queue = [];
var frog = 3;
var map = [];
var MR = Math.random;
var X = 5 + (MR() * (rect_w - 10))|0;
var Y = 5 + (MR() * (rect_h - 10))|0;
var direction = MR() * 3 | 0;
var interval = 0;
var score = 0;
easy = 0;
var i, dir;

function addPerson(person, score) {
    const tablePersons = document.getElementById("tblPersons");
    const personRow = document.createElement("TR");
    const nameCell = document.createElement("TD");
    const scoreCell = document.createElement("TD");
    nameCell.innerText = person;
    scoreCell.innerText = score;
        
    personRow.appendChild(nameCell);
    personRow.appendChild(scoreCell);
    tablePersons.appendChild(personRow);
}

for (i = 0; i < rect_w; i++) {
    map[i] = [];
}

function random_apple() {
    var x, y;
    do {
        x = MR() * rect_w|0;
        y = MR() * rect_h|0;
    }
    while (map[x][y]);
    map[x][y] = 1;
    ctx.fillStyle = snake_color;
    ctx.strokeStyle = "red"
    ctx.strokeRect(x * 10+1, y * 10+1, 8, 8);
}
random_apple();

function set_game_speed() {
    if (easy) {
        X = (X+rect_w)%rect_w;
        Y = (Y+rect_h)%rect_h;
    }
    if (tn.length) {
        dir = tn.pop();
        if ((dir % 2) !== (direction % 2)) {
            direction = dir;
        }
    }
    if ((easy || (0 <= X && 0 <= Y && X < rect_w && Y < rect_h)) && 2 !== map[X][Y]) {
        if (1 === map[X][Y]) {
            score += 1;
            random_apple();
            frog++;
        }
        ctx.fillRect(X * 10, Y * 10, 9, 9);
        map[X][Y] = 2;
        queue.unshift([X, Y]);
        X+= x_dir[direction];
        Y+= y_dir[direction];
        if (frog < queue.length) {
            dir = queue.pop()
            map[dir[0]][dir[1]] = 0;
            ctx.clearRect(dir[0] * 10, dir[1] * 10, 10, 10);
        }
    }
    else if (!tn.length) {
        var txt;
        var person = prompt("Please enter your name:", "Harry Potter");
        if (person == null || person == "") {
            txt = "User cancelled the prompt.";
        } else {
            txt = "Hello " + person + "! How are you today?";
        }
        document.getElementById("alert").innerHTML = txt;
        var show_score = document.getElementById("gameover");
        show_score.innerHTML = "Perdu !<br /> <u>Votre score:</u> <b>"+score+"</b><br><input type='button' value='Rejouer' onclick='window.location.reload();' />";
        document.getElementById("canvas").style.display = 'none';
        window.clearInterval(interval);
        
    }
}

interval = window.setInterval(set_game_speed, level);

document.onkeydown = function(e) {
    var code = e.keyCode - 37;
    console.log(code);
    if (0 <= code && code < 4 && code !== tn[0]) {
        tn.unshift(code);
    }
}

addPerson(person, score);