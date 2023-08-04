import React, { useEffect, useState } from "react";

import "../App.css";
import { a, useSpring } from "@react-spring/web";

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

interface Props {
  index: number;
  value: number;
  show: boolean;
  handleClick: (index: number) => void;
}

export const Cell: React.FC<Props> = React.memo((props: Props) => {
  const { index, value, show, handleClick } = props;
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    show ? setFlipped(true) : setFlipped(false);
    console.log("Cell with id=", index, " has been rendered");
  }, [show, index]);

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(1000px) rotateX(${flipped ? 180 : 0}deg)`,
    config: {
      mass: 10,
      tension: 400,
      friction: 20,
      clamp: true,
      stiffness: 200,
    },
  });

  const tadaa = useSpring({
    from: { scale: 1, transform: "rotate(0deg)" },
    to: [
      { scale: 1.1, transform: "rotate(20deg)" },
      { scale: 1.2, transform: "rotate(-20deg)" },
      { scale: 1.3, transform: "rotate(20deg)" },
      { scale: 1.4, transform: "rotate(-20deg)" },
      { scale: 1.5, transform: "rotate(20deg)" },
      { scale: 1.6, transform: "rotate(-20deg)" },
      { scale: 1.7, transform: "rotate(20deg)" },
      { scale: 1.8, transform: "rotate(-20deg)" },
      { scale: 1.9, transform: "rotate(20deg)" },
      { scale: 2, transform: "rotate(-20deg)" },
    ],

    config: {
      mass: 1,
      tension: 900,
      friction: 20,
      clamp: true,
      stiffness: 200,
    },
    loop: true,
  });

  const handleCell = () => {
    setFlipped(true);
    handleClick(index);
  };

  return (
    <div className="cell" onClick={handleCell} id={`cell-${index}`}>
      <a.div
        className="c back"
        style={{ opacity: opacity.to((o) => 1 - o), transform }}
      ></a.div>
      <a.div
        className={`c front ${visual[value]}`}
        style={
          value === -1 && show
            ? {
                opacity,
                //transform,
                rotateX: "180deg",
                ...tadaa,
              }
            : { opacity, transform, rotateX: "180deg" }
        }
      >
        <span>{value > 0 ? value : value === -1 ? "💣" : ""}</span>
      </a.div>
    </div>
  );
});
