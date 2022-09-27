class BottleBar extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png', // 1
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png' // 5
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 120;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    // setPercentage(100)
    setPercentage(percentage) {
        this.percentage = percentage; // => 0 .. 5
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 10) {
            return 5;
        } else if (this.percentage == 9) {
            return 5;
        } else if (this.percentage == 8) {
            return 4;
        } else if (this.percentage == 7) {
            return 4;
        } else if (this.percentage == 5) {
            return 3;
        } else if (this.percentage == 5) {
            return 3;
        } else if (this.percentage == 4) {
            return 2;
        } else if (this.percentage == 3) {
            return 2;
        } else if (this.percentage == 2) {
            return 1;
        } else if (this.percentage == 1) {
            return 1;
        } else {
            return 0;
        }
    }
}