    //collect which artist is selected from the URL passed from artistpage.js
    var artist = window.location.hash.substring(1);

    //initialise all other variables
    //array of track button objects
    var trackbuttons = [];
    //set the number of artists
    var numberOfArtists = 3;
    //playback controller object
    var controller;
    //visualiser1 start button
    var visualiser1;
    //array of visualiser paint particles
    var v1particles = [];
    //initial number of paint particles
    var numberofparticles = 20;
    //flag for visualiser state
    var visualiser1running = false;
    //audio fft analysis
    var fft;
    //audio amplitude analysis
    var amplitude;
    //image for the visualiser button
    var paintModeimg;


    function preload() {
        //initialise an array of track button objects and load in their respective audion track and track image
        for (i = 0; i < numberOfArtists; i++) {
            trackbuttons[i] = new trackButton(loadSound("artists/artist" + artist + "/track" + (i + 1) + ".mp3"), loadImage("artists/artist" + artist + "/track" + (i + 1) + "image.jpg"));






        }

        //load the visualiser button image
        paintModeimg = loadImage("images/paintmode.jpg");

        //select the first track button by default
        trackbuttons[0].isSelected = true;

        //initialise playback controller
        controller = new playbackController();



    }

    function setup() {
        //attempt to fix frame rate at 25 FPS (prevents too many particles being created when mouse dragged)
        frameRate(25);

        createCanvas(windowWidth, windowHeight);

        // create the visualiser buttons
        visualiser1 = new standardButton(paintModeimg, visualisation1);

        //create the amplitude sampler audio
        amplitude = new p5.Amplitude();
        //create fft sampler for audio
        fft = new p5.FFT();



        //set initial button and element positions
        dynamicPositioning();

    }

    function draw() {
        //fix framerate for consistent behaviour across different computers
        frameRate(25);

        //if the visualiser is running, allow some blur
        if (visualiser1running) {
            background(0, 0, 0, 4);
        }
        //if not then refresh background with no blur
        else {
            background(0);
        }


        //if a visualiser is running, we draw it first to prevent them drawing over the important buttons

        if (visualiser1running) {

            //Update the FFT and amplitude audio analyser for the visualisers
            currentfft = fft.analyze(128);
            amp = amplitude.getLevel();
            //now we go through each particle in the array and change its size based on amplitude and colour based of fft spectrum
            for (i = v1particles.length - 1; i >= 0; i--) {
                //below equation causes the particle colours respond to the FFT analysis of the sound
                //it is a function of the amount of particles on the screen, and distrubuting them across the fft spectrum
                fftcolour = round(map(currentfft[round((map(i, 0, v1particles.length - 1, 0, 128)))], 0, 255, 0, 100));

                //now call the draw function of each particle and pass the size and colour
                v1particles[i].draw(amp, fftcolour);
                //call the move function and use the volume to control how much the particle moves
                v1particles[i].move(amp);
            }
        }

        //draw the array of track button objects by calling their draw function
        for (i = 0; i < numberOfArtists; i++) {
            trackbuttons[i].drawButton();
        }
        controller.drawController();



        //draw the select Track" text field
        textAlign(CENTER);
        textSize(24);
        textStyle(BOLD);
        fill(255);
        noStroke();
        text("Select Track!", 10, 30, width / 4, height / 9);


        //draw the visualiser button by calling its function
        visualiser1.drawButton();




    }

    function dynamicPositioning() {

        //refresh canvas size
        resizeCanvas(windowWidth, windowHeight);

        //set the track button position
        for (i = 0; i < numberOfArtists; i++) {
            trackbuttons[i].position(10, height / 9 + (i * 15) + (i * (height / 9)), width / 4, height / 9);
            //put the controller at the end of the track buttons
            if (i == (numberOfArtists - 1)) {
                controller.position(10, height / 9 + ((i + 1) * 15) + ((i + 1) * (height / 9)), width / 4, height / 9);


            }
            
        }

//put visuals button at bottom of the pane

                visualiser1.position(width/2, height/2, width / 4, height / 9);

    }


    function windowResized() {

        dynamicPositioning()
    }

    function mouseClicked() {
        //check if any of the artist buttons were pressed by looping through the array and calling its function
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

        //check if the visualiser button was pressed
        visualiser1.clicked();
    }




    function visualisation1() {

        //create a new array or reset the existing array of particles
        //ensure they are within the visualisation area of window
        v1particles = [];
        for (i = 0; i < numberofparticles; i++) {
            v1particles[i] = new Particle(random(width / 4, width), random(height / 8, (height - height / 8)));
        }

        //draw a one time instruction to tell user that they can draw particles on the screen (it will fade)
        textSize(42);
        fill("Red");
        text("Use mouse to draw!!", height / 2, width / 2);

        //set a flag to tell draw function that visualiser 1 is initialised and running
        visualiser1running = true;




    };


    //allow user to draw in new particles by holding the mouse button
    function mouseDragged() {
        //if there are less than 500 particles, add new particles to end of the array
        if (visualiser1running) {
            if (v1particles.length < 500) {
                v1particles.push(new Particle(mouseX, mouseY));
            } else {
                //if there are already 500 particles delete the oldest particle first
                v1particles.splice(1, 1);
                v1particles.push(new Particle(mouseX, mouseY));
            }
        }
    }