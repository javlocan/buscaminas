import { Cell, Status } from "../interfaces";
import { getNeighbours } from "./getNeighbours";

export const getNewCellsArray = (
  rows: number,
  cols: number,
  mines: number
): Cell[] => {
  const newCells = getNewBoardArray(rows, cols, mines);
  const result = newCells.map((cell, i) => ({
    value: cell,
    id: i,
    status: "DOWN" as Status,
  }));
  return result;
};

const getNewBoardArray = (rows: number, cols: number, mines: number) => {
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

const getRandomNumbers = (mines: number, size: number) => {
  const array: number[] = [];
  let random: number;
  for (let i = 0; i < mines; i++) {
    do {
      random = randomInt(size - 1);
    } while (array.includes(random)); // will return false if random isn't asigned

    array.push(random);
  }
  return array;
};

function randomInt(max: number) {
  return Math.floor(Math.random() * max);
}
