
var must_redraw = false;

var 我_x = 5;
var 我_y = 4;

var 世界 = [
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

const 世界_width = 世界[0].length;
const 世界_height = 世界.length;


function do_redraw() {
    let newhtml = "";
    for (let y = 0; y < 世界.length; y++) {
        row = 世界[y];
        for (let x = 0; x < row.length; x++) {
            cell = row[x];
            if (x === 我_x && y === 我_y) {
                newhtml += "我";
            } else if (cell === 1) {
                newhtml += "墙";
            }
            else if (cell === 0) {
                newhtml += "。";
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
    let new_y = 我_y - 1;
    if (new_y >= 0 && 世界[new_y][我_x] == 0) {
        我_y = new_y;
        must_redraw = true;
    }
    if (must_redraw) {
        do_redraw();
    }
}
function go_down() {
    let new_y = 我_y + 1;
    if (new_y < 世界_height && 世界[new_y][我_x] == 0) {
        我_y = new_y;
        must_redraw = true;
    }
    if (must_redraw) {
        do_redraw();
    }
}
function go_left() {
    let new_x = 我_x - 1;
    if (new_x >= 0 && 世界[我_y][new_x] == 0) {
        我_x = new_x;
        must_redraw = true;
    }
    if (must_redraw) {
        do_redraw();
    }
}
function go_right() {
    let new_x = 我_x + 1;
    if (new_x < 世界_width && 世界[我_y][new_x] == 0) {
        我_x = new_x;
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
