class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 60;
    world = World;

    moveRightF;
    moveRightAnimationF;
    moveLeftF;
    moveLeftAnimationF;
    isCleared = false;
    dead = false;
    energy = 100;


    IMAGES_SPAWNING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
        'img/4_enemie_boss_chicken/3_attack/G13.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    hadFirstContact = false;
    endbossIsIn = false;

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_SPAWNING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2000;
        this.speed = 20;
        this.animate();
    }

    animate() {
        let i = 0;
        setInterval(() => {
            if (i < 10) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_SPAWNING)
            }
            i++;

            if (world.character.x > 1310 && !this.hadFirstContact) { // WICHTIG: du musst noch an x-koordinate von character (world.character.x) erstmal rankommen, bedeutet, du musst diese Variable irgendwie von world-Klasse in diese Klasse hier bekommen (in Slack nachfragen)
                i = 0;
                this.hadFirstContact = true;
            }
            if (this.hadFirstContact == true) {
                this.endbossIsIn = true;
                this.startEndFight()
            }
            if (this.dead == true) {
                this.endbossIsIn = false;
                this.hadFirstContact = false;
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 200)
    }

    startEndFight() {
        if (world.character.x > 1310 && world.character.x < 1600) {
            console.log('dribble animation') // here is move forward && backward animation
            this.chargeAnimation();
        } else if (world.character.x > 1600) {
            console.log('fight!') // here comes counter attack animation
        }
    }

    chargeAnimation() {
        this.moveLeft()
        this.playAnimation(this.IMAGES_WALKING)
        if (this.x >= 1600) {
            clearInterval(this.moveLeft())
            clearInterval(this.playAnimation(this.IMAGES_WALKING));
            this.moveRight();
            this.playAnimation(this.IMAGES_WALKING);
        } else if (this.x <= 1990) {
            this.moveLeft();
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    isHitted() {
        this.energy -= 10;
        this.playAnimation(this.IMAGES_HURT);
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    EndbossisHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 2;
    }
}