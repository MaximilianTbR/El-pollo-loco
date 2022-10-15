class World {

    character = new Character();
    level = level1;
    enemies = level1.enemies;
    endboss = level1.endboss;
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;
    endboss = level1.endboss;
    collectableBottles = level1.collectableBottles;
    collectableCoins = level1.collectableCoins;
    thrownObjects = level1.thrownObjects;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    moneyBar = new MoneyBar();
    statusBar = new StatusBar();
    bottleBar = new BottleBar();
    endbossbar = new EndbossStatusbar();
    collectableObjectsMoney = [];
    gameOver = false;
    gameWon = false;
    gameOverScreen = new GameOverScreen();
    gameWonScreen = new GameWonScreen();
    endbossMode = false;
    index;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.thrownObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.moneyBar);
        this.addToMap(this.bottleBar);
        this.level.endboss.forEach(endboss => {
            if (endboss.endbossIsIn == true) {
                this.addToMap(this.endbossbar);
            }
        })
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.endboss);
        this.addObjectsToMap(this.level.collectableBottles);
        this.addObjectsToMap(this.level.collectableCoins);
        this.ctx.translate(-this.camera_x, 0);
        if (this.gameOver) {
            this.addToMap(this.gameOverScreen);
        } else if (this.gameWon) {
            this.addToMap(this.gameWonScreen);
        }
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    setWorld() {
        this.character.world = this;
    }

    run() { // function, that contains essential functions for the game which runs nearly the whole time
        let myInterval = setInterval(() => {
            this.checkCollisions();
            this.checkHealth();
            this.checkCollectingBottles();
            this.checkCollectingCoins();
            this.checkThrowObjects();
            this.checkIfEndbossIsDead(myInterval);
        }, 200)
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    characterEntersEndbossArea() {
        return this.character.x >= 1310;
    }

    checkCollisions() {
        this.characterCollidesWithEnemy();
        this.characterCollidesWithEndboss();
        this.characterJumpsOnEnemy();
        this.bottleIsCollidingWithEnemy();
        this.bottleIsCollidingWithEndboss();
        if (this.characterEntersEndbossArea()) {
            this.endbossMode = true;
        }
    }

    characterCollidesWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && enemy.isDead == false) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        })
    }

    characterCollidesWithEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    characterJumpsOnEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
                this.getsIndexOfChicken(enemy);
                this.enemies[this.index].isDead = true;
                this.enemies[this.index].dead = true;
                this.chickenDies(this.index);
            }
        });
    }

    getsIndexOfChicken(enemy) {
        return this.index = this.level.enemies.indexOf(enemy);
    }

    chickenDies(index) {
        setTimeout(() => {
            this.killChicken(index);
        }, 1000);
    }

    bottleIsCollidingWithEnemy() {
        this.level.thrownObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    let index = this.level.enemies.indexOf(enemy);
                    this.enemies[index].isDead = true;
                    this.enemies[this.index].dead = true;
                    this.endbossIsDead(index);
                }
            })
        })
    }

    endbossIsDead(index) {
        setTimeout(() => {
            this.killEndboss(index);
        }, 1000);
    }

    bottleIsCollidingWithEndboss() {
        this.level.thrownObjects.forEach((bottle) => {
            this.level.endboss.forEach((endboss) => {
                this.bottleHitsEndbossNormally(bottle, endboss);
                this.bottleKillsEndboss(bottle, endboss);
            })
        })
    }

    bottleHitsEndbossNormally(bottle, endboss) {
        if (bottle.isColliding(endboss) && this.endboss[0].energy > 5) {
            this.endboss[0].isHitted();
            this.endbossbar.setPercentage(this.endboss[0].energy);
        }
    }

    bottleKillsEndboss(bottle, endboss) {
        if (bottle.isColliding(endboss) && this.endboss[0].energy == 0) {
            let index = this.level.endboss.indexOf(endboss);
            this.endboss[index].dead = true;
            this.gameWon = true;
            setTimeout(() => {
                this.killEndboss(index);
            }, 1000)
        }
    }

    killChicken(index) {
        this.level.enemies.splice(index, 1);
    }

    killEndboss(index) {
        this.level.endboss.splice(index, 1);
    }

    checkHealth() {
        if (this.character.energy == 0) {
            this.gameOver = true;
        }
    }

    checkCollectingBottles() {
        this.level.collectableBottles.forEach((collectableObject) => {
            this.characterCollectsBottle(collectableObject);
        })
    }

    characterCollectsBottle(collectableObject) {
        if (this.character.isColliding(collectableObject)) {
            this.characterGetsOneMoreBottle();
            this.bottleBar.setPercentage(this.character.collectedBottles);
            this.bottleDisappearsFromGround(collectableObject);
        }
    }

    characterGetsOneMoreBottle() {
        return this.character.collectedBottles += 1;
    }

    bottleDisappearsFromGround(collectableObject) {
        let index = this.level.collectableBottles.indexOf(collectableObject);
        this.level.collectableBottles.splice(index, 1);
    }

    checkCollectingCoins() {
        this.level.collectableCoins.forEach((collectableObject) => {
            if (this.character.isColliding(collectableObject)) {
                this.characterGetsOneMoreCoin()
                this.moneyBar.setPercentage(this.character.collectedCoins);
                this.coinDisappearsFromGround(collectableObject);
            }
        })
    }

    characterGetsOneMoreCoin() {
        return this.character.collectedCoins += 1;
    }

    coinDisappearsFromGround(collectableObject) {
        let index = this.level.collectableCoins.indexOf(collectableObject);
        this.level.collectableCoins.splice(index, 1);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.character.collectedBottles > 0) {
            this.characterLoosesOneBottle();
            this.bottleBar.setPercentage(this.character.bottle);
            this.newBottleIsThrown();
        }
    }

    characterLoosesOneBottle() {
        return this.character.collectedBottles -= 1;
    }

    newBottleIsThrown() {
        const newBottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
        this.level.thrownObjects.push(newBottle);
    }

    checkIfEndbossIsDead(myInterval) {
        if (this.endboss[0].BL == true) {
            this.character.BL2 = true;
            clearInterval(myInterval);
        }
    }
}