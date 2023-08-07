import { useEffect, useReducer } from "react";
import { useStopwatch } from "react-timer-hook";

import "./App.css";

import { getNewBoard, boardReducer } from "./utils";

import { Cell, Modal, Panel } from "./components";

function App() {
  const [board, dispatch] = useReducer(boardReducer, null, () => getNewBoard());

  const { totalSeconds } = useStopwatch({
    autoStart: false,
  });
  const Storage = window.localStorage;

  useEffect(() => {
    const HTMLBoard = window.document.getElementsByClassName(
      "board"
    )[0] as HTMLElement;
    HTMLBoard.style.gridTemplateColumns = `repeat(${board.settings.cols}, minmax(50px,1fr))`;
    HTMLBoard.style.gridTemplateRows = `repeat(${board.settings.rows}, minmax(50px,1fr))`;
  }, [board]);

  // Este useEffect controla el contador de celdas restantes
  const bestScore = 120;
  const handleSettings = () => {
    dispatch({
      type: "RESET",
      settings: { rows: 20, cols: 20, mines: 40 },
    });
    return;
  };
  return (
    <>
      <header>
        <Panel
          settings={board.settings}
          cellsLeft={board.cellsLeft}
          minesLeft={board.minesLeft}
          dispatch={dispatch}
          totalSeconds={totalSeconds}
          bestScore={bestScore}
        />
      </header>
      <main className="board">
        {board.cells.map((cell) => (
          <Cell
            key={cell.id}
            dispatch={dispatch}
            index={cell.id}
            value={cell.value}
            status={cell.status}
          />
        ))}
      </main>
      <Modal open={board.boardState === "PAUSED"}>
        <p>SETTINGS</p>

        <button onClick={handleSettings}>Save and reset</button>
        <button
          className="close"
          onClick={() => {
            dispatch({ type: "RESUME" });
          }}
        >
          <img src="/cross.png" alt="close" width="20px" />
        </button>
      </Modal>
      <Modal open={board.boardState === "LOST"}>
        {board.cellsLeft === 0 ? (
          <p>
            You won!<br></br>Your time is {Storage.getItem("bestScore")}
          </p> // SWITCH
        ) : (
          <p>You lost!</p>
        )}
        <button onClick={() => dispatch({ type: "RESET" })}>Restart</button>
      </Modal>
    </>
  );
}

export default App;
