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

            if (world.character.x > 1500 && !this.hadFirstContact) { // WICHTIG: du musst noch an x-koordinate von character (world.character.x) erstmal rankommen, bedeutet, du musst diese Variable irgendwie von world-Klasse in diese Klasse hier bekommen (in Slack nachfragen)
                i = 0;
                this.hadFirstContact = true;
            }
            if (this.hadFirstContact == true) {
                this.endbossIsIn = true;
                this.playFightAnimation()
            }
        }, 200)
    }

    playFightAnimation() {

        if (this.x > 1999 && this.x >= 1500 && world.character.x >= 1800) {
            clearInterval(this.moveRightF);
            clearInterval(this.moveRightAnimationF);
            //if (!this.moveRightF) {
            this.moveLeftF = setInterval(() => {
                this.moveLeft()
            }, 20)
            this.moveLeftAnimationF = setInterval(() => {
                this.playAnimation(this.IMAGES_WALKING)
            }, 200)
        } else if (this.x <= 1500 && world.character.x >= 1800) {
            clearInterval(this.moveLeftF);
            clearInterval(this.moveLeftAnimationF);
            //this.moveLeftF = null;
            //this.moveLeftAnimationF = null;
            this.moveRightF = setInterval(() => {
                this.moveRight()
            }, 20)
            this.moveRightAnimationF = setInterval(() => {
                this.playAnimation(this.IMAGES_WALKING)
            }, 200)
        }

        /*
        if (world.character.x - this.x <= -200) {
            setInterval(() => {
                this.moveLeft()
            }, 20)
        } else if (world.character.x - this.x >= 200) {
            setInterval(() => {
                this.moveRight()
            }, 20)
        }
        */
    }
}