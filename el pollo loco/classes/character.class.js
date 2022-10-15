class Character extends MovableObject {

    x = 200;
    y = 80;
    height = 250;
    speed = 10;
    offset = {
        top: 120,
        left: 40,
        right: 30,
        bottom: 30
    }

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ]

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-52.png',
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_SHORT_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    world;
    walking_sound = new Audio('audio/running.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    throwing_sound = new Audio('audio/throwing.mp3');
    hurt_sound = new Audio('audio/');
    BL2 = false;

    character = 0;
    collectedBottles = 0;
    collectedCoins = 0;

    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_SHORT_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
    }

    loadAllImages() {
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_SHORT_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
    }

    animate() {
        this.runsKeyboardShortcuts();
        this.runCharacterSkills();
        this.runCharacterAnimations();
    }

    runsKeyboardShortcuts() {
        setInterval(() => {
            this.siteReloads();
        }, 1000 / 60)
    }

    runCharacterSkills() {
        let myInterval = setInterval(() => {
            this.walking_sound.pause();
            this.characterMovesRight();
            this.characterMovesLeft();
            this.characterMovesInEndbossMode();
            this.characterJumps();
            this.characterThrowsBottle();
            this.adjustsCamera();
            this.checksIfCharacterIsDead(myInterval);
        }, 1000 / 60)
    }

    characterMovesRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.otherDirection = false;
            this.moveRight();
            this.walking_sound.play();
        }
    }

    characterMovesLeft() {
        if (this.world.keyboard.LEFT && this.x > 0 && this.world.endbossMode == false) {
            this.otherDirection = true;
            this.moveLeft();
            this.walking_sound.play();
        }
    }

    characterMovesInEndbossMode() {
        if (this.world.keyboard.LEFT && this.x > 0 && this.world.endbossMode == true) {
            if (this.x > 1310) {
                this.otherDirection = true;
                this.moveLeft();
                this.walking_sound.play()
            }
        }
    }

    characterJumps() {
        if (this.world.keyboard.UP && !this.isAboveGround() || this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.jumping_sound.play();
        }
    }

    characterThrowsBottle() {
        if (this.world.keyboard.D) {
            this.throwing_sound.play();
        }
    }

    siteReloads() {
        if (this.world.keyboard.R) {
            location.reload();
        }
    }

    adjustsCamera() {
        return this.world.camera_x = -this.x + 100;
    }

    isIdle() {
        let timePassed = (new Date().getTime() / 1000) - this.world.keyboard.lastMove;
        return timePassed > 2;
    }

    checksIfCharacterIsDead(myInterval) {
        if (this.energy == 0) {
            clearInterval(myInterval);
        }
        if (this.BL2 == true) {
            clearInterval(myInterval);
        }
    }

    runCharacterAnimations() {
        let myAnimationInterval = setInterval(() => {
            this.deadAnimation();
            this.hurtAnimation();
            this.jumpAnimation();
            this.idleAnimation();
            this.walkingAnimation();
            this.checksIfCharacterIsDeadForAnimations(myAnimationInterval);
        }, 100);
    }

    deadAnimation() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        }
    }

    hurtAnimation() {
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        }
    }

    jumpAnimation() {
        if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        }
    }

    idleAnimation() {
        if (this.isIdle()) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
        }
    }

    walkingAnimation() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    checksIfCharacterIsDeadForAnimations(myAnimationInterval) {
        if (this.energy == 0 || this.BL2 == true) {
            clearInterval(myAnimationInterval);
        }
    }
}