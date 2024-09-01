class Room {
    constructor(map, actors) {
        this.map = map;
        this.actors = actors;
    }
}

class Actor {
    constructor(graphic, name, x, y, interact_function = null) {
        this.graphic = graphic;
        this.name = name;
        this.x = x;
        this.y = y;
        this.interact_function = interact_function;
    }
}

function message(msg) {
    statusinfo.innerHTML += "<p>" + msg + "</p>";
}

function reset_status() {
    statusinfo.innerHTML = "";
}

function messenger(msg) {
    return function () { message(msg); }
}

function say(msg) {
    return function () { message(this.name + ": " + msg); }
}

function add_context_buttons(buttoninfo) {
    buttonLoop: for (button of buttoninfo) {
        let btn = document.createElement("button");
        btn.innerHTML = button[0];
        btn.addEventListener("click", button[1]);
        contextbuttons.appendChild(btn);
    }
}

function reset_context_buttons() {
    contextbuttons.innerHTML = null;
}

function set_context_buttons(text, buttoninfo) {
    reset_context_buttons();
    contextbuttons.textContent = text;
    add_context_buttons(buttoninfo);
}

function mother_subject_father() {
    message("Mother: Your father has been getting more and more ill recently. I'm afraid only your aunt Leane may know how to make him better again.");
    mother_subjects.set("aunt Leane", function() {
        message("Mother: She lives on a farm in the hills east of the river. It's a bit of a walk, I'm afraid. I hope you're willing to get to her for your father's sake.");
    });
    set_context_buttons("Subjects:", mother_subjects);
}

mother_subjects = new Map();
mother_subjects.set("father", mother_subject_father);
mother_subjects.set("bye", function() {
    message("Mother: See you soon, son. And remember to eat your vitamins!");
    reset_context_buttons();
});

function talk_to_mother() {
    message("You talk to your mother.");
    set_context_buttons("Subjects:", mother_subjects);
    return false;
}

function open_door() {
    message("You open the door.");
    return true;
}

var room10 = new Room([
    [ 52,52,52,52,52,52,52,52,52,52,52,52,52,52,52, ],
    [ 52,00,00,00,00,00,00,00,00,00,00,00,00,00,52, ],
    [ 52,00,00,00,00,00,00,00,00,00,00,00,00,00,52, ],
    [ 52,00,50,50,50,50,50,50,50,50,00,00,54,00,52, ],
    [ 52,00,50,01,01,50,01,01,01,50,00,00,00,00,52, ],
    [ 52,00,50,01,01,50,01,01,01,55,00,00,00,00,52, ],
    [ 52,00,55,01,01,01,01,01,01,50,00,11,11,00,52, ],
    [ 52,00,50,50,50,50,55,50,01,50,00,11,11,00,52, ],
    [ 52,00,00,00,00,00,00,00,02,00,00,00,00,00,52, ],
    [ 52,00,00,00,00,00,00,02,02,00,50,50,50,00,52, ],
    [ 52,00,00,54,00,00,00,02,02,02,01,01,50,00,52, ],
    [ 52,00,00,00,00,00,00,02,02,00,50,50,50,00,52, ],
    [ 52,00,00,00,00,00,00,02,02,00,00,00,00,00,52, ],
    [ 52,52,52,52,52,52,00,02,02,00,52,52,52,52,52, ]
], [
    new Actor("父", "father", 4, 4, messenger("Your father is sleeping soundly on the bed.")),
    new Actor("母", "mother", 8, 5, talk_to_mother),
    new Actor("门", "door", 8, 7, open_door),
    new Actor("门", "door", 10, 10, open_door),
    new Actor("厕", "toilet", 11, 10, messenger("You relieve yourself on the toilet.")),
]);

const room_height = room10.map.length;
const room_width = room10.map[0].length;

var room20 = new Room([
    [ 52,52,52,52,52,52,00,02,02,00,52,52,52,52,52, ],
    [ 53,00,00,00,00,00,00,02,02,00,00,00,00,00,00, ],
    [ 53,00,00,00,00,00,00,02,02,00,00,00,00,00,00, ],
    [ 53,00,00,00,00,00,00,02,02,00,00,00,00,00,00, ],
    [ 53,00,00,00,00,00,00,02,02,00,54,00,00,00,00, ],
    [ 53,00,00,00,00,00,00,02,02,00,00,00,00,00,00, ],
    [ 53,00,00,00,00,00,00,02,02,02,02,02,02,02,02, ],
    [ 53,00,00,54,00,00,00,02,02,02,02,02,02,02,02, ],
    [ 53,00,00,00,00,00,00,02,02,02,02,02,02,02,02, ],
    [ 53,00,00,00,00,00,00,00,00,00,00,00,00,00,00, ],
    [ 53,00,00,00,00,00,00,00,00,00,00,00,00,00,00, ],
    [ 53,00,00,00,00,00,00,00,00,00,54,00,00,00,00, ],
    [ 53,00,00,00,00,00,00,00,00,00,00,00,00,00,00, ],
    [ 53,53,53,53,53,53,53,53,53,53,53,53,53,53,53, ]
], []);

