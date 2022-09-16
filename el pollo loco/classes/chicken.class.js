class Chicken extends MovableObject {

    y = 360;
    width = 80;
    height = 60;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
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

    playAnimationBot() {
        this.playAnimation(this.IMAGES_DEAD);
    }

    animate() {
        setInterval(() => {
            this.moveLeft()
        }, 20)
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING)
        }, 200)
    }
}