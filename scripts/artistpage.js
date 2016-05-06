var artistButtons = [];
var artArray1 = [];
var artArray2 = [];
var artArray3 = [];
var numberOfArtists = 3; //set this depending on number of artists and artist content is present in folders
var playArtist;
var playArtistImg;
var artistBlurb;


function preload() {

    //create an array for each artist that contains their respective artist artwork
    for (i = 0; i < numberOfArtists; i++) {
        //load each image file, they must be named and in the correct numbered location as below:
        artArray1[i] = loadImage("artists/artist" + i + "/artistbutton.jpg");
        artArray2[i] = loadImage("artists/artist" + i + "/artistbackground.jpg");
        artArray3[i] = loadImage("artists/artist" + i + "/albumcover.jpg");
    }

    playArtistImg = loadImage("images/playartist.png");

}

function setup() {
    createCanvas(windowWidth, windowHeight);

    //create an array of artistButtons objects and load in the album artwork
    for (i = 0; i < numberOfArtists; i++) {
        artistButtons[i] = new artistButton(artArray1[i], artArray2[i], artArray3[i]);
    }

    //by default set the first artist button as being the currently selected one
    artistButtons[0].isSelected = true;

    //create the "Play Album" Button
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
            imageMode(CORNER);
            image(artistButtons[i].artistBG, 0, 0, width, height);

            //draw a border for the album cover
            stroke("white");
            strokeWeight(4);
            rect((width / 2) + 10, (height / 8), (width / 2.5), (width / 2.5));
            //draw the album cover
            image(artistButtons[i].albumCover, (width / 2) + 10, (height / 8), (width / 2.5), (width / 2.5));
        }
    }



    //loop through the array of artistButtons and call their draw function:
    for (i = 0; i < artistButtons.length; i++) {
        artistButtons[i].drawButton();
    }

    //call the standardbutton objects draw function to draw the play link button
    playArtist.drawButton();

}



function windowResized() {
    //this function will call dynamic positioning whenever the window is resized in order to correct the element positions
    dynamicPositioning()
}

function mouseClicked() {
    //loop through the artistButton object array and call their functions to check if they have been pressed
    for (i = 0; i < artistButtons.length; i++) {
        //if the artist button is clicked set the isSelected flag to true to select it
        if (artistButtons[i].clicked()) {
            artistButtons[i].isSelected = true;
        }

        //if that button has not been clicked on do not deselect it unless one of the other artist buttons was clicked on
        else {
            for (j = 0; j < artistButtons.length; j++) {
                if (artistButtons[j].clicked()) {
                    artistButtons[i].isSelected = false;
                }
            }
        }

    }

    //check if play album button was clicked by calling its function
    playArtist.clicked();

    // prevent default
    return false;
}

function goToPlaybackPage() {
    //check which artistButton object in the array is currently selected
    for (i = 0; i < artistButtons.length; i++) {
        if (artistButtons[i].isSelected) {

            //load the albumpage.html and pass it the selected artist number at the end of the URL
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