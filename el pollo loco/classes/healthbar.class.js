class Healthbar extends World {

    IMAGES_100 = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png'
    ]

    constructor() {
        super().loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png')
        this.loadImages(this.IMAGES_100);
    }
}