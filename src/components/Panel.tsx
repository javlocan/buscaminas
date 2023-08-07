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
      <button
        style={{ width: "100px" }}
        onClick={() => dispatch({ type: "PAUSE" })}
      >
        Opciones
      </button>
      <div style={{ display: "flex", gap: "0.5rem", paddingInline: "0.25rem" }}>
        <div className="display">
          <span id="bestscore">{bestScore.toString().padStart(3, "0")}</span>
        </div>
        <div className="display">
          <span id="totalseconds">
            {totalSeconds.toString().padStart(3, "0")}
          </span>
        </div>
        <div className="display">
          <span id="cellcount">{cellsLeft}</span>
          <span id="minecount">{minesLeft}</span>
        </div>
      </div>
    </div>
  );
});
