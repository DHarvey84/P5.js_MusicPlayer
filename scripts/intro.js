function setup(){
createCanvas(windowWidth, windowHeight);
}

function draw(){
    frameRate(25);
    
    rect((width/4),(height/4),(width/4),(height/4));
    text("INDEXPAGE", 100,100)
    

}

    function mousePressed() {
        window.location.href = "artistpage.html";
    }
    