
// player coordinates in the world
var world_x = 1;
var world_y = 1;

// player coordinates in the room
var player_x = 7;
var player_y = 5;

var player_act_cooldown = 0;

function do_redraw() {
    let screen = [];
    for (let y = 0; y < currentroom.map.length; y++) {
        let row = currentroom.map[y];
        let drawrow = [];
        for (let x = 0; x < row.length; x++) {
            let cell = row[x];
            if (cell === 50) {
                drawrow.push("<span class=\"wall\">墙</span>");
            } else if (cell === 51) {
                drawrow.push("<span class=\"water\">水</span>");
            } else if (cell === 52) {
                drawrow.push("<span class=\"fence\">栏</span>");
            } else if (cell === 53) {
                drawrow.push("<span class=\"mountain\">山</span>");
            } else if (cell === 54) {
                drawrow.push("<span class=\"tree\">树</span>");
            } else if (cell === 55) {
                drawrow.push("<span class=\"window\">窗</span>");
            } else if (cell === 0) {
                drawrow.push("<span class=\"grass\">⼂</span>");
            } else if (cell === 1) {
                drawrow.push("<span class=\"indoor\">⼂</span>");
            } else if (cell === 2) {
                drawrow.push("<span class=\"dirt\">⼂</span>");
            } else if (cell === 10) {
                drawrow.push("<span class=\"bridge\">桥</span>");
            } else if (cell === 11) {
                drawrow.push("<span class=\"grain\">禾</span>");
            } else {
                drawrow.push("？");
            }
        }
        screen.push(drawrow);
    }
    for (const actor of currentroom.actors) {
        screen[actor.y][actor.x] = actor.graphic;
    }
    screen[player_y][player_x] = "<span class=\"player\">我</span>";

    let newhtml = "";
    for (drawrow of screen) {
        newhtml += drawrow.join("") + "<br/>"
    }
    gameview.innerHTML = newhtml;
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

function world_act() {
    while (player_act_cooldown > 0) {
        let step = (player_act_cooldown < 100) ? player_act_cooldown : 100;
        player_act_cooldown -= step;
        for (actor of currentroom.actors) {
            actor.act(step);
        }
        do_redraw();
    }
}

function on_player_acted(player_action_cooldown) {
    player_act_cooldown = 100;
    world_act();
}

function on_successful_player_move() {
    on_player_acted(100);
}

function move_player(new_x, new_y) {
    reset_status();
    reset_context_buttons();
    for (const actor of currentroom.actors) {
        if (new_x === actor.x && new_y === actor.y) {
            if (actor.interact_function == null) {
                message("You bump into the " + actor.name + ".");
                return;
            } else {
                if (!actor.interact_function()) {
                    return;
                }
            }
        }
    }
    if (new_x < 0) {
        if (go_room(world_x - 1, world_y)) {
            player_x = room_width - 1; 
            on_successful_player_move();
        }
    } else if (new_x >= room_width) {
        if (go_room(world_x + 1, world_y)) {
            player_x = 0;
            on_successful_player_move();
        }
    } else if (new_y < 0) {
        if (go_room(world_x, world_y - 1)) {
            player_y = room_height - 1;
            on_successful_player_move();
        }
    } else if (new_y >= room_height) {
        if (go_room(world_x, world_y + 1)) {
            player_y = 0;
            on_successful_player_move();
        }
    } else if (currentroom.map[new_y][new_x] < 50) {
        player_x = new_x;
        player_y = new_y;
        on_successful_player_move();
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
    currentroom = world[world_y][world_x];

    gameview = document.getElementById("gameview");
    statusinfo = document.getElementById("status");
    contextbuttons = document.getElementById("context-buttons");

    document.getElementById("button-up").onclick = go_up;
    document.getElementById("button-down").onclick = go_down;
    document.getElementById("button-left").onclick = go_left;
    document.getElementById("button-right").onclick = go_right;

    do_redraw();
}