var room21 = new Room([
    [ 54,54,54,54,54,54,54,54,54,54,54,54,54,54,54, ],
    [ 00,00,00,54,00,00,00,54,00,00,00,00,00,00,54, ],
    [ 00,00,00,00,00,00,00,00,00,00,00,00,00,54,00, ],
    [ 00,00,54,00,54,00,00,00,54,00,00,54,00,00,00, ],
    [ 00,00,00,00,00,00,54,00,00,00,00,00,00,00,00, ],
    [ 00,00,00,00,00,00,00,00,00,54,00,00,00,00,00, ],
    [ 02,02,02,02,02,02,02,02,02,02,02,02,02,02,02, ],
    [ 02,02,02,02,02,02,02,02,02,02,02,02,02,02,02, ],
    [ 02,02,02,02,02,02,02,02,02,02,02,02,02,02,02, ],
    [ 00,00,00,00,00,00,00,00,00,54,00,00,00,00,00, ],
    [ 00,00,00,54,00,00,00,00,00,00,00,00,00,00,00, ],
    [ 00,00,00,00,00,00,00,00,00,00,00,00,54,00,00, ],
    [ 00,00,00,00,00,00,00,00,00,00,00,00,00,00,00, ],
    [ 53,53,53,53,53,53,53,53,53,53,53,53,53,53,53, ]
], []);

var bridge_door = new Actor("门", "door", 9, 9, messenger("Locked."));

function toggle_map_tile(room, x, y, val1, val2) {
    room.map[y][x] = (room.map[y][x] === val1) ? val2 : val1;
}

function toggle_bridge() {
    message("You pull the lever and hear the noise of metal chains and creaking wood.");
    toggle_map_tile(room22, 14, 6, 10, 51);
    toggle_map_tile(room22, 14, 7, 10, 51);
    toggle_map_tile(room22, 14, 8, 10, 51);
    toggle_map_tile(room23, 0, 6, 10, 51);
    toggle_map_tile(room23, 0, 7, 10, 51);
    toggle_map_tile(room23, 0, 8, 10, 51);
    do_redraw();
}

var room22 = new Room([
    [ 54,00,00,00,00,54,00,00,02,02,00,00,00,51,51, ],
    [ 54,00,00,00,00,00,00,00,02,02,00,00,00,51,51, ],
    [ 00,00,00,00,00,00,00,00,02,02,00,00,00,51,51, ],
    [ 00,00,00,00,00,00,00,00,02,02,00,00,00,51,51, ],
    [ 00,00,00,00,54,00,00,00,02,02,00,00,00,51,51, ],
    [ 00,00,00,00,00,00,00,00,02,02,00,00,00,51,51, ],
    [ 02,02,02,02,02,02,02,02,02,02,02,02,10,10,51, ],
    [ 02,02,02,02,02,02,02,02,02,02,02,02,10,10,51, ],
    [ 02,02,02,02,02,02,02,02,02,02,02,02,10,10,51, ],
    [ 00,00,00,00,00,00,00,00,50,00,50,00,00,51,51, ],
    [ 00,00,00,00,00,00,00,00,50,00,50,00,00,51,51, ],
    [ 00,00,00,00,00,00,00,00,50,50,50,00,00,51,51, ],
    [ 00,00,00,00,00,00,00,00,00,00,00,00,00,51,51, ],
    [ 53,00,00,00,00,00,00,00,00,00,00,00,00,51,51, ]
], [
    bridge_door,
    new Actor("纽", "lever", 9, 10, toggle_bridge)
]);

