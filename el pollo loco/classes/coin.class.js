class Coin {
    y = 360;
    width = 80;
    height = 60;

    IMAGES_COLLECTABLE = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        this.loadImages(this.IMAGES_COLLECTABLE);
        this.x = 200 + Math.random() * 2000; // number between 200 and 500
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COLLECTABLE);
        }, 200)
    }
}