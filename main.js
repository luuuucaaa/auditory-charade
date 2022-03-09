let config = {
    'width': 1600,
    'height': 1000,
    'resetDriftTime': 500
}

let MODE = 'options';
let AUDIO_MODE;
let PLAYBACK = false;
let font, hpi;
let cvs;

let mouseOccupied = false;

const SOUNDOBJECT_ROWS = 2;
const SOUNDOBJECT_COLS = 10;
let soundObjects, scenes;

function preload() {
    font = loadFont('./assets/retro.ttf');
    hpi = loadImage('./assets/hpilogo.png');
}

/* function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
} */

function setup() {
    cvs = createCanvas(config['width'], config['height']);
    createButtons();
    createErrorMessages();
    createTextbox();
    createPerlingrid();
    scenes = createScenes();
    soundObjects = createSoundObjects(SOUNDOBJECT_ROWS, SOUNDOBJECT_COLS);
}

function draw() {
    background(0);
    handlePerlingrid();
    fullscreenButton.over();
    fullscreenButton.show();
    // displayFramerate();
    if (MODE === 'options') {
        optionsMode();
    } else if (MODE === 'menu') {
        menuMode();
    } else if (MODE === 'game') {
        gameMode();
    } else if (MODE === 'play') {
        playbackMode(3000);
    }
    image(hpi, width - 220, height - 130, 0.2 * hpi.width, 0.2 * hpi.height);
}

function mousePressed() {
    fullscreenButton.pressed();
    if (MODE === 'options') {
        binauralButton.pressed();
        multichannelButton.pressed();
    } else if (MODE === 'menu') {
        playButton.pressed();
        optionsButton.pressed();
        infoButton.pressed();
    } else if (MODE === 'game') {
        for (let i = 0; i < soundObjects.length; i++) {
            soundObjects[i].pressed();
        }
        menuButton.pressed();
        resetButton.pressed();
        playbackButton.pressed();
    } else if (MODE === 'play') {
        stopButton.pressed();
    }
}
  
function mouseReleased() {
    if (MODE == 'game') {
        for (let i = 0; i < soundObjects.length; i++) {
            soundObjects[i].released();
        }
    }
}