import React, { FC } from "react";
import { motion } from "framer-motion";
import style from "./Line.module.css";

interface Line {
  images: string[];
}
export const Line: FC<Line> = ({ images }) => {
  return (
    <div className={style.sale}>
      <div className={style.images}>
        {images.map((element, index) => (
          <div className={style.image} key={index}>
            <img src={element} />
          </div>
        ))}
      </div>
    </div>
  );
};
