import { useEffect, useReducer } from "react";
import { useStopwatch } from "react-timer-hook";

import "./App.css";

import { getNewBoard } from "./utils";

import { Cell, Panel, AllModals } from "./components";
import { Board, BoardAction } from "./interfaces";
import { handleZeros } from "./utils/handleZeros";

function App() {
  const { isRunning, totalSeconds, pause, start, reset } = useStopwatch({
    autoStart: false,
  });

  const boardReducer = (board: Board, action: BoardAction): Board => {
    const id = action.id as number;
    switch (action.type) {
      case "LEFT_CLICK":
        if (!isRunning) {
          start();
        }
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
        pause();
        return { ...board, boardState: "SETTINGS" };
      case "LOSE":
        reset();
        pause();
        board.cells.forEach((cell) => {
          if (cell.value === -1) {
            cell.status = "UP";
          }
        });
        return { ...board, boardState: "LOST" };
      case "RESET":
        reset();
        pause();
        if (action.settings) {
          return getNewBoard(action.settings);
        }
        return getNewBoard();
      case "RESUME":
        start();
        return { ...board, boardState: "PLAYING" };
      default:
        return board;
    }
  };

  const [board, dispatch] = useReducer(boardReducer, null, () => getNewBoard());

  useEffect(() => {
    const HTMLBoard = window.document.getElementsByClassName(
      "board"
    )[0] as HTMLElement;
    HTMLBoard.style.gridTemplateColumns = `repeat(${board.settings.cols}, minmax(40px,1fr))`;
    HTMLBoard.style.gridTemplateRows = `repeat(${board.settings.rows}, minmax(40px,1fr))`;
  }, [board.settings]);

  const bestScore = 120;

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
      <main>
        <div className="board board--with-limits">
          {board.cells.map((cell) => (
            <Cell
              key={cell.id}
              dispatch={dispatch}
              index={cell.id}
              value={cell.value}
              status={cell.status}
            />
          ))}
        </div>
      </main>
      <AllModals
        settings={board.settings}
        boardState={board.boardState}
        dispatch={dispatch}
      />
    </>
  );
}

export default App;
