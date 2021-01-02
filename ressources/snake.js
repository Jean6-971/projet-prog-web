var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var rect_w = canvas.width/10;
var rect_h = canvas.height/10;
var x_dir = [-1, 0, 1, 0];
var y_dir = [0, -1, 0, 1];
var level = 50;
var snake_color = "lime";
var tn = [];
var queue = [];
var snkln = 3;
var map = [];
var MR = Math.random;
var X = 5 + (MR() * (rect_w - 10))|0;
var Y = 5 + (MR() * (rect_h - 10))|0;
var direction = MR() * 3 | 0;
var interval = 0;
var score = 0;
var i, dir;

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
    var gradient = ctx.createLinearGradient(canvas.width * MR(), canvas.height * MR(), canvas.width * MR(), canvas.height * MR());
    gradient.addColorStop("0" ,"yellow");
    gradient.addColorStop("0.5", "lime");
    gradient.addColorStop("1.0", "red");
    ctx.strokeStyle = gradient;
    ctx.strokeRect(x * 10+1, y * 10+1, 8, 8);
}
random_apple();

function set_game_speed() {
    if (tn.length) {
        dir = tn.pop();
        if ((dir % 2) !== (direction % 2)) {
            direction = dir;
        }
    }
    if ((0 <= X && 0 <= Y && X < rect_w && Y < rect_h) && 2 !== map[X][Y]) {
        if (1 === map[X][Y]) {
            score += 1;
            var score_actu = document.getElementById("scoractu");
            score_actu.innerHTML = "Votre score actuel:"+score;
            random_apple();
            snkln++;
        }
        ctx.fillRect(X * 10, Y * 10, 9, 9);
        map[X][Y] = 2;
        queue.unshift([X, Y]);
        X+= x_dir[direction];
        Y+= y_dir[direction];
        if (snkln < queue.length) {
            dir = queue.pop()
            map[dir[0]][dir[1]] = 0;
            ctx.clearRect(dir[0] * 10, dir[1] * 10, 10, 10);
        }
    }
    else if (!tn.length) {
        var show_score = document.getElementById("gameover");
        show_score.innerHTML = "<h1>Perdu !<br><br><u>Votre score : "+score+"<br><br><input type='button' value='Rejouer' onclick='window.location.reload();' />";
        document.getElementById("canvas").style.display = 'none';
        document.getElementById("scoractu").style.display = 'none';
        window.clearInterval(interval);
        
    }
}

interval = window.setInterval(set_game_speed, level);

document.onkeydown = function(e) {
    var code = 0;
    switch(e.code) {
        case "KeyS":
        case "ArrowDown":
            code = 3;
            break;
        case "KeyW":
        case "ArrowUp":
            code = 1;
            break;
        case "KeyA":
        case "ArrowLeft":
            code = 0;
            break;
        case "KeyD":
        case "ArrowRight":
            code = 2;
            break;
    }

    if (0 <= code && code < 4 && code !== tn[0]) {
        tn.unshift(code);
    }
}