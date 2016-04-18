    //get which artist is selected from the URL
    var artist = window.location.hash.substring(1)
    var trackbuttons = []
    var numberOfArtists = 3
    var controller;
    var visualiser1;
    var v1particles = [];
    var numberofparticles = 20;
    var visualiser1running = false;
    var fft;
    var amplitude;

    function preload() {
        //initialise array of track buttons
        for (i = 0; i < numberOfArtists; i++) {
            trackbuttons[i] = new trackButton(loadSound("artists/artist" + artist + "/track" + (i + 1) + ".mp3"), loadImage("artists/artist" + artist + "/track" + (i + 1) + "image.jpg"));
            



        }
        //select the first track button by default
        trackbuttons[0].isSelected = true;
        
        //initialise playback controller
        controller = new playbackController();
        //create the sampler for volume
        amplitude = new p5.Amplitude();
        //create sampler for fft
        fft = new p5.FFT();


    }

    function setup() {
        //attempt to fix frame rate at 25 FPS (prevents too many particles being created when mouse dragged)
        frameRate(25);

        createCanvas(windowWidth, windowHeight);
        
        
        
        
        //set initial button and element positions
        dynamicPositioning();

        //create aplitude and FFT analysers for the visualisers


        // create the visualiser buttons
        visualiser1 = createButton('Visualisation 1');
        visualiser1.position(width / 2, height / 2);
        //set the function for visualiser1
        visualiser1.mousePressed(visualisation1);


    }

    function draw() {
        
        if (visualiser1running){
        background(0, 0, 0, 4);
        }
        else {
            background(0);
        }


        //draw visualisers first to prevent them drawing over the important buttons

        if (visualiser1running) {
            //draw the array of particles
            //Update the FFT audio analyser for the visualisers
            currentfft = fft.analyze(128);
            amp = amplitude.getLevel()
            for (i = v1particles.length - 1; i >= 0; i--) {
                //equation to make the particle colours respond to the FFT analysis of the sound
                fftcolour = round(map(currentfft[round((map(i, 0, v1particles.length - 1, 0, 128)))], 0, 255, 0, 100));
                v1particles[i].draw(amp, fftcolour);
                v1particles[i].move(amp);
            }
        }

        for (i = 0; i < numberOfArtists; i++) {
            trackbuttons[i].drawButton();
        }
        controller.drawController();
        
        //draw the instruction text fields
        textAlign(CENTER);
        textSize(24);
        textStyle(BOLD);
        fill(255);
        noStroke();
        text("Select Track!",10, 30, width / 4, height / 9);







    }

    function dynamicPositioning() {

        //refresh canvas size
        resizeCanvas(windowWidth, windowHeight);

        //set the track button position
        for (i = 0; i < numberOfArtists; i++) {
            trackbuttons[i].position(10, height/9 + (i * 15) + (i * (height / 9)), width / 4, height / 9);
            //put the controller at the end of the track buttons
            if (i == (numberOfArtists - 1)) {
                controller.position(10, height/9 + ((i + 1) * 15) + ((i + 1) * (height / 9)), width / 4, height / 9);

                //put the visualiser buttons under the controller
                //visualiser1.position(10,((i + 2) * 10) + ((i + 2) * (height / 10)));
            }
        }



    }


    function windowResized() {

        dynamicPositioning()
    }

    function mouseClicked() {
        //check if any of the artist buttons were pressed
        for (i = 0; i < trackbuttons.length; i++) {
            //if the artist button is clicked set the isSelected flag to true
            if (trackbuttons[i].clicked()) {
                trackbuttons[i].isSelected = true;
            }

            //if it has not been clicked do not deselect the button unless one of the other artist buttons was clicked
            else {
                for (j = 0; j < trackbuttons.length; j++) {
                    if (trackbuttons[j].clicked()) {
                        trackbuttons[i].isSelected = false;
                    }
                }
            }

        }

        //check if the controller has been used
        controller.clicked();
    }

    function visualisation1() {

        //create a new array or reset the existing array of particles
        //ensure they are within the visualisation area of window
        v1particles = [];
        for (i = 0; i < numberofparticles; i++) {
            v1particles[i] = new Particle(random(width / 4, width), random(height / 8, (height - height / 8)));
        }

        //set a flag to tell draw that visualiser 1 is intiialised and running
        visualiser1running = true;




    };

    function mouseDragged() {
        //allow user to draw in new particles
        if (visualiser1running) {
            if (v1particles.length < 500) {
                v1particles.push(new Particle(mouseX, mouseY));
            } else {
                //if there are already 500 particles delete the oldest one before adding the new one
                v1particles.splice(1, 1);
                v1particles.push(new Particle(mouseX, mouseY));
            }
        }
    }