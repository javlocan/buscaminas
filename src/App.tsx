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

  const initializeBoard = useCallback(() => {
    setBooleanBoard(new Array(size).fill(false));
    setTimeout(() => {
      setBoard(getBoardArray(settings.rows, settings.cols, settings.mines));
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  const handleClick = useCallback(
    (index: number) => {
      const queue: number[] = []; // Create a queue to store the cells to be updated

      const enqueue = (cellIndex: number) => {
        if (!queue.includes(cellIndex)) {
          queue.push(cellIndex);
        }
      };

      const processQueue = () => {
        while (queue.length > 0) {
          const currentIndex = queue.shift()!; //Pide el index y lo quita de la cola

          if (board[currentIndex] === 0 && !booleanBoard[currentIndex]) {
            booleanBoard[currentIndex] = true;
            const neighbours = getNeighbours(
              settings.rows,
              settings.cols,
              currentIndex
            );
            for (const neighbour of neighbours) {
              enqueue(neighbour);
            }
          } else {
            booleanBoard[currentIndex] = true;
          }
        }

        setBooleanBoard([...booleanBoard]); // Update the booleanBoard state after all cells have been processed
      };

      if (board[index] === 0) {
        // Si el valor de la casilla es 0, esto

        enqueue(index);
        processQueue();
      } else {
        // El resto de valores

        if (board[index] === -1) {
          // Con la excepción de las minas
          for (let i = 0; i < booleanBoard.length; i++) {
            if (board[i] === -1) {
              booleanBoard[i] = true;
            }
          }

          setTimeout(initializeBoard, 500);
        }

        booleanBoard[index] = true;
        setBooleanBoard([...booleanBoard]);
      }
    },
    [board, booleanBoard, settings.rows, settings.cols, initializeBoard]
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