var room32 = new Room([
    [ 53,00,00,00,00,00,00,00,00,00,00,00,00,51,51, ],
    [ 53,00,00,00,00,00,00,00,00,00,00,00,00,51,51, ],
    [ 53,00,00,00,54,00,00,00,00,00,00,00,00,51,51, ],
    [ 53,00,00,00,00,00,00,00,00,00,00,00,00,51,51, ],
    [ 53,00,00,00,00,00,00,00,00,00,00,00,00,51,51, ],
    [ 53,00,00,00,00,00,00,00,00,00,00,00,00,51,51, ],
    [ 53,00,00,00,00,00,00,00,00,00,54,00,00,51,51, ],
    [ 00,00,00,00,00,00,00,00,00,00,00,00,00,51,51, ],
    [ 53,00,00,00,00,00,00,00,00,00,00,00,00,51,51, ],
    [ 53,00,00,00,00,54,00,00,00,00,00,00,00,51,51, ],
    [ 53,00,00,00,00,00,00,00,00,00,00,00,51,51,51, ],
    [ 53,00,00,00,51,51,51,00,00,00,51,51,51,51,51, ],
    [ 51,51,51,51,51,51,51,51,51,51,51,51,51,51,51, ],
    [ 51,51,51,51,51,51,51,51,51,51,51,51,51,51,51, ]
], [
    new Actor("门", "door", 0, 7, messenger("Locked.")),

]);
var room12 = new Room([
    [ 53,53,53,53,53,53,53,53,53,53,53,53,53,51,51, ],
    [ 00,00,00,00,00,00,00,00,00,00,00,00,00,51,51, ],
    [ 00,00,00,00,00,00,00,54,00,00,00,00,00,51,51, ],
    [ 00,00,00,00,00,00,00,00,00,00,54,00,00,51,51, ],
    [ 00,00,00,00,54,00,00,00,00,00,00,00,00,51,51, ],
    [ 00,00,00,00,00,00,00,00,00,00,00,00,00,51,51, ],
    [ 02,02,02,02,02,02,02,02,02,02,00,00,00,51,51, ],
    [ 02,02,02,02,02,02,02,02,02,02,00,00,00,51,51, ],
    [ 00,00,00,00,00,00,00,00,02,02,00,00,00,51,51, ],
    [ 00,00,54,00,00,00,00,00,02,02,00,00,00,51,51, ],
    [ 00,00,00,00,00,00,00,00,02,02,00,00,00,51,51, ],
    [ 54,00,00,00,00,00,00,00,02,02,00,00,00,51,51, ],
    [ 00,00,00,00,00,00,00,00,02,02,00,00,00,51,51, ],
    [ 54,00,00,00,00,54,00,00,02,02,00,00,00,51,51, ]
], []);

var room11 = new Room([
    [ 53,53,53,53,53,53,53,00,00,02,02,00,53,53,53, ],
    [ 53,00,00,00,00,00,00,00,00,02,02,00,00,00,00, ],
    [ 54,00,00,00,00,00,00,00,00,02,02,00,00,00,00, ],
    [ 54,00,00,00,00,00,00,00,00,02,02,00,00,00,00, ],
    [ 54,00,00,00,00,00,00,00,00,00,02,02,00,00,00, ],
    [ 54,00,00,00,00,00,00,00,00,00,02,02,00,00,00, ],
    [ 54,54,00,54,00,00,00,00,00,00,02,02,02,02,02, ],
    [ 54,00,54,00,00,54,00,54,00,54,00,02,02,02,02, ],
    [ 54,00,00,54,00,00,54,00,00,00,00,00,00,00,00, ],
    [ 54,00,54,00,00,00,00,00,00,54,00,00,00,00,00, ],
    [ 54,54,00,00,00,54,00,54,00,00,00,54,00,54,00, ],
    [ 54,00,00,54,00,00,00,00,00,00,54,00,00,00,54, ],
    [ 54,00,54,00,54,00,00,00,54,00,00,00,00,00,00, ],
    [ 54,54,54,54,54,54,54,54,54,54,54,54,54,54,54, ]
], [
    new Actor("羊", "sheep", 2, 2, messenger("The sheep stares at you while eating grass")),
    new Actor("羊", "sheep", 4, 2, messenger("The sheep stares at you while eating grass")),
    new Actor("羊", "sheep", 4, 4, messenger("The sheep stares at you while eating grass")),
    new Actor("狗", "dog", 7, 3, messenger("The dog barks at you.")),
    new Actor("人", "shepherd", 8, 5, say("Do you want to cross the river? It's dangerous on the other side. You may want to talk to the village elder.")),
]);

