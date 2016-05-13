/*ARTIST BUTTON OBJECT DEFINTITON:
The artist Button object will contain:
    1. position and size information
    2. artist artwork for the button and also the artist album covers
    3. The HTML Paragraph text for the blurb
    4. The link to the corresponding Artist play back page
    5. functions to check mouse over and selection states
    6. Functions to draw and modify the buttons visual state
*/



//define the artistbutton object
function artistButton(artistImg, artistBG, albumCover, blurb) {
    this.artistImg = artistImg,
        this.artistBG = artistBG,
        this.albumCover = albumCover,
        this.artistBlurb = blurb,

        // this function when called refreshes the buttons position values
        this.position = function (positionX, positionY, Width, Height) {
            this.positionX = positionX,
                this.positionY = positionY,
                this.Height = Height,
                this.Width = Width
        },

        //This section checks if the artist button has been clicked on and sets the returns true or false
        this.clicked = function () {
            //check if the Left mouse button was pressed over the button

            if ((mouseButton == LEFT) && isMouseOver(this)) {

                return true;

            } else {
                return false;

            }
        },

        //this section draws the button, making certain changes depending on the button objects current state
        this.drawButton = function () {

            //if the mouse is over the button then increase the weight of the stroke
            if (isMouseOver(this)) {
                stroke('green');
                strokeWeight(15);
            } else {
                //if not then use a lighter stroke
                stroke('black');
                strokeWeight(5);
            }

            //draw the button boundary:
            if (this.isSelected) {
                stroke("Red");
            }

            rect(this.positionX, this.positionY, this.Width, this.Height);

            //This section fills the button with the loaded image
            //sets the mode to corners to the image sizes into the boundaries of the button
            imageMode(CORNERS);

            //if the button is currently selected add a blue tint to the image before drawing it
            if (this.isSelected) {
                tint("RED");
            } else {
                noTint();
            }

            //finally, draw the image:
            image(artistImg, this.positionX, this.positionY, (this.positionX + this.Width), (this.positionY + this.Height));
        }

};

/*TRACK BUTTON OBJECT DEFINITION:
The track button obect will contain:
    1. Button position and size infomration
    2. The song data to be played
    3. Song button artwork and the track title
    
*/
function trackButton(track, trackImg) {
    this.track = track,

        this.trackImg = trackImg,

        // this function when called refreshes the buttons position values
        this.position = function (positionX, positionY, Width, Height) {
            this.positionX = positionX,
                this.positionY = positionY,
                this.Height = Height,
                this.Width = Width
        },
        //This section checks if the artist button has been clicked on and sets the returns true or false
        this.clicked = function () {
            //check if the Left mouse button was pressed over the button

            if ((mouseButton == LEFT) && isMouseOver(this)) {

                return true;

            } else {
                return false;

            }
        },

        this.drawButton = function () {

            //if the mouse is over the button then increase the weight of the stroke
            if (isMouseOver(this)) {
                stroke('red');
                strokeWeight(8);
            } else {
                //if not then use a lighter stroke but change colour depending on if the button is selected
                if (this.isSelected) {
                    stroke('green');
                    strokeWeight(8);
                } else {

                    stroke('black');
                    strokeWeight(5);
                }
            }

            //draw the button boundary:
            fill(255, 255, 200);
            rect(this.positionX, this.positionY, this.Width, this.Height);


            //This section fills the button with the loaded image
            //sets the mode to corners to the image sizes into the boundaries of the button
            imageMode(CORNERS);

            //if the button is currently selected add a blue tint to the image before drawing it

            noTint();


            //finally, draw the image:
            image(trackImg, this.positionX, this.positionY, (this.positionX + this.Width), (this.positionY + this.Height));
        }


};



/*Standard Button
Simple button to call another function when pressed
contains some similar functions to the artist button for modifying the display states
*/

function standardButton(img, ButtonFunction) {
    this.img = img,
        this.buttonFunction = ButtonFunction,

        // this function when called refreshes the buttons position values
        this.position = function (positionX, positionY, Width, Height) {
            this.positionX = positionX,
                this.positionY = positionY,
                this.Height = Height,
                this.Width = Width
        },


        //This section checks if the button has been clicked on and activates the function
        this.clicked = function () {
            //check if the Left mouse button was pressed over the button
            if ((mouseButton == LEFT) && isMouseOver(this)) {
                //if so call the function
                this.buttonFunction();
            }
        },
        this.drawButton = function () {

            //if the mouse is ober the button then increase the weight of the stroke
            if (isMouseOver(this)) {
                stroke('green');
                strokeWeight(10);
            } else {
                //if not then use a lighter stroke (unless is is selected in which case it will be a different colour)
                stroke('black');
                strokeWeight(5);
            };

            //draw the button boundary:
            rect(this.positionX, this.positionY, this.Width, this.Height);

            //This section fills the button with the loaded image
            //sets the mode to corners to the image sizes into the boundaries of the button
            imageMode(CORNERS);


            //finally, draw the image:
            image(img, this.positionX, this.positionY, (this.positionX + this.Width), (this.positionY + this.Height));
        };
};




