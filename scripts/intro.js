var introimage;

function preload() {
    introimg = loadImage("images/introimage.jpg");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    frameRate(25);
    imageMode(CORNERS);
    image(introimg, 0, 0, width, height);
    text("AMBIENT RECORDS", mouseX, mouseY)


}

function mouseClicked() {
    if (((mouseX < width) && (mouseX > 0)) && ((mouseY > 0) && (mouseY < height))) {
        window.location.href = "artistpage.html";
    }
}


function windowResized() {

    resizeCanvas(windowWidth, windowHeight);
}