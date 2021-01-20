let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let MR = Math.random;

let rect_w = canvas.width/10;
let rect_h = canvas.height/10;
let snkln = 3;
let snake_color = "lime";

let X = 5 + (MR() * (rect_w - 10))|0;
let Y = 5 + (MR() * (rect_h - 10))|0;
let x_dir = [-1, 0, 1, 0];
let y_dir = [0, -1, 0, 1];

let carte = [];
let tmpdir = [];
let direction = MR() * 3 | 0;
let queue = [];

let level = 100;
let interval = 0;
let score = 0;
let i = 0;
let dir;

let score_actu = document.getElementById("scoractu");
score_actu.innerHTML = "Votre score actuel : " + score;

while (i < rect_w) {
    carte[i] = [];
    i++
}

function random_apple() {
    let x, y;
    x = MR() * rect_w|0;
    y = MR() * rect_h|0;
    carte[x][y] = 1;
    ctx.fillStyle = snake_color;
    let gradient = ctx.createLinearGradient(canvas.width * MR(), canvas.height * MR(), canvas.width * MR(), canvas.height * MR());
    gradient.addColorStop("0" ,"yellow");
    gradient.addColorStop("0.5", "lime");
    gradient.addColorStop("1.0", "red");
    ctx.strokeStyle = gradient;
    ctx.strokeRect(x * 10+1, y * 10+1, 8, 8);
}
random_apple();

function set_game_speed() {
    if (tmpdir.length) {
        dir = tmpdir.pop();
        if ((dir % 2) !== (direction % 2)) {
            direction = dir;
        }
    }
    if ((0 <= X && 0 <= Y && X < rect_w && Y < rect_h) && 2 !== carte[X][Y]) {
        if (1 === carte[X][Y]) {
            score += 1;
            score_actu.innerHTML = "Votre score actuel : " + score;
            random_apple();
            snkln++;
        }
        ctx.fillRect(X * 10, Y * 10, 9, 9);
        carte[X][Y] = 2;
        queue.unshift([X, Y]);
        X += x_dir[direction];
        Y += y_dir[direction];
        if (snkln < queue.length) {
            dir = queue.pop()
            carte[dir[0]][dir[1]] = 0;
            ctx.clearRect(dir[0] * 10, dir[1] * 10, 10, 10);
            
        }
    }
    else if (!tmpdir.length) {
        let show_score = document.getElementById("gameover");
        document.getElementById("canvas").remove();
        document.getElementById("scoractu").remove();
        show_score.innerHTML = "<h1>Perdu !<br><br><u>Votre score : "+score+"<br><br><input type='button' value='Rejouer' onclick='window.location.reload();' />";
        window.clearInterval(interval);
    }
}

interval = window.setInterval(set_game_speed, level);

document.onkeydown = function(e) {
    let code = 0;
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
        case "Space":
            code = 4;
            break;
        case "KeyK":
            code = 5;
            break;
        case "KeyL":
            code = 6;
            break;
        case "KeyB":
            code = 7;
            break;
        case "KeyP":
            code = 8;
            break;
    }

    if (0 <= code && code < 4 && code !== tmpdir[0]) {
        tmpdir.unshift(code);
    }
    else if (4 == code) {
        if (interval) {
            window.clearInterval(interval);
            interval = 0;
        }
        else {
            interval = window.setInterval(set_game_speed, level);
        }
    }
    else if (5 == code) {
        window.clearInterval(interval);
        level = 150;
        interval = window.setInterval(set_game_speed, level); 
    }
    else if (6 == code) {
        window.clearInterval(interval);
        level = 100;
        interval = window.setInterval(set_game_speed, level); 
    }
    else if (7 == code) {
        window.clearInterval(interval);
        level = 50;
        interval = window.setInterval(set_game_speed, level); 
    }
    else if (8 == code) {
        window.clearInterval(interval);
        level = 10;
        interval = window.setInterval(set_game_speed, level); 
    }
}
