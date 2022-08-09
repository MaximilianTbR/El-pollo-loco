let canvas;
let ctx;
let character = new Character();
let object = new MovableObject();

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    console.log('My character is', object);
}