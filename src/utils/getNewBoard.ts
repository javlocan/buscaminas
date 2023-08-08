import { Board, Settings } from "../interfaces";
import { getNewCellsArray } from "./getNewCellsArray";

const DEFAULT_SETTINGS = { rows: 10, cols: 20, mines: 20 };

export const getNewBoard = (newSettings?: Settings): Board => {
  newSettings = newSettings || DEFAULT_SETTINGS;

  return {
    settings: {
      rows: newSettings.rows,
      cols: newSettings.cols,
      mines: newSettings.mines,
    },
    cellsLeft: newSettings.rows * newSettings.cols - newSettings.mines,
    minesLeft: newSettings.mines,
    cells: getNewCellsArray(
      newSettings.rows,
      newSettings.cols,
      newSettings.mines
    ),
    boardState: "DEFAULT",
  };
};
