import React from "react";
import { BoardAction } from "../interfaces";

interface Props {
  dispatch: React.Dispatch<BoardAction>;
  settings: Settings;
  cellsLeft: number;
  minesLeft: number;
  totalSeconds: number;
  bestScore: number;
}
interface Settings {
  rows: number;
  cols: number;
  mines: number;
}
export const Panel: React.FC<Props> = React.memo((props: Props) => {
  const { cellsLeft, minesLeft, dispatch, totalSeconds, bestScore } = props;

  return (
    <div className="panel">
      <h1>Buscaminas</h1>
      <img
        src="/settings.png"
        alt="settings"
        className="settings--button"
        onClick={() => dispatch({ type: "PAUSE" })}
      />

      <div className="display--container">
        <span id="bestscore" className="display">
          {bestScore.toString().padStart(3, "0")}
        </span>
        <span id="totalseconds" className="display">
          {totalSeconds.toString().padStart(3, "0")}
        </span>
        <span id="cellsleft" className="display">
          {cellsLeft.toString().padStart(3, "0")}
        </span>
        <span id="minesleft" className="display">
          {minesLeft.toString().padStart(3, "0")}
        </span>
      </div>
    </div>
  );
});
