function gameMode() {
    drawListener();
    for (let i = 0; i < soundObjects.length; i++) {
        if (AUDIO_MODE == 'binaural') {
            updateBinauralPanner(i);
        } else {
            updateMultichannelPanner(i);
            drawMultichannelPanner();
        }
        soundObjects[i].over();
        soundObjects[i].update();
        soundObjects[i].show();
    }
    menuButton.over();
    menuButton.show();
    resetButton.over();
    resetButton.show();
}