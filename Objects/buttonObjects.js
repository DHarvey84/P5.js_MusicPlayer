/*ARTIST BUTTON OBJECT DEFINTITON:
The artist Button object will contain:
    1. position and size information
    2. artist artwork for the button and also the artist information panel 
    3. The HTML Paragraph objects for the artist description and information
    4. The link to the corresponding Artist play back page
    5. functions to check mouse over and selection states
    6. Functions to draw and modify the buttons visual state
*/



//define the artistbutton object
function artistButton(artistImg, artistBG, albumCover) {
    this.artistImg = artistImg,
        this.artistBG = artistBG,
        this.albumCover = albumCover,

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


/*Standard Button
Simple button to call another function when pressed
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

            //if the button is currently selected add a blue tint to the image before drawing it
            if (this.isSelected) {
                tint("0, 153, 204");
            } else {
                noTint();
            }

            //finally, draw the image:
            image(img, this.positionX, this.positionY, (this.positionX + this.Width), (this.positionY + this.Height));
        };
};


/*TRACK BUTTON OBJECT DEFINITION:
The track button obect will contain:
    1. Button position and size infomration
    2. The song data to be played
    3. waveform analysis of the track
    4. track information, name length
    5. playback state information
    
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
            fill(255,255,200);
            rect(this.positionX, this.positionY, this.Width, this.Height);


                        //This section fills the button with the loaded image
                        //sets the mode to corners to the image sizes into the boundaries of the button
                        imageMode(CORNERS);
            
                        //if the button is currently selected add a blue tint to the image before drawing it

                            noTint();
                        
            
                        //finally, draw the image:
                        image(trackImg, this.positionX, this.positionY, (this.positionX + this.Width), (this.positionY + this.Height));
        }


}

//functions to check if mouse position is over an object when the function is called

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

