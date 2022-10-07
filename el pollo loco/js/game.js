let canvas;
let world;
let keyboard = new Keyboard();
let backgroundMusic = new Audio('audio/background-music.mp3');

function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    backgroundMusic.play();
}

function startGame() {
    document.getElementById('start-screen').classList.add('d-none');
    console.log()
    document.getElementById('canvas').classList.add('start-screen-shadow');
    document.getElementById('btn').classList.add('d-none');
    document.getElementById('canvas').classList.remove('canvas-1');
    document.getElementById('canvas').classList.add('canvas-2');
    setTimeout(init(), 3000)
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
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
    if (e.keyCode == 82) {
        keyboard.R = true;
    }
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
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
    if (e.keyCode == 82) {
        keyboard.R = false;
    }
});

/*document.getElementById('btnMoveLeft').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
});

document.getElementById('btnMoveLeft').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
});
*/

document.getElementById('btnMoveRight').addEventListener('touchstart', function(event) {
    event.preventDefault();
    keyboard.RIGHT = true;
});
/*
var button = document.getElementById("button");
button.addEventListener("click", function(event) {
    alert(event.target);
});

document.getElementById('btnMoveRight').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
});

document.getElementById('btnJump').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.UP = true;
});

document.getElementById('btnJump').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.UP = false;
});

document.getElementById('btnThrowBottle').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.D = true;
});

document.getElementById('btnThrowBottle').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.D = false;
});

document.getElementById('btnRestart').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.R = true;
});

document.getElementById('btnRestart').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.R = false;
});
*/

function openFullscreen() {
    let fullscreen = document.getElementById('canvas');
    enterFullscreen(fullscreen);
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen(element) {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webKitExitFullscreen) {
        document.webKitExitFullscreen();
    }
}