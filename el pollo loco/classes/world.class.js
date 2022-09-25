class World {

    character = new Character();
    level = level1;
    enemies = level1.enemies;
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

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
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
        if (this.gameOver == true) {
            this.addToMap(this.gameOverScreen);
        } else if (this.gameWon) {
            this.addToMap(this.gameWonScreen);
        }
        // draw() will be executed over and over again
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
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

    run() { // function, that contains essential functions for the game which runs nearly the whole time
        setInterval(() => {
            this.checkCollisions();
            this.checkHealth();
            this.checkCollectingBottles();
            this.checkCollectingCoins();
            this.checkThrowObjects();
        }, 200)
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        })

        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });

        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
                let index = this.level.enemies.indexOf(enemy);
                this.enemies[index].dead = true;
                console.log(this.enemies[index].dead);
                setTimeout(() => {
                    this.killChicken(index);
                }, 1000)
            }
        });

        this.level.thrownObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    console.log('is Colliding');
                }
            })
        })
    }

    killChicken(index) {
        this.level.enemies.splice(index, 1);
    }

    checkHealth() {
        if (this.character.energy == 0) {
            this.gameOver = true;
        }
    }

    checkCollisionWithBottles() {}

    checkCollectingBottles() {
        this.level.collectableBottles.forEach((collectableObject) => {
            if (this.character.isColliding(collectableObject)) {
                this.character.collectedBottles += 1;
                this.bottleBar.setPercentage(this.character.collectedBottles);
                let index = this.level.collectableBottles.indexOf(collectableObject);
                this.level.collectableBottles.splice(index, 1);
            }
        })
    }

    checkCollectingCoins() {
        this.level.collectableCoins.forEach((collectableObject) => {
            if (this.character.isColliding(collectableObject)) {
                this.character.collectedCoins += 1;
                this.moneyBar.setPercentage(this.character.collectedCoins);
                let index = this.level.collectableCoins.indexOf(collectableObject);
                this.level.collectableCoins.splice(index, 1);
            }
        })
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.character.collectedBottles > 0) {
            this.character.collectedBottles -= 1;
            this.bottleBar.setPercentage(this.character.bottle);
            this.level.thrownObjects.push(new ThrowableObject(this.character.x + 100, this.character.y + 100));
        }
    }

    //&& this.character.collectedBottles > 0
}