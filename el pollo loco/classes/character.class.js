class Character extends MovableObject {

    y = 80;
    height = 250;
    speed = 10;
    defeat = this.defeat;

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
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    world;
    walking_sound = new Audio('audio/running.mp3');
    jumping_sound = new Audio('audio/jump.mp3');

    character = 0;

    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }

    animate() {
        //Walk function for changing x coordinate of character picture

        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.otherDirection = false;
                this.moveRight();
                this.walking_sound.play();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.otherDirection = true;
                this.moveLeft();
                this.walking_sound.play();
            }
            if (this.world.keyboard.UP && !this.isAboveGround() || this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.jumping_sound.play();
            }
            if (this.world.keyboard.D) {
                console.log('bottle is thrown again')
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60)

        //Walk animation 
        setInterval(() => {
            if (this.isDead) {
                this.playAnimation(this.IMAGES_DEAD);
                console.log('Collision with character, energy', this.character.energy);
                defeat = true;
            }
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 100);
    }
}