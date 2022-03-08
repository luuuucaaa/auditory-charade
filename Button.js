class Button {
    constructor(x, y, w, h, col, text, onPress) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.col = col;
        this.alpha = 0;
        this.text = text;
        this.rollover = false;
        this.onPress = onPress;
    }
    over() {
        if (mouseX > this.x - this.w/2 && mouseX < this.x + this.w/2 && mouseY > this.y - this.h/2 && mouseY < this.y + this.h/2) {
            this.rollover = true;
        } else {
            this.rollover = false;
        }
    }
    pressed() {
        if (mouseX > this.x - this.w/2 && mouseX < this.x + this.w/2 && mouseY > this.y - this.h/2 && mouseY < this.y + this.h/2) {
            this.alpha = 0;
            this.onPress();
        }
    }
    show() {
        noStroke();
        fill(0, 100);
        rect(this.x - this.w/2, this.y - this.h/2, this.w, this.h);

        this.col.setAlpha(255);
        strokeWeight(4);
        stroke(this.col);
        if (this.rollover) {
            this.alpha = 200;
        } else if (this.alpha > 0) {
            this.alpha -= 2
        };
        this.col.setAlpha(this.alpha);
        fill(this.col); 
        rect(this.x - this.w/2, this.y - this.h/2, this.w, this.h);

        textAlign(CENTER);
        textSize(32);
        textFont(font);
        fill(0);
        text(this.text, this.x, this.y + 10);
    }
}

let binauralButton, multichannelButton, playButton, infoButton, optionsButton, resetButton, menuButton, playbackButton, stopButton;

function createButtons() {
    binauralButton = new Button(width/2, height/2 - 100, 800, 100, getRandomHpiColor(10, 255), 'Binaural Audio', binauralButtonPressed);
    multichannelButton = new Button(width/2, height/2 + 100, 800, 100, getRandomHpiColor(10, 255), 'Multichannel Audio', multichannelButtonPressed, 'oaiszdoaiszdo');
    playButton = new Button(width/2, height/3 - 100, 800, 100, color(255), 'Play', playButtonPressed);
    infoButton = new Button(200, height - 50, 60, 60, color(255), 'i', infoButtonPressed);
    optionsButton = new Button(80, height - 50, 120, 60, color(255), 'Back', optionsButtonPressed);
    resetButton = new Button(width - 90, 50, 140, 60, color(255), 'Reset', resetButtonPressed);
    menuButton = new Button(80, height - 50, 120, 60, color(255), 'Menu', menuButtonPressed);
    playbackButton = new Button(width/2, 50, 280, 60, color(255), 'Play Scenes', playbackButtonPressed);
    stopButton = new Button(width/2, 50, 280, 60, color(255), 'Stop Scenes', stopButtonPressed);
}

function binauralButtonPressed() {
    initBinauralAudio();
    AUDIO_MODE = 'binaural';
    MODE = 'menu';
    soundObjectsFlash();
    buttonAlphaReset();
}

function multichannelButtonPressed() {
    try {
        initMultichannelAudio();
    } catch (e) {
        multichannelError.flash();
        return
    }
    AUDIO_MODE = 'multichannel';
    MODE = 'menu';
    soundObjectsFlash();
    buttonAlphaReset();
}

function playButtonPressed() {
    for (let i = 0; i < soundObjects.length; i++) {
        soundObjects[i].resetDrift(config['resetDriftTime']);
    }
    setTimeout(function() {
        stopThemeSong();
        MODE = 'game';
    }, config['resetDriftTime']);
    buttonAlphaReset();
}

function infoButtonPressed() {
    if (textbox.isActive == true) {
        textbox.isActive = false;
    } else {
        textbox.isActive = true;
    }
}

function optionsButtonPressed() {
    MODE = 'options';
    buttonAlphaReset();
    stopThemeSong();
}

function resetButtonPressed() {
    for (let i = 0; i < soundObjects.length; i++) {
        soundObjects[i].x = soundObjects[i].xBuffer = soundObjects[i].xInit;
        soundObjects[i].y = soundObjects[i].yBuffer = soundObjects[i].yInit;
        for (let j = 0; j < soundObjects[i].inScene.length; j++) {
            soundObjects[i].inScene[j] = false;
        }
    }
    for (let i = 0; i < scenes.length; i++) {
        scenes[i].soundObjectStack = [];
    }
    buttonAlphaReset();
}

function menuButtonPressed() {
    multichannelPannerPositions = [{x: 200, y: 200}, {x: 1400, y: 200}, {x: 1400, y: 800}, {x: 200, y: 800}];
    MODE = 'menu';
    buttonAlphaReset();
    startThemeSong();
}

function playbackButtonPressed() {
    MODE = 'play';
    PLAYBACK = true;
    buttonAlphaReset();
}

function stopButtonPressed() {
    for (let i = 0; i < timeout.length; i++) {
        clearTimeout(timeout[i]);
    }
    MODE = 'game';
    buttonAlphaReset();
}

function buttonAlphaReset() {
    multichannelError.alpha = 0;
    binauralButton.alpha = 0;
    multichannelButton.alpha = 0;
    playButton.alpha = 0;
    optionsButton.alpha = 0;
    menuButton.alpha = 0;
}