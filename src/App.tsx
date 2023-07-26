import { useEffect, useState } from "react";
import "./App.css";
import { getBoardArray } from "./utils/getBoardArray";

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

  const [board, setBoard] = useState<number[]>(
    getBoardArray(settings.rows, settings.cols, settings.mines)
  );

  useEffect(() => {
    const HTMLBoard = window.document.getElementsByClassName(
      "board"
    )[0] as HTMLElement;
    HTMLBoard.style.gridTemplateColumns = `repeat(${settings.cols}, 1fr)`;
  }, [settings, setSettings, setBoard]);

  return (
    <section>
      <header>
        <h1>Buscaminas</h1>
      </header>
      <main className="container">
        <div className="board">
          {board.map((cellValue, index) => (
            <div key={index} className="cell">
              {cellValue}
            </div>
          ))}
        </div>
      </main>
    </section>
  );
}

export default App;
