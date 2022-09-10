class Bottle extends DrawableObject {
    y = 360;
    width = 80;
    height = 60;

    IMAGES_COLLECTABLE_ = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super().loadImages(this.IMAGES_COLLECTABLE_);
        this.x = 200 + Math.random() * 2000; // number between 200 and 500
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COLLECTABLE_)
        }, 200)
    }
}