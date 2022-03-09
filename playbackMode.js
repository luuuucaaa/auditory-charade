let timeout = [];
function playbackMode(time) {
    displayAudioMode();
    handleSoundObjectsPlayMode();
    stopButton.show();
    stopButton.over();
    for (let i = 0; i < scenes.length; i++) {
        scenes[i].show();
    }
    if (PLAYBACK) {
        for (let i = 0; i < scenes.length; i++) {
            timeout.push(setTimeout(function() {
                playbackScene(i, time);
            }, time * i));
        }
        timeout.push(setTimeout(function() {
            MODE = 'game';
        }, scenes.length * time));
        PLAYBACK = false;
    }
}

function handleSoundObjectsPlayMode() {
    for (let i = 0; i < soundObjects.length; i++) {
        if (soundObjects[i].inScene.includes(true)) {
            soundObjects[i].show();
        }
        if (soundObjects[i].playing) {
            soundObjects[i].alpha = 200;
        }
        if (AUDIO_MODE == 'binaural') {
            updateBinauralPanner(i);
        } else if (AUDIO_MODE == 'multichannel') {
            updateMultichannelPanner(i);
            drawMultichannelPanner();
        }
    }
}

function playbackScene(i, time) {
    updateListenerPosition(i);
    for (let j = 0; j < scenes[i].soundObjectStack.length; j++) {
        scenes[i].soundObjectStack[j].startAudio();
        timeout.push(setTimeout(function() {
            scenes[i].soundObjectStack[j].stopAudio();
        }, time - 1));
    }
}