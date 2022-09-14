class Level {
    enemies;
    clouds;
    backgroundObjects;
    endboss;
    collectableBottles;
    collectableCoins;
    thrownObjects;
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObjects, endboss, collectableBottles, collectableCoins, thrownObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.endboss = endboss;
        this.collectableBottles = collectableBottles;
        this.collectableCoins = collectableCoins;
        this.thrownObjects = thrownObjects;
    }
}