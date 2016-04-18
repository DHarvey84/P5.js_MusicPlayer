var artistButtons = [];
var artArray1 = [];
var artArray2 = [];
var artArray3 = [];
var numberOfArtists = 3; //set this depending on number of artists and artist content is present in folders
var playArtist;
var playArtistImg;
var artistBlurb;

function preload() {

    //load the array of artist images and backgrounds
    for (i = 0; i < numberOfArtists; i++) {
        //load each file, they must be named and in the correct numbered location as below:
        artArray1[i] = loadImage("artists/artist" + i + "/artistbutton.jpg");
        artArray2[i] = loadImage("artists/artist" + i + "/artistbackground.jpg");
        artArray3[i] = loadImage("artists/artist" + i + "/albumcover.jpg");
    }

    playArtistImg = loadImage("images/playartist.png");

}

function setup() {
    createCanvas(windowWidth, windowHeight);

    //create the array of artistButtons
    for (i = 0; i < numberOfArtists; i++) {
        artistButtons[i] = new artistButton(artArray1[i], artArray2[i], artArray3[i]);
    }

    //by default set the first artist button as being selected
    artistButtons[0].isSelected = true;

    //create the "Play Album Button"
    playArtist = new standardButton(playArtistImg, goToPlaybackPage);
    
    dynamicPositioning();


}

function draw() {

    background(200);
    
    
    //draw the currently selected artists background and album cover    
    for (i = 0; i < artistButtons.length; i++) {
        //if current artist is selected
        if (artistButtons[i].isSelected) {
            //draw the background
            imageMode(CORNERS);
            image(artistButtons[i].artistBG, 0, 0, width, height);
            //draw the album cover
            image(artistButtons[i].albumCover, (width/2) + 10, (height/8), ((width/2) + 10 + width/3), (height/8) + (width/3));
        }
    }
    

    
    //draw the array of artistButtons:
    for (i = 0; i < artistButtons.length; i++) {
        artistButtons[i].drawButton();
    }
    
    //draw the play link button
    playArtist.drawButton();

}



function windowResized() {

    dynamicPositioning()
}

function mouseClicked() {
    //check if any of the artist buttons were pressed
    for (i = 0; i < artistButtons.length; i++) {
        //if the artist button is clicked set the isSelected flag to true
        if (artistButtons[i].clicked()) {
            artistButtons[i].isSelected = true;
        }

        //if it has not been clicked do not deselect the button unless one of the other artist buttons was clicked
        else {
            for (j = 0; j < artistButtons.length; j++) {
                if (artistButtons[j].clicked()) {
                    artistButtons[i].isSelected = false;
                }
            }
        }

    }

    //check if play album button was clicked
    playArtist.clicked();

    // prevent default
    return false;
}

function goToPlaybackPage() {
    //check which artist is selected
    for (i = 0; i < artistButtons.length; i++) {
        if (artistButtons[i].isSelected) {

            //load the playbackpage with the selected artist number included in the URL
            window.location.href = 'albumpage.html' + '#' + i;
        }
    }

}

function dynamicPositioning() {
    //if the window is resized readjust the positions of the elements:
    resizeCanvas(windowWidth, windowHeight);
    //update button positions
    for (i = 0; i < artistButtons.length; i++) {
        artistButtons[i].position(width / 100 + ((width / 4) * i * 1.2), (height - (height / 6)), width / 4, height / 8);
    }

    playArtist.position((width - (width / 8) - 5), (height - (height / 6)), height / 8, height / 8);
}