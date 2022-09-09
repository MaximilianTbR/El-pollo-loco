class Bottle {
    y = 360;
    width = 80;
    height = 60;

    IMAGES_COLLECTABLE_ = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super().loadImage('./img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COLLECTABLE_);
        this.x = 200 + Math.random() * 2000; // number between 200 and 500
        this.animate();
        this.speed = 0.15 + Math.random() * 0.25;
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COLLECTABLE_)
        }, 200)
    }
}