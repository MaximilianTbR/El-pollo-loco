class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 60;
    world = World;

    isCleared = false;
    dead = false;
    energy = 100;

    direction = true;
    directionX = true;
    middleX = 1850;
    movement = 50;

    moveLeftRightBL = false;
    moveLeftRightIT;
    myInterval1;
    myInterval2;
    myInterval3;


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
                this.startEndFight();
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
            this.myInterval1 = setInterval(() => {
                clearInterval(this.myInterval2);
                if (this.directionX) {
                    this.x -= 1;
                    if (this.x < this.middleX - this.movement) {
                        this.directionX = false;
                    }
                }
                if (!this.directionX) {
                    this.x += 1;
                    if (this.x > this.middleX + this.movement) {
                        this.directionX = true;
                    }
                }
            }, 500);
            //this.counterAttackBL = false;
            //this.moveLeftRightBL = true;
        } else if (world.character.x > 1600 || this.EndbossisHurt()) {
            this.myInterval2 = setInterval(() => {
                clearInterval(this.myInterval1);
                this.x -= this.speed;
                this.playAnimation(this.IMAGES_ATTACK);
                console.log('counterattack');
                if (this.x < 1500) {
                    if (this.x < this.middleX) {
                        this.x += this.speed;
                    } else if (this.x >= this.middleX) {
                        clearInterval(this.myInterval3);
                    }
                }
            }, 500);
            /*if (this.x < 1600) {
                this.moveBackToMiddleX();
            }*/
            //this.moveLeftRightBL = false;
            //this.counterAttackBL = true;
            //this.endbossCounterAttack();
        }
    }

    moveLeftRight() {
        setInterval(() => {
            if (this.moveLeftRightBL == true) {
                if (this.directionX) {
                    this.x -= 1;
                    if (this.x < this.middleX - this.movement) {
                        this.directionX = false;
                    }
                }
                if (!this.directionX) {
                    this.x += 1;
                    if (this.x > this.middleX + this.movement) {
                        this.directionX = true;
                    }
                }
            }
            if (!this.moveLeftRightBL) {
                clearInterval(this.myInterval);
            }
        }, 1000 / 50)

    }

    endbossCounterAttack() {
        setInterval(() => {
            if (this.counterAttackBL == true) {
                this.moveLeft();
                this.playAnimation(this.IMAGES_ATTACK);
                console.log('counterattack');
                if (this.x < 1600) {
                    this.counterAttackBL = false;
                    this.moveBackToMiddleX();
                }
            }
            if (!this.counterAttackBL) {
                clearInterval(this.myInterval);
            }
        }, 1000 / 50)
    }

    moveBackToMiddleX() {
        this.myInterval3 = setInterval(() => {
            if (this.x < this.middleX) {
                this.moveRight();
            } else if (this.x >= this.middleX) {
                clearInterval(this.myInterval3);
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

    /*
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
    */
}