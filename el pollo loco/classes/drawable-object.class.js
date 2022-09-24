class DrawableObject {

    img;
    imageCache = {};
    currentImage = 0;
    x = 180;
    y = 280;
    height = 150;
    width = 100;

    loadImage(path) {
        this.img = new Image(); // this.img = document.getelementById('img'); <img id="img">
        this.img.src = path;
    }

    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            debugger;
            console.log(e)
        }
    }

    /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...];
     */

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }
}