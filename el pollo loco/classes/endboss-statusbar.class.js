class EndbossStatusbar extends DrawableObject {
    IMAGES_BAR = [
        'img/7_statusbars/2_statusbar_endboss/0.2.png',
        'img/7_statusbars/2_statusbar_endboss/20.2.png',
        'img/7_statusbars/2_statusbar_endboss/40.2.png',
        'img/7_statusbars/2_statusbar_endboss/60.2.png',
        'img/7_statusbars/2_statusbar_endboss/80.2.png',
        'img/7_statusbars/2_statusbar_endboss/orange.png',
    ]
    percentage = 100;
    otherDirection = false;

    constructor() {
        super().loadImages(this.IMAGES_BAR);
        this.x = 480;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }


    // setPercentage(100)
    setPercentage(percentage) {
        this.percentage = percentage; // => 0 .. 5
        let path = this.IMAGES_BAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage == 95) {
            return 5;
        } else if (this.percentage == 90) {
            return 5;
        } else if (this.percentage == 85) {
            return 5;
        } else if (this.percentage == 80) {
            return 4;
        } else if (this.percentage == 75) {
            return 4;
        } else if (this.percentage == 70) {
            return 4;
        } else if (this.percentage == 65) {
            return 4;
        } else if (this.percentage == 60) {
            return 3;
        } else if (this.percentage == 55) {
            return 3;
        } else if (this.percentage == 50) {
            return 3;
        } else if (this.percentage == 45) {
            return 3;
        } else if (this.percentage == 40) {
            return 2;
        } else if (this.percentage == 35) {
            return 2;
        } else if (this.percentage == 30) {
            return 2;
        } else if (this.percentage == 25) {
            return 2;
        } else if (this.percentage == 20) {
            return 1;
        } else if (this.percentage == 15) {
            return 1;
        } else if (this.percentage == 10) {
            return 1;
        } else if (this.percentage == 5) {
            return 1;
        } else {
            return 0;
        }
    }
}