var room01 = new Room([
    [ 53,53,53,53,53,53,53,53,53,53,53,53,53,53,53, ],
    [ 53,53,53,53,53,00,00,11,11,50,50,50,50,00,00, ],
    [ 53,53,53,00,00,00,00,11,11,50,01,01,50,00,00, ],
    [ 54,00,54,00,00,54,00,00,02,55,01,01,55,00,00, ],
    [ 54,00,00,00,00,00,00,00,02,50,01,50,50,00,00, ],
    [ 54,54,00,00,11,11,11,00,02,00,02,00,00,00,00, ],
    [ 54,00,54,00,11,11,11,00,02,02,02,02,02,02,02, ],
    [ 54,00,00,00,11,11,11,00,00,02,02,02,02,02,02, ],
    [ 54,00,54,00,11,11,11,02,02,02,02,00,00,00,00, ],
    [ 54,00,02,02,02,02,02,02,00,02,02,00,00,00,00, ],
    [ 54,00,02,00,50,55,50,50,00,02,02,00,50,55,50, ],
    [ 54,11,11,11,50,01,01,50,00,02,02,00,50,01,55, ],
    [ 54,11,11,11,55,01,01,01,02,02,02,02,01,01,50, ],
    [ 54,11,11,11,50,50,50,50,00,02,02,00,50,50,50, ],
    [ 53,53,53,53,53,53,53,00,00,02,02,00,53,53,53, ],
], [
    new Actor("门", "door", 7, 12, open_door),
    new Actor("床", "bed", 5, 11, null),
    new Actor("柜", "closet", 6, 11, null),
    new Actor("门", "door", 12, 12, open_door),
    new Actor("床", "bed", 13, 11, null),
    new Actor("人", "peasant", 13, 12, say("I've heard rats have taken over the village on the other side of the bridge! It's so horrible.")),
    new Actor("门", "door", 10, 4, open_door),
    new Actor("床", "bed", 11, 2, null),
    new Actor("箱", "chest", 11, 3, null),
    new Actor("人", "shopkeep", 10, 2, say("I'm restocking on supplies, come back later if you want to buy something!")),
    new Actor("人", "farmer", 8, 8, say("The village elder is in the big house. He's got the key to the bridge. But I'm not sure you want to cross to the other side.")),
    new Actor("井", "well", 3, 2, messenger("You drink from the well. The water is refreshing!")),
    new Actor("女", "woman", 3, 3, say("Don't you love the fresh water in the morning?")),
]);

village_elder_subjects = new Map();
village_elder_subjects.set("father", messenger("Village elder: So your father has fallen ill. I'm sorry. I wish our village knew a way to cure him"));
village_elder_subjects.set("bridge", function() {
    message("Village elder: Yes, I've got the key to the bridge. We've kept it closed since Pindu town has been overrun with giant rats.");
    village_elder_subjects.set("Pindu town", messenger("Village elder: Pindu town is right across the bridge. Some weeks ago it got attacked by giant rats. They killed many of the people. The survivors fled. We closed the bridge just in time to avoid being caught too."));
    village_elder_subjects.set("giant rats", messenger("Village elder: I'm not sure where they came from. But they're very dangerous. Be careful if you see them."));
    set_context_buttons("Subjects:", village_elder_subjects);
});
village_elder_subjects.set("aunt Leane", function() {
    message("Villager elder: Ah, so you have to cross the bridge. Well, I can give you a copy of the key. Be careful out there.");
    message("You got a copy of the bridge key!");
    bridge_door.interact_function = function() { message("You open the door with the bridge key."); return true; };
});
village_elder_subjects.set("bye", function() {
    message("Village elder: Be safe.");
    reset_context_buttons();
});

function talk_to_village_elder() {
    message("You talk to the village elder.");
    set_context_buttons("Subjects:", village_elder_subjects);
    return false;
}

