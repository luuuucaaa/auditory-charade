class Textbox {
    constructor(x, y, w, h, color, text) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.alpha = 0;
        this.text = text;
        this.isActive = false;
    }
    show() {
        if (this.isActive) {
            noStroke();
            fill(0, 100);
            rect(this.x - this.w/2, this.y - this.h/2, this.w, this.h);

            this.color.setAlpha(255);
            strokeWeight(4);
            stroke(this.color);
            this.color.setAlpha(this.alpha);
            fill(this.color); 
            rect(this.x - this.w/2, this.y - this.h/2, this.w, this.h);

            textAlign(CENTER);
            textSize(18);
            textFont(font);
            noStroke();
            fill(255);
            text(this.text, this.x - this.w/2, this.y + 10 - this.h/2, this.w, this.h);
        }
    }
}

let textbox;

function createTextbox() {
    textbox = new Textbox(width/2, height/3 + 250, 800, 500, color(255), 'While the human sense of vision is harnessed a lot in human-computer interactions, opportunities arising from other human senses are much less explored. This project is dedicated to the exploration of opportunities arising from the auditory sense channel, specificially utilizing its most apparent advantage. Via spatial cues and its succeding information processing the ear can detect events everywhere in their surroundings (in the front, back, at the sides, upward, downward etc. from the person’s position), whereas the human sense of vision is highly directional - people can only see and process what is in front. Within the boundaries of a auditory based computer game this project analyses how information processed by channels of hearing impacts people’s thought processes, in particular their creative thinking and developments of innovation. The game, Schaeffer’s Charade is designed to be played on either a four channel sound system or via headphones with binaural audio and invites its players to dive into and immersive and temporal alternating space. By tracking the players actions and feeding it into a measuring tool we aim to determine their levels of creativity. While the game design especially excells when using purely auditory stimuli we also hope to compare our findings to these of a visually played version aswell.')
}
