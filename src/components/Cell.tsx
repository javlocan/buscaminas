import React, { useEffect, useState } from "react";

import '../App.css'
import {  a, useSpring } from "@react-spring/web";


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
  const [flipped, set] = useState(false)

  useEffect(() => {
    show?set(true):'';
    console.log("Cell with id=", index, " has been rendered");
  }, [show, index]);
  
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(100px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
    delay: index*5
  })

  const handleCell = () => {
    set(true)
    handleClick(index);
  }

  return (
    <div className="container" onClick={handleCell}> 
        <a.div
        className="c back"
        
        style={{ opacity: opacity.to(o => 1 - o), transform }}
      >
        </a.div>
      <a.div
        className={`c front ${visual[value]}`}
        style={{
          opacity,
          transform,
          rotateX: '180deg',
        }}
      >
        <span>{value!==0?value:' '}</span>
      </a.div>
   
  </div>
  )})