class Bottle extends DrawableObject {

    y = 360;
    width = 80;
    height = 60;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

    IMAGES_COLLECTABLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_COLLECTABLE);
        this.x = 200 + Math.random() * 2000; // number between 200 and 500
    }
}