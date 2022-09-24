class smallChicken extends MovableObject {
    y = 360;
    width = 80;
    height = 60;
    myInterval;
    dead = false;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 200 + Math.random() * 1000; // number between 200 and 500
        this.animate();
        this.speed = 0.15 + Math.random() * 0.25;
    }

    playAnimationBot() {
        console.log('function works for small chicken');
        let myInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 200)
        setTimeout(clearInterval(myInterval), 3000);
    }

    animate() {
        if (this.dead == false) {
            setInterval(() => {
                this.playAnimation(this.IMAGES_WALKING)
            }, 200)
            this.myInterval = setInterval(() => {
                this.moveLeft()
            }, 40)
        } else {
            console.log(this.dead)
            setInterval(() => {
                this.playAnimation(this.IMAGES_DEAD)
            }, 200)
            clearInterval(this.myInterval);
        }
    }
}