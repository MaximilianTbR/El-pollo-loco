class MovableObject {
    x = 120;
    y = 400;
    img;
    height = 150;
    width = 100;


    //loadImage('img/test.png');
    loadImage(path) {
        this.img = new Image(); // this.img = document.getelementById('img'); <img id="img">
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right');
    }
}