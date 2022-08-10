let canvas;
let world;
let character = new Character();
let object = new MovableObject();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);

    console.log('My character is', world.character);
}