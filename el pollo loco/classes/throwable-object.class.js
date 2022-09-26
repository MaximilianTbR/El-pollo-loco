class ThrowableObject extends MovableObject {

    IMAGES_ON_GROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];


    world = World;

    groundPosition = 350;

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_ON_GROUND);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.speedY = 25;
        this.speed = 10;
        this.throw();
    }

    throw () {
        this.applyGravity();
        setInterval(() => {
            this.moveObject();
        }, 25);
        this.playObject();
    }

    moveObject() {
        if (world.character.otherDirection) {
            this.moveLeft();
        } else {
            this.moveRightBottle()
        }
    }

    moveRightBottle() {
        this.x += this.speed;
    }

    playObject() {
        let myInterval = setInterval(() => {
            if (this.isAboveGround()) {
                this.playRotation();
            } else if (this.y == 350) {
                this.playSplash();
                clearInterval(myInterval)
            }
        }, 25)
    }

    playRotation() {
        this.playAnimation(this.IMAGES_ROTATION);
    }

    playSplash() {
        this.playAnimation(this.IMAGES_SPLASH);
        let index = world.level.thrownObjects.indexOf(this);
        setTimeout(() => {
            this.spliceIndex(index)
        }, 50);
    }

    spliceIndex(index) {
        world.level.thrownObjects.splice(index, 1);
    }
}