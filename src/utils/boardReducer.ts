import { Board, BoardAction } from "../interfaces";

import { getNewBoard } from "./getNewBoard";
import { handleZeros } from "./handleZeros";

export const boardReducer = (board: Board, action: BoardAction): Board => {
  const id = action.id as number;
  switch (action.type) {
    case "LEFT_CLICK":
      switch (action.value) {
        case -1:
          board.cells[id].status = "UP";
          return { ...board, cellsLeft: board.cellsLeft - 1 };
        case 0:
          return { ...handleZeros(board, id) };
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
          if (board.cells[id].status !== "DOWN") {
            return { ...board };
          } else {
            board.cells[id].status = "UP";
            return { ...board, cellsLeft: board.cellsLeft - 1 };
          }
      }
      throw new Error("What have we done!? We've invented new values!");

    case "RIGHT_CLICK":
      if (board.cells[id].status === "DOWN") {
        board.cells[id].status = "FLAG";
        return { ...board, minesLeft: board.minesLeft - 1 };
      } else if (board.cells[id].status === "FLAG") {
        board.cells[id].status = "DOWN";
        return { ...board, minesLeft: board.minesLeft + 1 };
      }
      return { ...board };
    case "PAUSE":
      return { ...board, boardState: "PAUSED" };
    case "LOSE":
      board.cells.forEach((cell) => {
        if (cell.value === -1) {
          cell.status = "UP";
        }
      });
      return { ...board, boardState: "LOST" };
    case "RESET":
      if (action.settings) {
        return getNewBoard(action.settings);
      }
      return getNewBoard();
    case "RESUME":
      return { ...board, boardState: "PLAYING" };
    default:
      return board;
  }
};
