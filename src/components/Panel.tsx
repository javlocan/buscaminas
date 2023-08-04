interface Props {
  setOpenSettings: (open: boolean) => void;
  settings: Settings;
  remainingCount: number;
  totalSeconds: number;
  bestScore: number;
  pause: () => void;
}
interface Settings {
  rows: number;
  cols: number;
  mines: number;
}
export const Panel = (props: Props) => {
  const {
    settings,
    remainingCount,
    setOpenSettings,
    totalSeconds,
    bestScore,
    pause,
  } = props;

  return (
    <div className="panel">
      <h1>Buscaminas</h1>
      <button
        style={{ width: "100px" }}
        onClick={() => {
          pause();

          setOpenSettings(true);
        }}
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
          <span id="cellcount">{remainingCount}</span>
          <span id="minecount">{settings.mines}</span>
        </div>
      </div>
    </div>
  );
};
