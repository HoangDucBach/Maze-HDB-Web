import globalCanvas, {Coordinate} from "./canvas.js";
import SolveMaze from "./solve.js";

class Robot extends Coordinate {
  get radius() {
    return this._radius;
  }

  set radius(value) {
    this._radius = value;
  }

  get speed() {
    return this._speed;
  }

  set speed(value) {
    this._speed = value;
  }

  constructor() {
    super(0, 0, 30, 30);
    this.canvas = globalCanvas;
    this.context = this.canvas.context2D
    this._x = 0;
    this._y = 0;
    this._nextX = 0;
    this._nextY = 0;
    this._color = '#FF358A';
    this.r = 30;
    this._speed = 1;
    this._radius = 0;
    this.isSolving = false;
    this.typeMove = {
      TOP: 'top',
      RIGHT: 'right',
      BOTTOM: 'bottom',
      LEFT: 'left'
    }
    this.unitMove = -1;
  }


  get color() {
    return this._color;
  }

  set color(value) {
    this._color = value;
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

  get nextX() {
    return this._nextX;
  }

  set nextX(value) {
    this._nextX = value;
  }

  get nextY() {
    return this._nextY;
  }

  set nextY(value) {
    this._nextY = value;
  }

  draw() {
    this.context.fillStyle = this._color;
    this.context.fillRect(
      this._x,
      this._y,
      this.r,
      this.r);
  }

  #utilMoveX() {

    if (this._x < this.nextX) {
      this._x += this._speed;
      if (this._x >= this.nextX) {
        this._x = this.nextX - 1; // Set to exact position to avoid overshooting
        cancelAnimationFrame(this.animationIdX);
      } else {
        this.animationIdX = requestAnimationFrame(() => this.#utilMoveX());
      }
    } else if (this._x > this.nextX) {
      this._x -= this._speed;
      if (this._x <= this.nextX) {
        this._x = this.nextX - 1; // Set to exact position to avoid overshooting
        cancelAnimationFrame(this.animationIdX);
      } else {
        this.animationIdX = requestAnimationFrame(() => this.#utilMoveX());
      }
    } else {
      cancelAnimationFrame(this.animationIdX);
    }
  }

  #utilMoveY() {
    if (this._y < this.nextY) {
      this._y += this._speed;
      if (this._y >= this.nextY) {
        this._y = this.nextY - 1; // Set to exact position to avoid overshooting
        cancelAnimationFrame(this.animationIdY);
      } else {
        this.animationIdY = requestAnimationFrame(() => this.#utilMoveY());
      }
    } else if (this._y > this.nextY) {
      this._y -= this._speed;
      if (this._y <= this.nextY) {
        this._y = this.nextY - 1; // Set to exact position to avoid overshooting
        cancelAnimationFrame(this.animationIdY);
      } else {
        this.animationIdY = requestAnimationFrame(() => this.#utilMoveY());
      }
    } else {
      cancelAnimationFrame(this.animationIdY);
    }
  }

  moveTo(nextX, nextY) {
    this.nextX = nextX;
    this.nextY = nextY;
    this.#utilMoveX();
    this.#utilMoveY();
  }

  move(type) {
    switch (type) {
      case this.typeMove.TOP:
        this.moveTo(this.x, this.y - this.unitMove);
        break;
      case this.typeMove.RIGHT:
        this.moveTo(this.x + this.unitMove, this.y);
        break;
      case this.typeMove.BOTTOM:
        this.moveTo(this.x, this.y + this.unitMove);
        break;
      case this.typeMove.LEFT:
        this.moveTo(this.x - this.unitMove, this.y);
        break;
    }
  }

  solveMaze(maze) {
    this.unitMove = maze.cellSize;
    this.isSolving = true;
    return new SolveMaze().solve(maze.tileMap, 0, 0, maze.numRows - 1, maze.numColumns - 1);
  }
}

export default Robot;
