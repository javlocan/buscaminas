import { useCallback, useEffect, useState } from "react";

import { getBoardArray, getNeighbours } from "./utils";
import { Cell, Panel } from "./components";

import "./App.css";

interface Settings {
  rows: number;
  cols: number;
  mines: number;
}
function App() {
  const [settings, setSettings] = useState<Settings>({
    rows: 10,
    cols: 20,
    mines: 20,
  });
  const size = settings.cols * settings.rows;

  const [board, setBoard] = useState<number[]>(
    getBoardArray(settings.rows, settings.cols, settings.mines)
  );
  const [booleanBoard, setBooleanBoard] = useState<boolean[]>(
    new Array(size).fill(false)
  );

  const handleClick = useCallback(
    (index: number) => {
      const booleanBoardCopy = [...booleanBoard];
      const showArray: number[] = [index];

      if (board[index] == 0) {
        handleZeros(index);
      }

      function handleZeros(index: number) {
        const neighbours = getNeighbours(settings.rows, settings.cols, index);
        const trackArray = [...showArray];

        // le meto al array final los vecinos: ya hay 9 cosas
        // entonces voy vecino por vecino y digo ¿es cero?
        neighbours.forEach((neighbour) => {
          if (board[neighbour] === 0 && !trackArray.includes(neighbour)) {
            // si lo es y no está en showArray, vuelvo a llamar la funcion pero en el lugar del vecino...
            // *** entonces: le meto al array los NUEVOS VECINOS - ya hay una capa más
            handleZeros(neighbour);
          }
          showArray.push(...neighbours);
        });
      }
      showArray.forEach((index) => {
        booleanBoardCopy[index] = true;
      });
      setBooleanBoard(booleanBoardCopy);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [booleanBoard]
  );

  useEffect(() => {
    const HTMLBoard = window.document.getElementsByClassName(
      "board"
    )[0] as HTMLElement;
    HTMLBoard.style.gridTemplateColumns = `repeat(${settings.cols}, minmax(50px,1fr))`;
    HTMLBoard.style.gridTemplateRows = `repeat(${settings.rows}, minmax(50px,1fr))`;
  }, [settings, setSettings, setBoard]);

  return (
    <>
      <header>
        <Panel settings={settings} />
      </header>
      <main className="board">
        {board.map((cellValue, index) => (
          <Cell
            index={index}
            key={index}
            value={cellValue}
            show={booleanBoard[index]}
            handleClick={handleClick}
          />
        ))}
      </main>
    </>
  );
}

export default App;
