let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log('My character is', world.character);
}

document.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    console.log(e)
});

document.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    console.log(e)
});
/*
function startExample() {
    const Action = {
        powerOn() { console.log("Accelerating..."); },
        powerOff() { console.log("Decelerating..."); },
        brakeOn() { console.log("Break activated"); },
        brakeOff() { console.log("Break released"); },
        exit() { console.log("Nice drive!"); },
    };

    const keyAction = {
        w: { keydown: Action.powerOn, keyup: Action.powerOff },
        s: { keydown: Action.brakeOn, keyup: Action.brakeOff },
        Escape: { keydown: Action.exit }
    };

    const keyHandler = (ev) => {
        if (ev.repeat) return;
        if (!(ev.key in keyAction) || !(ev.type in keyAction[ev.key])) return;
        keyAction[ev.key][ev.type]();
    };

    ['keydown', 'keyup'].forEach((evType) => {
        document.getElementById('canvas').addEventListener(evType, keyHandler);
    });
}*/