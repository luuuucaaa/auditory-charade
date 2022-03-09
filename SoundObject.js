class SoundObject {
    constructor(x, y, w, col, id, filepath) {
        this.dragging = false;
        this.rollover = false;
        this.playing = false;
        this.x = int(random(0, width));
        this.y = int(random(0, height));
        this.w = int(random(20, 100));;
        this.angle = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.color = col;
        this.colorBuffer = this.color;
        this.alpha = 0;

        this.xBuffer = x;
        this.yBuffer = y;
        this.wBuffer = w;
        this.velocity = [random(-0.5, 0.5), random(-0.5, 0.5), random(-0.1, 0.1), random(-0.01, 0.01)];

        this.xInit = x;
        this.yInit = y;

        this.id = id;
        this.filepath = filepath;
        this.inScene = new Array(scenes.length).fill(false);
    }
    createAudioNodes(multichannel=false) {
        if (!multichannel) {
            this.gainNode = audioCtx.createGain();
            this.gainNode.gain.value = 1;

            this.pannerNode = audioCtx.createPanner();
            this.pannerNode.setPosition(this.x, this.y, 0);
            this.pannerNode.panningModel = 'HRTF';
            this.pannerNode.distanceModel = 'exponential';
            this.pannerNode.refDistance = 1;
            this.pannerNode.maxDistance = config['width'];
            this.pannerNode.rolloffFactor = 0.2;
            this.pannerNode.coneInnerAngle = 360;
            this.pannerNode.coneOuterAngle = 0;
            this.pannerNode.coneOuterGain = 0;
        } else {
            let numChannels = 4;
            this.gainNodes = [];
            for (let i = 0; i < numChannels; i++) {
                this.gainNodes[i] = audioCtx.createGain();
            }
            this.multichannelMerger = audioCtx.createChannelMerger(numChannels)
        }
    }
    startAudio() {
        if (!this.playing) {
            if (AUDIO_MODE == 'binaural') {
                this.source = getAudioDataBinaural(this.filepath, this.pannerNode, this.gainNode);
            } else if (AUDIO_MODE == 'multichannel') {
                this.source = getAudioDataMultichannel(this.filepath, this.gainNodes, this.multichannelMerger);
            }
            this.source.start();
            this.playing = true;
        }
    }
    stopAudio() {
        if (this.playing) {
            this.source.stop();
            this.playing = false;
        }
    }
    over() {
        if (mouseX > this.x - this.w/2 && mouseX < this.x + this.w/2 && mouseY > this.y - this.w/2 && mouseY < this.y + this.w/2) {
            this.rollover = true;
            //this.startAudio();
        } else {
            this.rollover = false;
            /* if (!this.dragging) {
                this.stopAudio();
            } */
        }
    }
    pressed() {
        if (mouseX > this.x - this.w/2 && mouseX < this.x + this.w/2 && mouseY > this.y - this.w/2 && mouseY < this.y + this.w/2) {
            this.dragging = true;
            mouseOccupied = true;
            this.offsetX = this.x - mouseX;
            this.offsetY = this.y - mouseY;
        }
    }
    released() {
        this.dragging = false;
        mouseOccupied = false;
    }
    update() {
        if (this.dragging) {
            this.x = mouseX + this.offsetX;
            this.y = mouseY + this.offsetY;
        }
        this.xBuffer = this.x;
        this.yBuffer = this.y;
    }
    drift() {
        this.x += this.velocity[0];
        this.y += this.velocity[1];
        this.w += this.velocity[2];
        this.angle += this.velocity[3];
        this.angle %= 4 * PI;
    }
    border() {
        if (this.x < 0 || this.x > width) {
            this.velocity[0] *= -1;
        } else if (this.y < 0 || this.y > height) {
            this.velocity[1] *= -1;
        } else if (this.w < 20 || this.w > 100) {
            this.velocity[2] *= -1;
        }
    }
    resetDrift(time) {
        let nFrames = int(time / 1000 * frameRate());

        let dX = this.x - this.xBuffer;
        let dY = this.y - this.yBuffer;
        let dW = this.w - this.wBuffer;
        let dA = this.angle;

        this.velocity[0] = - dX / nFrames;
        this.velocity[1] = - dY / nFrames;
        this.velocity[2] = - dW / nFrames;
        this.velocity[3] = - dA / nFrames;

        let that = this;
        setTimeout(function() {
            that.resetPosition();
        }, time);
    }
    resetPosition() {
        this.x = this.xBuffer;
        this.y = this.yBuffer;
        this.w = this.wBuffer;
        this.angle = 0;
        this.velocity = [random(-0.5, 0.5), random(-0.5, 0.5), random(-0.1, 0.1), random(-0.01, 0.01)];
    }
    show() {
        if (MODE == 'options') {
            this.color = color(255);
        } else {
            this.color = this.colorBuffer;
        }
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        this.color.setAlpha(255);
        strokeWeight(3);
        stroke(this.color);
        if (this.rollover || this.dragging) {
            this.alpha = 200;
        } else if (this.alpha > 0) {
            this.alpha -= 10;
        };
        this.color.setAlpha(this.alpha)
        fill(this.color);
        rect(-this.w/2, -this.w/2, this.w);
        pop();
    }
}

let _id = 0;
function createSoundObjects(rows, columns) {
    let soundObjects = [];
    let w = 40;
    let d = 20;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            soundObjects.push(new SoundObject(
                (width/2 - (columns * (d + w)/2) + d/2) + w/2 + col * (w + d),
                4.25 * height/5 + w/2 + row * (w + d),
                w,
                getRandomHpiColor(10, 255),
                _id,
                filePathsSoundset[_id]
            ));
            _id++;
        }
    }
    return soundObjects;
}

function soundObjectsFlash() {
    for (let i = 0; i < soundObjects.length; i++) {
        soundObjects[i].alpha = 200;
    }
}