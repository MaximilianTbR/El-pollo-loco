class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 60;
    world = World;
    character = Character;
    isCleared = false;
    dead = false;
    energy = 100;
    direction = true;
    directionX = true;
    middleX = 1850;
    movement = 200;
    moveLeftRightBL = false;
    moveLeftRightIT;
    myInterval1;
    myInterval2;
    myInterval3;
    dribbleAnimation = true;
    counterAttackFirstPart = true;
    counterAttackSecondPart = false;
    BL = false;
    Interval2IsActive = false;
    i;
    offset = {
        top: 40,
        left: 40,
        right: 30,
        bottom: 30
    }


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
        this.loadsAllImages();
        this.x = 2000;
        this.speed = 20;
        this.animate();
        this.startEndFight();
    }

    loadsAllImages() {
        this.loadImages(this.IMAGES_SPAWNING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
    }

    animate() {
        this.runsAnimations();
        this.startsEndbossMode();
    }

    runsAnimations() {
        this.i = 0;
        let myInterval = setInterval(() => {
            this.choosesRightImages();
            if (world.character.energy == 0) {
                clearInterval(myInterval);
            }
        }, 200);
    }

    choosesRightImages() {
        if (this.i < 10) {
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.playAnimation(this.IMAGES_SPAWNING)
        }
        this.i++;
    }

    startsEndbossMode() {
        setInterval(() => {
            this.endbossFightBegins();
            this.endbossIsDead();
        }, 200)
    }

    endbossFightBegins() {
        if (world.character.x > 1310 && !this.hadFirstContact) {
            this.i = 0;
            this.hadFirstContact = true;
            this.endbossIsIn = true;
        }
    }

    endbossIsDead() {
        if (this.dead) {
            this.endbossIsIn = false;
            this.hadFirstContact = false;
            this.BL = true;
            this.playAnimation(this.IMAGES_DEAD);
        }
    }

    startEndFight() {
        this.myInterval1 = setInterval(() => {
            this.checksDribbleAnimation();
            this.checksCounterAttack();
            if (world.character.energy == 0) {
                clearInterval(this.myInterval1);
            }
            if (this.energy <= 0) {
                this.BL = true;
                clearInterval(this.myInterval1);
            }
        }, 50);
    }

    checksDribbleAnimation() {
        if (world.character.x > 1310 && world.character.x < 1600 && this.dribbleAnimation) {
            this.playAnimation(this.IMAGES_WALKING);
            this.executesDribbleAnimation();
        }
    }

    checksDribbleAnimation() {
        if (world.character.x >= 1310 && world.character.x < 1600 && this.dribbleAnimation) {
            this.playAnimation(this.IMAGES_WALKING);
            this.executesDribbleAnimation();
        }
    }

    executesDribbleAnimation() {
        this.dribbleAnimationPartOne();
        this.dribbleAnimationPartTwo();
    }

    dribbleAnimationPartOne() {
        if (this.directionX) {
            this.playAnimation(this.IMAGES_WALKING)
            this.x -= 20;
            if (this.x < this.middleX - this.movement) {
                this.directionX = false;
            }
        }
    }

    dribbleAnimationPartTwo() {
        if (!this.directionX) {
            this.playAnimation(this.IMAGES_WALKING)
            this.x += 20;
            if (this.x > this.middleX + this.movement) {
                this.directionX = true;
            }
        }
    }


    checksCounterAttack() {
        if (world.character.x > 1600 || this.EndbossisHurt()) {
            this.dribbleAnimation = false;
            this.playAnimation(this.IMAGES_ATTACK);
            if (!this.counterAttackFirstPart && !this.counterAttackSecondPart) {
                this.counterAttackFirstPart = true;
            }
            this.executesCounterAttackFirstPart();
            this.executesCounterAttackSecondPart();
            this.executesCounterAttackThirdPart();
        }
    }

    executesCounterAttackFirstPart() {
        if (this.counterAttackFirstPart) {
            this.x -= this.speed;
        }
    }

    executesCounterAttackSecondPart() {
        if (this.x < 1400 || this.counterAttackSecondPart) {
            this.counterAttackFirstPart = false;
            this.counterAttackSecondPart = true;
            this.x += this.speed;
        }
    }

    executesCounterAttackThirdPart() {
        if (this.x >= this.middleX) {
            this.counterAttackFirstPart = false;
            this.counterAttackSecondPart = false;
            this.dribbleAnimation = true;
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