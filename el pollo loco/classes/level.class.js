class Level {
    enemies;
    clouds;
    backgroundObjects;
    endboss;
    collectableObjects;
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObjects, endboss, collectableObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.endboss = endboss;
        this.collectableObjects = collectableObjects;
    }
}