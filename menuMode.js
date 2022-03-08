function menuMode() {
    handleSoundObjectsMenuMode()
    playButton.over();
    playButton.show();
    infoButton.over();
    infoButton.show();
    textbox.show();
    optionsButton.over();
    optionsButton.show();
}

function handleSoundObjectsMenuMode() {
    for (let i = 0; i < soundObjects.length; i++) {
        soundObjects[i].drift();
        soundObjects[i].border();
        soundObjects[i].over();
        soundObjects[i].show();
        if (soundObjects[i].rollover) {
            if (!mouseOccupied) {
                soundObjects[i].startAudio();
            }
        } else {
            soundObjects[i].stopAudio();
        }
        if (AUDIO_MODE == 'binaural') {
            updateBinauralPanner(i);
        } else if (AUDIO_MODE == 'multichannel') {
            updateMultichannelPanner(i);
            drawMultichannelPanner();
        }
    }
}