//additional functions to check if mouse position is over an object when the function is called

//this function will check if the mouse is over any of the above button objects that are passed to it:
function isMouseOver(object) {
    //check if the mouse is over the object
    if ((mouseX > object.positionX) &&
        (mouseX < (object.positionX + object.Width)) &&
        (mouseY > object.positionY) &&
        (mouseY < (object.positionY + object.Height))) {

        //if so then return
        return true
    } else {
        //if not then false
        return false
    }
};

//this function will check if the mouse is over any specific points that are passed to it
function isMouseOverPoints(positionX, positionY, objectwidth, objectheight) {
    //check if the mouse is over the object
    if ((mouseX > positionX) &&
        (mouseX < (positionX + objectwidth)) &&
        (mouseY > positionY) &&
        (mouseY < (positionY + objectheight))) {

        //if so then return
        return true
    } else {
        //if not then false
        return false
    }
};



//function to create a playback controller object
/*PlaybackController
This object contains the playback controller buttons and functions to play the track, fast forward and rewind
also contains functions to detect which of the three buttons has been pressed and change draw state of play/paus buttons
*/
function playbackController() {
    //set the positions
    this.position = function (posx, posy, controllerwidth, controllerheight) {
            this.positionX = posx,
                this.positionY = posy,
                this.controllerwidth = controllerwidth,
                this.controllerheight = controllerheight

        },
        //set a flag for if the controller is playing music
        this.isPlaying = false
    //load all the images for the controller
        this.playicon = loadImage("images/play.png"),
        this.pauseicon = loadImage("images/stop.png"),
        this.rewindicon = loadImage("images/rewind.png"),
        this.forwardicon = loadImage("images/forward.png"),

        //function to control behaviour when play button is pressed
        this.playPressed = function () {
            if (this.isPlaying) {
                //pause tracks by looping through the tracks and pausing ( no need to check which track is playing)
                for (i = 0; i < trackbuttons.length; i++) {
                    trackbuttons[i].track.pause();
                    this.isPlaying = !this.isPlaying;
                }

            } else {
                //find which track button is selected and play the track by looping through the track button array
                for (i = 0; i < trackbuttons.length; i++) {
                    if (trackbuttons[i].isSelected) {
                        trackbuttons[i].track.play();
                        //change the flag on the controller
                        this.isPlaying = !this.isPlaying;
                    }
                }
            }

        },
            //forward function
        this.forwardTrack = function () {
        //find the playing track by looping through the track button array and jump it forward by 10 seconds
        for (i = 0; i < trackbuttons.length; i++) {
            if((trackbuttons[i].track.isPlaying())){
                trackbuttons[i].track.jump((trackbuttons[i].track.currentTime()) + 10);
            }
        }
    },
            //rewind function
        this.rewindTrack = function () {
                for (i = 0; i < trackbuttons.length; i++) {
            //find the playing track by looping through the track button array and jump it back by 10 seconds
            if((trackbuttons[i].track.isPlaying())){
                trackbuttons[i].track.jump((trackbuttons[i].track.currentTime()) - 10);
            }
        }
    },
            //function to draw the controller buttons
        this.drawController = function () {
            imageMode(CORNER);
            noTint();
            //if the song is playing then draw a pause button otherwise draw a play button
            if (this.isPlaying) {
                image(this.pauseicon, this.positionX, this.positionY, (this.controllerwidth / 3), this.controllerheight);
            } else {
                image(this.playicon, this.positionX, this.positionY, (this.controllerwidth / 3), this.controllerheight);
            }
            //draw the other two buttons next to the play button
            image(this.rewindicon, this.positionX + (this.controllerwidth / 3), this.positionY, (this.controllerwidth / 3), this.controllerheight);
            image(this.forwardicon, this.positionX + ((this.controllerwidth / 3) * 2), this.positionY, (this.controllerwidth / 3), this.controllerheight);
        },
        //check if the buttons have been clicked
        this.clicked = function () {
            //check if the Left mouse button was pressed over each of the buttons and calls the correct function for that button

            if (mouseButton == LEFT) {
                if (isMouseOverPoints(this.positionX, this.positionY, (this.controllerwidth / 3), this.controllerheight)) {

                    this.playPressed();
                } else if (isMouseOverPoints(this.positionX + (this.controllerwidth / 3), this.positionY, (this.controllerwidth / 3), this.controllerheight)) {
                    this.rewindTrack();
                } else if (isMouseOverPoints((this.positionX + ((this.controllerwidth / 3) * 2)), this.positionY, (this.controllerwidth / 3), this.controllerheight)) {
                    this.forwardTrack();
                }

            }
        }
};