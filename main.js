let config = {
    'width': 1600,
    'height': 1000,
    'resetDriftTime': 500
}

let MODE = 'options';
let AUDIO_MODE;
let font, hpi;

let soundObjects;

function preload() {
    font = loadFont('./assets/retro.ttf');
    hpi = loadImage('./assets/hpilogo.png');
}

function setup() {
    createCanvas(config['width'], config['height']);
    createButtons();
    createErrorMessages();
    createTextbox();
    soundObjects = createSoundObjects(2, 10);
}

function draw() {
    background(0);
    if (MODE === 'options') {
        optionsMode();
    } else if (MODE === 'menu') {
        menuMode();
    } else if (MODE === 'game') {
        gameMode();
    }
    image(hpi, width - 220, height - 130, 0.2 * hpi.width, 0.2 * hpi.height);
}

function mousePressed() {
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
    }
}
  
function mouseReleased() {
    if (MODE == 'game') {
        for (let i = 0; i < soundObjects.length; i++) {
            soundObjects[i].released();
        }
    }
}