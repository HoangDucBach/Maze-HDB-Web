class Canvas {
  get context2D() {
    return this._context2D;
  }
  get canvas() {
    return this._canvas;
  }

  set canvas(value) {
    this._canvas = value;
  }
  constructor() {
    this._canvas = document.querySelector('.canvas-game');
    this.WIDTH = '750px';
    this.HEIGHT = '644px';
    this._canvas.style.width = this.WIDTH;
    this._canvas.style.height = this.HEIGHT;
    this.canvas.width = 750;
    this.canvas.height = 644;
    this._context2D = this._canvas.getContext('2d');
    this.update();
    return this;
  }

  update() {
    this.context2D
      .clearRect(
        0,
        0,
        this._canvas.width,
        this._canvas.height);

    requestAnimationFrame(() => this.update());
  }
}
const AlignType = {
  CENTER: 'center',
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right',
};
class Coordinate {
  const

  constructor(x,y,w,h) {
    this._x = x || 0;
    this._y = y || 0;
    this.w = w || 0;
    this.h = h || 0;
    this._w = w;
    this._h = h;
  }

  get w() {
    return this._w;
  }

  set w(value) {
    this._w = value;
  }

  get h() {
    return this._h;
  }

  set h(value) {
    this._h = value;
  }

  get x() {
    return this._x;
  }

  set x(value) {
    this._x = value;
  }

  get y() {
    return this._y;
  }

  set y(value) {
    this._y = value;
  }

  align(type) {
    switch (type) {
      case 'center':
        this.x = (globalCanvas.canvas.width - this.w) / 2;
        this.y = (globalCanvas.canvas.height - this.h) / 2;
    }
  }
}
const globalCanvas = new Canvas();
export default globalCanvas;
export {Coordinate,AlignType};
