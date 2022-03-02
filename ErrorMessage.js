class ErrorMessage {
    constructor(x, y, text) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.col = color(255, 0, 0);
        this.alpha = 0;
    }
    flash() {
        this.alpha = 255;
    }
    show() {
        textAlign(CENTER);
        textSize(32);
        textFont(font);
        noStroke();

        if (this.alpha > 0) {this.alpha -= 1};
        this.col.setAlpha(this.alpha)

        fill(this.col);
        text(this.text, this.x, this.y + 10);
    }
}

let multichannelError;

function createErrorMessages() {
    multichannelError = new ErrorMessage(width/2, height/2 + 200, 'Not enough channels!');
}