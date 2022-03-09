function gameMode() {
    displayAudioMode();
    handleSoundObjectsGameMode();
    menuButton.over();
    menuButton.show();
    resetButton.over();
    resetButton.show();
    playbackButton.over();
    playbackButton.show();
    
    for (let i = 0; i < scenes.length; i++) {
        scenes[i].show();
        if (scenes[i].isActive) {
            if (scenes[i].isInside(mouseX, mouseY)) {
                updateListenerPosition(i);
                for (let j = 0; j < scenes[i].soundObjectStack.length; j++) {
                    scenes[i].soundObjectStack[j].startAudio();
                    scenes[i].soundObjectStack[j].alpha = 200;
                }
            } else {
                for (let j = 0; j < scenes[i].soundObjectStack.length; j++) {
                    scenes[i].soundObjectStack[j].stopAudio();
                }
            }
        }
    }
}

function handleSoundObjectsGameMode() {
    for (let i = 0; i < soundObjects.length; i++) {
        soundObjects[i].show();
        soundObjects[i].over();
        soundObjects[i].update();
        snapSoundObjects(i);
        duplicateSoundObjects(i);
        if (soundObjects[i].rollover) {
            if (!mouseOccupied) {
                soundObjects[i].startAudio();
            }
        } else if (!soundObjects[i].inScene.includes(true)) {
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

function duplicateSoundObjects(i) {
    if (soundObjects[i].rollover) {
        cvs.doubleClicked(function() {
            soundObjectDuplicate = new SoundObject(
                soundObjects[i].x + 20,
                soundObjects[i].y - 20,
                soundObjects[i].w,
                soundObjects[i].color,
                _id,
                soundObjects[i].filepath
            );
            _id++;
            console.log(_id);
            soundObjectDuplicate.resetPosition();
            soundObjectDuplicate.inScene = new Array(scenes.length).fill(false);
            soundObjectDuplicate.dragging = false;
            soundObjectDuplicate.rollover = false;
            soundObjectDuplicate.playing = false;
            if (AUDIO_MODE == 'multichannel') {
                soundObjectDuplicate.createAudioNodes(multichannel=true);
            } else if (AUDIO_MODE == 'binaural') {
                soundObjectDuplicate.createAudioNodes(multichannel=false);
            }
            soundObjects.push(soundObjectDuplicate);
        });
    }
}