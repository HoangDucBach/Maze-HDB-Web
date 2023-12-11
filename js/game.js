import Maze from "./maze.js";
import Robot from "./robot.js";

class Game {

  constructor() {
    this.maze = new Maze();
    this.robot = new Robot();
    this.robot.x = this.maze.x + (this.maze.cellSize - this.robot.w) / 2;
    this.robot.y = this.maze.y + (this.maze.cellSize - this.robot.h) / 2;
    // this.robot.x = this.maze.x + 1;
    // this.robot.y = this.maze.y + 1;
    this.runButton = document.querySelector('.robot-solve__button');
    this.delay = 1000;
  }

  draw() {
    this.maze.draw();
    this.robot.draw();
  }

  update() {
    this.draw();
    requestAnimationFrame(() => this.update());
  }

  async solveMazeAutomatically() {
    const paths = this.robot.solveMaze(this.maze);
    for (let i = 0; i < paths.length - 1; i++) {
      const curCell = paths[i];
      const nextCell = paths[i + 1];

      let type;

      if (nextCell[0] === curCell[0]) {
        if (nextCell[1] > curCell[1]) type = this.robot.typeMove.RIGHT;
        else type = this.robot.typeMove.LEFT;
      }
      if (nextCell[1] === curCell[1]) {
        if (nextCell[0] > curCell[0]) type = this.robot.typeMove.BOTTOM;
        else type = this.robot.typeMove.TOP;
      }
      this.robot.move(type);
      await new Promise(resolve => setTimeout(resolve, this.delay));
    }
    await new Promise(resolve => {
      this.robot.isSolving = false;
      this.runButton.disabled = true;
    });

  }

  event() {
    this.runButton.addEventListener('click', () => {
      this.solveMazeAutomatically();
    });
    const lineColorPicker = document.getElementById('line');
    lineColorPicker.addEventListener('input', () => {
      this.maze.defaultColor = lineColorPicker.value;
    });
    const robotColorPicker = document.getElementById('robot');
    robotColorPicker.addEventListener('input', () => {
      this.robot.color = robotColorPicker.value;
    });
    const delayNumberInput = document.getElementById('radius');
    delayNumberInput.value = 5;
    delayNumberInput.addEventListener("input", () => {
      this.delay = 500 + 300 * (10 - delayNumberInput.value);
    });
    delayNumberInput.disabled = false;

    const sizeNumberInput = document.getElementById('size-maze');
    sizeNumberInput.value = 10;
    sizeNumberInput.addEventListener('input', () => {
      this.maze.numRows = sizeNumberInput.value;
      this.maze.numColumns = sizeNumberInput.value;
      this.maze.cellSize = this.maze.w / this.maze.numRows;
      this.maze.lineWidth = this.maze.cellSize / 100 * 2;
      this.robot.r = this.maze.cellSize * 0.5;
      this.robot.x = this.maze.x + (this.maze.cellSize - this.robot.r) / 2;
      this.robot.y = this.maze.y + (this.maze.cellSize - this.robot.r) / 2;
      this.runButton.disabled = false;

    });

    let robot = this.robot;
    let runButton = this.runButton;

    function enableCheck() {
      sizeNumberInput.disabled = robot.isSolving;
      requestAnimationFrame(enableCheck);
    }

    enableCheck();
  }
}

const globalGame = new Game();
globalGame.event();
globalGame.update();

export default globalGame;
