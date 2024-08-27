
// player coordinates in the room
var player_x = 7;
var player_y = 5;

// player coordinates in the world
var world_x = 0;
var world_y = 0;

function do_redraw() {
    let newhtml = "";
    for (let y = 0; y < currentroom.map.length; y++) {
        row = currentroom.map[y];
        for (let x = 0; x < row.length; x++) {
            cell = row[x];
            if (x === player_x && y === player_y) {
                newhtml += "我";
            } else if (cell === 1) {
                newhtml += "墙";
            } else if (cell === 2) {
                newhtml += "水";
            } else if (cell === 3) {
                newhtml += "栏";
            } else if (cell === 4) {
                newhtml += "山";
            } else if (cell === 5) {
                newhtml += "树";
            } else if (cell === 0) {
                //newhtml += "。";
                newhtml += "⼂";
            } else {
                newhtml += "？";
            }
        }
        newhtml += "<br/>"
    }
    gameview.innerHTML = newhtml;
    must_redraw = false;
}

// go to a different area in the world
// returns true on success, otherwise false
function go_room(new_world_x, new_world_y) {
    if (new_world_x < 0 || new_world_x >= world_width ||
        new_world_y < 0 || new_world_y >= world_height || 
        world[new_world_y][new_world_x] === null) {
        return false;
    }
    world_x = new_world_x;
    world_y = new_world_y;
    currentroom = world[world_y][world_x];
    return true;
}

function move_player(new_x, new_y) {
    if (new_x < 0) {
        if (go_room(world_x - 1, world_y)) {
            player_x = room_width - 1; 
            do_redraw();
        }
    } else if (new_x >= room_width) {
        if (go_room(world_x + 1, world_y)) {
            player_x = 0;
            do_redraw();
        }
    } else if (new_y < 0) {
        if (go_room(world_x, world_y - 1)) {
            player_y = room_height - 1;
            do_redraw();
        }
    } else if (new_y >= room_height) {
        if (go_room(world_x, world_y + 1)) {
            player_y = 0;
            do_redraw();
        }
    } else if (currentroom.map[new_y][new_x] == 0) {
        player_x = new_x;
        player_y = new_y;
        do_redraw();
    }
}

function go_up() {
    move_player(player_x, player_y - 1);
}

function go_down() {
    move_player(player_x, player_y + 1);
}

function go_left() {
    move_player(player_x - 1, player_y);
}

function go_right() {
    move_player(player_x + 1, player_y);
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
