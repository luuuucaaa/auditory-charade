function menuMode() {
    drawListener();
    for (let i = 0; i < soundObjects.length; i++) {
        if (AUDIO_MODE == 'binaural') {
            updateBinauralPanner(i);
        } else {
            updateMultichannelPanner(i);
            drawMultichannelPanner();
        }
        soundObjects[i].drift();
        soundObjects[i].border();
        soundObjects[i].over();
        soundObjects[i].show();
    }
    playButton.over();
    playButton.show();
    infoButton.over();
    infoButton.show();
    textbox.show();
    optionsButton.over();
    optionsButton.show();
}