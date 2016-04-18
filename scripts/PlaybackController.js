//function to create a playback controller object

function playbackController() {
    this.position = function (posx, posy, controllerwidth, controllerheight) {
            this.positionX = posx,
                this.positionY = posy,
                this.controllerwidth = controllerwidth,
                this.controllerheight = controllerheight

        },
        this.isPlaying = false
    this.playicon = loadImage("images/play.png"),
        this.pauseicon = loadImage("images/pause.png"),
        this.rewindicon = loadImage("images/rewind.png"),
        this.forwardicon = loadImage("images/forward.png"),

        //function to control behaviour when play button is pressed
        this.playPressed = function () {
            if (this.isPlaying) {
                //pause tracks ( no need to check which one)
                for (i = 0; i < trackbuttons.length; i++) {
                    trackbuttons[i].track.pause();
                    this.isPlaying = !this.isPlaying;
                }

            } else {
                //find which track button is selected and play the track
                for (i = 0; i < trackbuttons.length; i++) {
                    if (trackbuttons[i].isSelected) {
                        trackbuttons[i].track.play();
                        //change the flag on the controller
                        this.isPlaying = !this.isPlaying;
                    }
                }
            }

        },
        this.forwardTrack = function () {
        //find the playing track and jump it forward by 10 seconds
        for (i = 0; i < trackbuttons.length; i++) {
            if((trackbuttons[i].track.isPlaying())){
                trackbuttons[i].track.jump((trackbuttons[i].track.currentTime()) + 10);
            }
        }
    },
        this.rewindTrack = function () {
                for (i = 0; i < trackbuttons.length; i++) {
            if((trackbuttons[i].track.isPlaying())){
                trackbuttons[i].track.jump((trackbuttons[i].track.currentTime()) - 10);
            }
        }
    },

        this.drawController = function () {
            imageMode(CORNER);
            noTint();
            if (this.isPlaying) {
                image(this.pauseicon, this.positionX, this.positionY, (this.controllerwidth / 3), this.controllerheight);
            } else {
                image(this.playicon, this.positionX, this.positionY, (this.controllerwidth / 3), this.controllerheight);
            }
            image(this.rewindicon, this.positionX + (this.controllerwidth / 3), this.positionY, (this.controllerwidth / 3), this.controllerheight);
            image(this.forwardicon, this.positionX + ((this.controllerwidth / 3) * 2), this.positionY, (this.controllerwidth / 3), this.controllerheight);
        },

        this.clicked = function () {
            //check if the Left mouse button was pressed over each of the buttons and calls the correct function

            if (mouseButton == LEFT) {
                if (isMouseOverPoints(this.positionX, this.positionY, (this.controllerwidth / 3), this.controllerheight)) {

                    this.playPressed(console.log("Play"));
                } else if (isMouseOverPoints(this.positionX + (this.controllerwidth / 3), this.positionY, (this.controllerwidth / 3), this.controllerheight)) {
                    this.rewindTrack(console.log("Rewind"));
                } else if (isMouseOverPoints((this.positionX + ((this.controllerwidth / 3) * 2)), this.positionY, (this.controllerwidth / 3), this.controllerheight)) {
                    this.forwardTrack(console.log("forward"));
                }

            }
        }
};
