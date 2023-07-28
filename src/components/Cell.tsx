import React, { useEffect } from "react";

interface Props {
  index: number;
  value: number;
  show: boolean;
  handleClick: (index: number) => void;
}

const visual: Record<number, string> = {
  "-1": "mine",
  "0": "zero",
  "1": "number",
  "2": "number",
  "3": "number",
  "4": "number",
  "5": "number",
  "6": "number",
  "7": "number",
  "8": "number",
  "9": "number",
};

export const Cell: React.FC<Props> = React.memo((props: Props) => {
  const { index, value, show, handleClick } = props;

  useEffect(() => {
    console.log("Cell with id=", index, " has been rendered");
  }, [show, index]);

  return (
    <div
      id={`${index}`}
      onClick={() => handleClick(index)}
      className={`cell ${show ? visual[value] : ""}`}
    >
      <span>{value}</span>
    </div>
  );
});
