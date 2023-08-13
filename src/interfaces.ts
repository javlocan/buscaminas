export interface Board {
  settings: Settings;
  cellsLeft: number;
  minesLeft: number;
  cells: Cell[];
  boardState: BoardState;
}
type BoardState = keyof typeof BOARD_STATE;

enum BOARD_STATE {
  DEFAULT,
  SETTINGS,
  PLAYING,
  WON,
  LOST,
}

export interface BoardAction {
  type: BoardActionTypes;
  id?: number;
  value?: number;
  settings?: Settings;
}
type BoardActionTypes = keyof typeof BOARD_ACTION_TYPES;

export enum BOARD_ACTION_TYPES {
  MOCKWIN,
  WIN,
  LOSE,
  RESET,
  PAUSE,
  RESUME,
  LEFT_CLICK,
  RIGHT_CLICK,
}

export interface Cell {
  id: number;
  value: number;
  status: Status;
}

export interface Settings {
  rows: number;
  cols: number;
  mines: number;
}
export type Status = keyof typeof STATUS;

enum STATUS {
  DOWN,
  UP,
  FLAG,
}
