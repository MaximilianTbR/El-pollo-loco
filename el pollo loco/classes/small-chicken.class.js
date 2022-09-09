class smallChicken extends MovableObject {
    y = 360;
    width = 80;
    height = 60;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200 + Math.random() * 1000; // number between 200 and 500
        try {
            this.animate();
        } catch (e) {
            console.log(e);
        }
        this.speed = 0.15 + Math.random() * 0.25;
    }

    animate() {
        setInterval(() => {
            this.moveLeft()
        }, 40)
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING)
        }, 200)
    }
}