var room02 = new Room([
    [ 53,53,53,53,53,53,53,53,53,53,53,51,51,51,51, ],
    [ 00,11,11,11,52,00,00,00,53,53,53,53,53,51,51, ],
    [ 00,11,11,11,52,00,00,00,00,00,54,53,53,51,51, ],
    [ 00,11,11,11,52,52,00,50,50,55,50,50,53,51,51, ],
    [ 00,11,11,11,00,00,02,50,01,01,01,50,53,51,51, ],
    [ 00,00,02,00,00,00,02,55,01,01,01,55,53,51,51, ],
    [ 02,02,02,02,02,02,02,01,01,01,01,50,53,51,51, ],
    [ 02,02,02,02,02,02,02,01,01,01,01,50,53,51,51, ],
    [ 00,00,02,00,00,02,00,55,01,01,01,55,53,51,51, ],
    [ 00,00,02,00,00,02,00,50,50,01,50,50,53,51,51, ],
    [ 50,52,00,52,52,00,52,55,01,01,01,55,53,51,51, ],
    [ 55,00,00,52,00,00,00,50,01,01,01,50,53,51,51, ],
    [ 50,00,00,52,00,00,00,55,01,01,01,55,53,51,51, ],
    [ 50,00,00,52,00,00,00,50,50,50,50,50,53,51,51, ],
    [ 53,53,53,53,53,53,53,53,53,53,53,53,53,51,51, ],
], [
    new Actor("门", "door", 7, 6, open_door),
    new Actor("门", "door", 7, 7, open_door),
    new Actor("门", "door", 9, 9, open_door),
    new Actor("猪", "pig", 6, 1, messenger("The pig oinks to you. It looks rather fat.")),
    new Actor("猪", "pig", 2, 12, messenger("The pig oinks to you. It looks rather fat.")),
    new Actor("猪", "pig", 5, 12, messenger("The pig oinks to you. It looks rather fat.")),
    new Actor("人", "pig farmer", 4, 9, say("This village has the fattest pigs in the whole world!")),
    new Actor("床", "bed", 8, 4, null),
    new Actor("床", "bed", 8, 5, null),
    new Actor("床", "bed", 10, 4, null),
    new Actor("床", "bed", 10, 5, null),
    new Actor("人", "peasant", 10, 6, say("This is the common room. The villagers that don't have their own home can sleep here. The village elder is just in his room to the right.")),
    new Actor("人", "peasant", 10, 8, say("I always love the view of the river from here")),
    new Actor("柜", "closet", 8, 8, null),
    new Actor("桌", "desk", 9, 11, null),
    new Actor("柜", "closet", 10, 11, null),
    new Actor("长", "village elder", 9, 12, talk_to_village_elder),
    new Actor("床", "bed", 10, 12, null),
]);

/*
 * accross the bridge
 */

var room23 = new Room([
    [ 51,51,53,53,53,53,53,53,53,53,53,53,53,53,53, ],
    [ 51,51,53,53,53,53,53,53,53,53,53,53,53,53,53, ],
    [ 51,51,00,00,00,00,00,00,00,00,53,53,53,53,53, ],
    [ 51,51,00,50,50,50,00,00,00,00,00,53,53,53,53, ],
    [ 51,51,00,50,00,50,00,00,00,00,00,00,00,53,53, ],
    [ 51,51,00,50,00,50,00,00,00,00,00,00,00,53,53, ],
    [ 51,10,10,02,02,02,02,02,02,02,02,02,00,53,53, ],
    [ 51,10,10,02,02,02,02,02,02,02,02,02,00,53,53, ],
    [ 51,10,10,02,02,02,02,02,02,02,02,02,00,53,53, ],
    [ 51,51,00,00,00,00,00,00,00,00,00,00,00,53,53, ],
    [ 51,51,00,00,00,00,00,00,00,00,00,00,00,00,53, ],
    [ 51,51,00,00,00,00,00,00,00,00,00,00,00,00,53, ],
    [ 51,51,00,00,00,00,00,00,00,00,00,00,00,00,00, ],
    [ 51,51,00,00,00,00,00,00,00,00,00,00,00,00,00, ]
], [
    new Actor("鼠", "giant rat", 9, 10, null),
    new Actor("纽", "lever", 4, 4, toggle_bridge)
]);

/*
var room10 = new Room([
    [ 50,50,50,50,50,50,50,50,50,50,50,50,50,50,50, ],
    [ 50,00,00,00,00,00,00,00,00,00,00,00,00,00,50, ],
    [ 50,00,00,00,00,00,00,00,00,00,00,00,00,00,50, ],
    [ 50,00,00,00,00,00,00,00,00,00,00,00,00,00,50, ],
    [ 50,00,00,00,00,00,00,00,00,00,00,00,00,00,50, ],
    [ 50,00,00,00,00,00,00,00,00,00,00,00,00,00,50, ],
    [ 50,00,00,00,00,00,00,00,00,00,00,00,00,00,50, ],
    [ 50,00,00,00,00,00,00,00,00,00,00,00,00,00,50, ],
    [ 50,00,00,00,00,00,00,00,00,00,00,00,00,00,50, ],
    [ 50,00,00,00,00,00,00,00,00,00,00,00,00,00,50, ],
    [ 50,00,00,00,00,00,00,00,00,00,00,00,00,00,50, ],
    [ 50,00,00,00,00,00,00,00,00,00,00,00,00,00,50, ],
    [ 50,00,00,00,00,00,00,00,00,00,00,00,00,00,50, ],
    [ 50,50,50,50,50,50,50,50,50,50,50,50,50,50,50, ]
], []);
*/

var world = [
    [null,   room01, room02, null],
    [room10, room11, room12, null],
    [room20, room21, room22, room23],
    [null,   null,   room32, null],
];

const world_width = world[0].length;
const world_height = world.length;
