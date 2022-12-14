class StatusBar extends DrawableObject {

    imgalready_loaded = false;

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png', // 1
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png' // 5
    ]
    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage; // => 0 .. 5
        let path = this.IMAGES[this.resolveImageIndex()];
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