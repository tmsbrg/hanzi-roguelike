
var must_redraw = false;

var player_x = 5;
var player_y = 4;

var world = [
    [ 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, ],
    [ 1,0,0,0,0,0,0,0,0,1,0,0,0,0,1, ],
    [ 1,0,0,0,0,0,0,0,0,1,0,0,0,0,1, ],
    [ 1,0,0,0,0,0,0,0,0,1,0,0,0,0,0, ],
    [ 1,0,0,0,0,0,0,0,0,1,0,0,0,0,1, ],
    [ 1,0,0,0,0,0,0,0,0,1,0,0,0,0,1, ],
    [ 1,0,0,0,0,0,0,0,0,1,1,0,1,1,1, ],
    [ 1,0,0,0,0,0,0,0,0,1,0,0,0,0,1, ],
    [ 0,0,0,0,0,0,0,0,0,1,0,0,0,0,1, ],
    [ 1,0,0,0,0,0,0,0,0,0,0,0,0,0,1, ],
    [ 1,0,0,0,0,0,0,0,0,1,0,0,0,0,1, ],
    [ 1,0,0,0,0,0,0,0,0,1,0,0,0,0,1, ],
    [ 1,0,0,0,0,0,0,0,0,1,0,0,0,0,1, ],
    [ 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, ]
];
/*
var world = [
    [ 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, ],
    [ 1,0,0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1, ],
    [ 1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1, ],
    [ 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0, ],
    [ 1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1, ],
    [ 1,0,0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1, ],
    [ 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1, ],
    [ 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1, ],
    [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1, ],
    [ 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1, ],
    [ 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1, ],
    [ 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1, ],
    [ 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1, ],
    [ 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1, ],
    [ 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1, ],
    [ 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, ]
];
*/

const world_width = world[0].length;
const world_height = world.length;


function do_redraw() {
    let newhtml = "";
    for (let y = 0; y < world.length; y++) {
        row = world[y];
        for (let x = 0; x < row.length; x++) {
            cell = row[x];
            if (x === player_x && y === player_y) {
                newhtml += "我";
            } else if (cell === 1) {
                newhtml += "墙";
            }
            else if (cell === 0) {
                //newhtml += "。";
                newhtml += "⼂";
            }
            else {
                newhtml += "？";
            }
        }
        newhtml += "<br/>"
    }
    gameview.innerHTML = newhtml;
    must_redraw = false;
}

function go_up() {
    let new_y = player_y - 1;
    if (new_y >= 0 && world[new_y][player_x] == 0) {
        player_y = new_y;
        must_redraw = true;
    }
    if (must_redraw) {
        do_redraw();
    }
}
function go_down() {
    let new_y = player_y + 1;
    if (new_y < world_height && world[new_y][player_x] == 0) {
        player_y = new_y;
        must_redraw = true;
    }
    if (must_redraw) {
        do_redraw();
    }
}
function go_left() {
    let new_x = player_x - 1;
    if (new_x >= 0 && world[player_y][new_x] == 0) {
        player_x = new_x;
        must_redraw = true;
    }
    if (must_redraw) {
        do_redraw();
    }
}
function go_right() {
    let new_x = player_x + 1;
    if (new_x < world_width && world[player_y][new_x] == 0) {
        player_x = new_x;
        must_redraw = true;
    }
    if (must_redraw) {
        do_redraw();
    }
}

function on_key(e) {
    const key = e.key.toUpperCase();

    if (key === "W") {
        go_up();
    } else if (key === "S") {
        go_down();
    } else if (key === "A") {
        go_left();
    } else if (key === "D") {
        go_right();
    }
}

document.addEventListener('keydown', on_key);

window.onload = function() {
    gameview = document.getElementById("gameview");

    document.getElementById("button-up").onclick = go_up;
    document.getElementById("button-down").onclick = go_down;
    document.getElementById("button-left").onclick = go_left;
    document.getElementById("button-right").onclick = go_right;

    do_redraw();
}
