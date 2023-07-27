interface Props {
  settings: Settings;
}
interface Settings {
  rows: number;
  cols: number;
  mines: number;
}
export const Panel = (props: Props) => {
  const { settings } = props;
  return (
    <div className="panel">
      <h1>Buscaminas</h1>
      <h2>
        {settings.cols} x {settings.rows}
      </h2>
      <h2>{settings.mines}</h2>
    </div>
  );
};
