function optionsMode() {
    for (let i = 0; i < soundObjects.length; i++) {
        soundObjects[i].drift();
        soundObjects[i].border();
        soundObjects[i].show();
    }
    binauralButton.over();
    multichannelButton.over();
    binauralButton.show();
    multichannelButton.show();
    multichannelError.show();
}