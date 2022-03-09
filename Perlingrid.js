class Perlingrid {
  constructor() {
    this.res = width/10;
    this.cols = floor(2 * width / this.res) + 1;
    this.rows = floor(2 * height / this.res) + 1;
    this.values = [];
    this.zoff = 0;
    this.dx = 0.1;
    this.dt = 0.005;
    this.update();
  }
  
  update()
  {
    this.yoff = 0;
    for (let r = 0; r < this.rows; r++) { 
      this.xoff = 0;
      for (let c = 0; c < this.cols; c++) {
        let idx = c + r * this.cols;
        this.values[idx] = noise(this.xoff, this.yoff, this.zoff);
        this.xoff += this.dx;
      }
      this.yoff += this.dx;
    }
    this.zoff += this.dt;
  }
  
  display()
  {
    for (let r = 0; r < this.rows; r++) { 
      for (let c = 0; c < this.cols; c++) {
        let idx = c + r * this.cols;
        noStroke();
        fill(this.values[idx] * 255, 80, 100, 120);
        push();
        translate(c * this.res, r * this.res);
        rect(0, 0, this.res, this.res);
        pop();
      }
    }
  }
}

let densityMap;
function createPerlingrid() {
  densityMap = new Perlingrid();
}

function handlePerlingrid() {
  densityMap.update();
  densityMap.display();
}