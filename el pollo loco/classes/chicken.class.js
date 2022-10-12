class Chicken extends MovableObject {

    y = 360;
    width = 80;
    height = 60;
    myInterval;
    dead = false;
    world = this.world;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
    currentImage = 0;
    chickenRegularSound = new Audio('audio/chicken-regular-sound.mp3');

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 200 + Math.random() * 1000; // number between 200 and 500
        this.animate();
        this.speed = 0.15 + Math.random() * 0.25;
        this.chickenRegularSound.play();
    }

    animate() {
        let myInterval = setInterval(() => {
            if (!this.dead) {
                this.chickenMovesLeft();
            } else {
                this.playAnimation(this.IMAGES_DEAD);
            }
            /*if (this.character.energy == 0) {
                clearInterval(myInterval);
            }*/
        }, 1000 / 40);
    }

    chickenMovesLeft() {
        this.playAnimation(this.IMAGES_WALKING)
        this.moveLeft();
    }
}