import globalCanvas, {AlignType, Coordinate} from "./canvas.js";

class Maze extends Coordinate {
  get lineWidth() {
    return this._lineWidth;
  }

  set lineWidth(value) {
    this._lineWidth = value;
  }

  get tileMap() {
    return this._tileMap;
  }

  constructor() {
    super(0, 0, 450, 450);
    this.align(AlignType.CENTER);
    this.canvas = globalCanvas.canvas;
    this.context = globalCanvas.context2D;

    this._numRows = 10;
    this._numColumns = 10;
    this.cellSize = this.w / this.numRows;
    this._lineWidth = 2;
    this._defaultColor = '#FF358A';
    this.isDrawing = false;


    this.buildTileMap();
    this.gridColors = new Array(this.numRows)
      .fill()
      .map(() => new Array(this.numColumns).fill(this._defaultColor));

    this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.canvas.addEventListener('dblclick', this.handleMouseDBClick.bind(this));
  }

  buildTileMap() {
    this._tileMap = Array.from(
      Array(100),
      () => Array.from(
        Array(100),
        () => 0
      )
    );
  }

  get defaultColor() {
    return this._defaultColor;
  }

  set defaultColor(value) {
    this._defaultColor = value;
  }

  get cellSize() {
    return this._cellSize;
  }

  set cellSize(value) {
    this._cellSize = Math.floor(value);
  }

  get numColumns() {
    return this._numColumns;
  }

  set numColumns(value) {
    this._numColumns = value;
  }

  get numRows() {
    return this._numRows;
  }

  set numRows(value) {
    this._numRows = value;
  }

  handleMouseDown(event) {
    this.isDrawing = true;
    this.fillColor(event);
  }

  handleMouseUp() {
    this.isDrawing = false;

  }

  handleMouseMove(event) {
    if (this.isDrawing) {
      this.fillColor(event);
    }
  }

  handleMouseDBClick(event) {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = -this.x + event.clientX - rect.left;
    const mouseY = -this.y + event.clientY - rect.top;

    const col = Math.floor(mouseX / this.cellSize);
    const row = Math.floor(mouseY / this.cellSize);

    if (col >= 0 && col < this.numColumns && row >= 0 && row < this.numRows) {
      this.tileMap[row][col] = 0;
    }
  }
  fillColor(event) {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = -this.x + event.clientX - rect.left;
    const mouseY = -this.y + event.clientY - rect.top;

    const col = Math.floor(mouseX / this.cellSize);
    const row = Math.floor(mouseY / this.cellSize);

    if (col >= 0 && col < this.numColumns && row >= 0 && row < this.numRows && this.isDrawing) {
      this.tileMap[row][col] = 1;
    }
  }

  draw() {
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numColumns; j++) {
        const size = this.cellSize;
        const x = this.x + j * size;
        const y = this.y + i * size;
        const color = this.defaultColor;

        if (this._tileMap[i][j] === 0) {
          this.context.fillStyle = 'transparent';
        } else {
          this.context.fillStyle = this.defaultColor;
        }

        this.context.fillRect(x, y, size, size);

        this.context.strokeStyle = color;
        this.context.lineWidth = this.lineWidth;
        this.context.strokeRect(x, y, size, size);
      }
    }
  }

}

export default Maze;
