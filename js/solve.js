class Cell {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.g = 0;
    this.h = 0;
    this.parent = null;
  }

  get f() {
    return this.g + this.h;
  }
}

class SolveMaze {
  solve(grid, startRow, startCol, endRow, endCol) {
    const rows = grid.length;
    const cols = grid[0].length;

    const startCell = new Cell(startRow, startCol);
    const endCell = new Cell(endRow, endCol);

    const openSet = [startCell];
    const closedSet = {};
    const path = [];

    while (openSet.length > 0) {
      openSet.sort((a, b) => a.f - b.f);
      const current = openSet.shift();

      const currentKey = `${current.row}-${current.col}`;
      closedSet[currentKey] = true;

      if (current.row === endRow && current.col === endCol) {
        let currentCell = current;
        while (currentCell !== null) {
          path.push([currentCell.row, currentCell.col]);
          currentCell = currentCell.parent;
        }
        return path.reverse();
      }

      const directions = [
        { row: current.row - 1, col: current.col }, // top
        { row: current.row, col: current.col + 1 }, // right
        { row: current.row + 1, col: current.col }, // bottom
        { row: current.row, col: current.col - 1 }  // left
      ];

      for (const direction of directions) {
        const newRow = direction.row;
        const newCol = direction.col;

        if (
          newRow >= 0 &&
          newRow < rows &&
          newCol >= 0 &&
          newCol < cols &&
          grid[newRow][newCol] === 0
        ) {
          const neighbor = new Cell(newRow, newCol);

          const neighborKey = `${neighbor.row}-${neighbor.col}`;
          if (!closedSet[neighborKey]) {
            const tentativeG = current.g + 1;

            if (!openSet.some(cell => cell.row === neighbor.row && cell.col === neighbor.col) || tentativeG < neighbor.g) {
              neighbor.g = tentativeG;
              neighbor.h = this.heuristic(neighbor, endCell);
              neighbor.parent = current;

              if (!openSet.some(cell => cell.row === neighbor.row && cell.col === neighbor.col)) {
                openSet.push(neighbor);
              }
            }
          }
        }
      }
    }

    return path.reverse(); // No path found
  }

  heuristic(cell, endCell) {
    // Euclidean distance heuristic
    return Math.sqrt(Math.pow(cell.row - endCell.row, 2) + Math.pow(cell.col - endCell.col, 2));
  }
}

export default SolveMaze;
