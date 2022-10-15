class Coin extends DrawableObject {

    y = 310;
    width = 160;
    height = 160;
    offset = {
        top: 40,
        left: 40,
        right: 30,
        bottom: 30
    }

    IMAGES_COLLECTABLE = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COLLECTABLE);
        this.x = 200 + Math.random() * 2000; // number between 200 and 2000
    }
}