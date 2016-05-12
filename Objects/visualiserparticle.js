// define the particle object:
function Particle(x, y, circleSize, jitterfactor) {
    // feed the parameters in from the object
    if (x == null) {
        this.x = random(width);
    } else {
        this.x = x;
    }
    if (y == null) {
        this.y = random(height);
    } else {
        this.y = y;
    }

    //define the particle size
    if (circleSize == null){
        this.size = 150;
    }else {
    this.size = circelSize;
    }
        if (jitterfactor == null){
        this.jitterfactor = 30;
    }else {
    this.jitterfactor = jitterfactor;
    }
    


        // define the moving behaviour using jitter (sampled from Amplitude) and jitterfactor (controls the sensitivity to amplitude)
        this.move = function (jitter) {
            this.jitter = jitter;
            this.x = this.x + random(this.jitter * (this.jitterfactor * -1), (this.jitter * this.jitterfactor));
            this.y = this.y + random(this.jitter * (this.jitterfactor * -1), (this.jitter * this.jitterfactor));
        },

        //define the draw behaviour of the particle object
        this.draw = function (jitter,colour) {
            this.jitter = jitter
            this.colour = colour;
            ellipseMode(CENTER);
            //select a colour using the sampled FFT values
            colorMode(HSB, 100);
            fill(this.colour, 150, 100);
            noStroke();
            //finally draw the particle
            ellipse(this.x, this.y, 10 + (this.jitter * this.size), 10 + (this.jitter * this.size));
        }

} ; //end of Partcle Definition
