class Scene {
    constructor(x, y, nX, nY, gridWidth) {
        this.x = x;
        this.y = y;
        this.nX = nX;
        this.nY = nY;
        this.gridWidth = gridWidth;
        this.isActive = true;
        this.soundObjectStack = [];
        this.isPlayed = false;
        this.alpha = 0;
    }
    show() {
        strokeWeight(1);
        for (let i = 0; i < this.nX + 1; i++) {
            line(this.x + i * this.gridWidth - this.gridWidth/2, this.y - this.gridWidth/2, this.x + i * this.gridWidth - this.gridWidth/2, this.y + this.nY * this.gridWidth - this.gridWidth/2);
        }
        for (let i = 0; i < this.nY + 1; i++) {
            line(this.x - this.gridWidth/2, this.y + i * this.gridWidth - this.gridWidth/2, this.x + this.nX * this.gridWidth - this.gridWidth/2, this.y + i * this.gridWidth - this.gridWidth/2);
        }

        /* // hover overlay
        this.highlight = new fabric.Rect({
            name: "gridHighlight",
            left: this.x,
            top: this.y,
            fill: '#54f0a2',
            opacity: 0,
            width: this.nX * this.gridWidth,
            height: this.nY * this.gridWidth,
            hasBorders: false,
            hasControls: false,
            selectable: false,
            hasRotatingPoint : false,
            hoverCursor: "default"
        });
        canvas.add(this.highlight); */

        if (this.isInside(listenerPosition[0], listenerPosition[1])) {
            this.alpha = 255;
        } else {
            this.alpha -= 10;
        }
        fill(0, 122, 158, this.alpha);
        push();
        translate(this.x + this.nX/2 * this.gridWidth - this.gridWidth/2, this.y + this.nY/2 * this.gridWidth - this.gridWidth/2);
        beginShape();
        vertex(0, - this.gridWidth/4);
        vertex(this.gridWidth/4, this.gridWidth/4);
        vertex(-this.gridWidth/4, this.gridWidth/4);
        endShape(CLOSE);
        pop();
    }
    
    isInside(x, y, margin=0) {
        if (x > this.x - margin - this.gridWidth/2 && x < this.x + this.nX * this.gridWidth + margin - this.gridWidth/2 && y > this.y - margin - this.gridWidth/2 && y < this.y + this.nY * this.gridWidth + margin - this.gridWidth/2) {
            return true;
        } else {
            return false;
        }
    }
}

function createScenes() {
    let nRowsScenes = 2;
    let nColumnsScenes = 3;
    let scenes = [];
    for (let i = 0; i < nRowsScenes; i++) {
        for (let j = 0; j < nColumnsScenes; j++) {
            let scene = new Scene(300 + j * 400, 150 + i * 350, 5, 5, 50);
            scene.show();
            scenes.push(scene);
        }
    }
    return scenes;
}

function snapSoundObjects(i) {
    if (soundObjects[i].dragging) {
        for (let j = 0; j < scenes.length; j++) {
            if (scenes[j].isActive) {
                if (scenes[j].isInside(mouseX, mouseY, -scenes[j].gridWidth/4)) {
                    soundObjects[i].x = scenes[j].x % scenes[j].gridWidth + Math.round(soundObjects[i].x / scenes[j].gridWidth) * scenes[j].gridWidth;
                    soundObjects[i].y = scenes[j].y % scenes[j].gridWidth + Math.round(soundObjects[i].y / scenes[j].gridWidth) * scenes[j].gridWidth;
                    if (!soundObjects[i].inScene[j]) {
                        soundObjects[i].inScene[j] = true;
                        updateSoundObjectStack(i, j);
                        // console.log('snapped to scene', j);
                    }
                } else if (soundObjects[i].inScene[j]) {
                    soundObjects[i].inScene[j] = false;
                    updateSoundObjectStack(i, j);
                    // console.log('un-snapped from scene', j);
                }
            }
        }
    }
}

function updateSoundObjectStack(i, j) {
    if (scenes[j].soundObjectStack.some(e => e.id === i)) {
        let index = scenes[j].soundObjectStack.indexOf(soundObjects[i]);
        scenes[j].soundObjectStack.splice(index, 1);
    } else {
        scenes[j].soundObjectStack.push(soundObjects[i]);
    }
}