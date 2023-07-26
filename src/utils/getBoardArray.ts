import { getRandomNumbers } from "./getRandomNumbers";

export const getBoardArray = (rows: number, cols: number, mines: number) => {
  const size = cols * rows;
  const minecells = getRandomNumbers(mines, size);
  const board: number[] = new Array(size).fill(0);
  let neighbours = [];

  for (let i = 0; i < minecells.length; i++) {
    board[minecells[i]] = -1; // pongo un -1 en donde va la mina

    neighbours = getNeighbours(rows, cols, minecells[i]); // y pido sus vecinos

    for (let j = 0; j < neighbours.length; j++) {
      // recorro el array de vecinos

      if (board[neighbours[j]] >= 0) {
        // si la casilla vecina no es -1
        board[neighbours[j]] = board[neighbours[j]] + 1; // le sumo 1
      }
    }
  }

  return board;
};

function getNeighbours(rows: number, cols: number, cell: number) {
  const addUpCells = [];

  if (cell % cols !== 0) {
    addUpCells.push(cell - 1);
  }
  if (cell % cols !== cols - 1) {
    addUpCells.push(cell + 1);
  }

  if (cell >= cols) {
    addUpCells.push(cell - cols);
    if (cell % cols !== 0) {
      addUpCells.push(cell - cols - 1);
    }
    if (cell % cols !== cols - 1) {
      addUpCells.push(cell - cols + 1);
    }
  }
  if (cell < rows * cols - cols) {
    addUpCells.push(cell + cols);
    if (cell % cols !== 0) {
      addUpCells.push(cell + cols - 1);
    }
    if (cell % cols !== cols - 1) {
      addUpCells.push(cell + cols + 1);
    }
  }

  return addUpCells;
}
