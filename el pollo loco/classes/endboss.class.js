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

    dribbleAnimation = false;
    left = true;
    right = false;
    counterLeft = false;
    counterRight = false


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
        this.loadImages(this.IMAGES_ATTACK);
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
        setInterval(() => {
            if (world.character.x > 1310 && world.character.x < 1600) {
                this.runEndboss();
                this.dribbleAnimation = true;
            } else if (world.character.x > 1600) {
                this.left = false;
                this.counterLeft = true;
            }
        }, 500)
    }

    runEndboss() {
        if (this.dribbleAnimation == true) {
            if (this.left == true) {
                this.EndbossMovesLeft();
            } else if (this.counterLeft == true || this.EndbossisHurt()) {
                this.EndbossCounterAttack();
            } else if (this.right == true) {
                this.EndbossMovesRight();
            }
        }
    }

    EndbossMovesLeft() {
        let myInterval1 = setInterval(() => {
            this.moveLeft();
            this.playAnimation(this.IMAGES_WALKING);
            if (this.x <= 1600) {
                this.left = false;
                this.right = true;
                clearInterval(myInterval1);
            }
        }, 500)
    }

    EndbossMovesRight() {
        let myInterval2 = setInterval(() => {
            this.moveRight();
            this.playAnimation(this.IMAGES_WALKING);
            console.log('right')
            if (this.x > 1950) {
                this.right = false;
                this.left = true;
                clearInterval(myInterval2);
            }
        }, 500)
    }

    EndbossCounterAttack() {
        let myInterval3 = setInterval(() => {
            this.moveLeft();
            this.playAnimation(this.IMAGES_ATTACK);
            console.log('counterattack');
            if (this.x <= 1450) {
                this.counterLeft = false;
                this.right = true;
                clearInterval(myInterval3);
            }
        }, 500)
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