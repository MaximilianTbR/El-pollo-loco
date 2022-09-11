class Level {
    enemies;
    clouds;
    backgroundObjects;
    endboss;
    collectableBottles;
    collectableCoins;
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObjects, endboss, collectableBottles, collectableCoins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.endboss = endboss;
        this.collectableBottles = collectableBottles;
        this.collectableCoins = collectableCoins;
    }
}