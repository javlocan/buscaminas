interface Props {
  children: React.ReactNode;
  open: boolean;
}
export const Modal = (props: Props) => {
  const { open, children } = props;
  return (
    <div
      className="modal"
      style={{
        visibility: open ? "visible" : "hidden",
        opacity: open ? "1" : "0",
      }}
    >
      <div className="modal-content">{children}</div>
    </div>
  );
};
