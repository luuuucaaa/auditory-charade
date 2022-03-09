function getRandomHpiColor(randomRange, alpha) {
    const hpi_colors = [
        [0, 122, 158],
        [177, 6, 58],
        [221, 97, 8],
        [246, 168, 0]
    ];
    let coin = int(random(4));
    let col = hpi_colors[coin];
    for (let i = 0; i < col.length; i++) {
        let r = random(-1, 1) * randomRange;
        col[i] += r;
        if (col[i] < 0) {
            col[i] = 0;
        } else if (col[i] > 255) {
            col[i] = 255;
        }
    }
    col.push(alpha);
    return color(col)
}

function displayFramerate() {
    textAlign(LEFT);
    textSize(18);
    textFont(font);
    noStroke();
    fill(255);
    text(floor(frameRate()), width - 300, height - 15);
}

function displayAudioMode() {
    textAlign(CENTER);
    textSize(18);
    textFont(font);
    noStroke();
    fill(255);
    if (AUDIO_MODE == 'binaural') text('binaural mode', width/2, height - 20);
    if (AUDIO_MODE == 'multichannel') text('multichannel mode', width/2, height - 20);
}