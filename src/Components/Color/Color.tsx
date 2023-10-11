import React, { FC } from "react";
import style from "../Color/Color.module.css";
import { useDispatch } from "react-redux";

interface ColorsProps {
  colors: ColorSet[];
  mouseColor: Function;
}
export const Color: FC<ColorsProps> = ({ colors }) => {
  const dispatch = useDispatch();
  return (
    <div className={style.main}>
      {colors
        ? colors.map((color, index) => (
            <div
              className={style.colorMain}
              onClick={() => dispatch(color.colorFunction())}
              key={index}
            >
              <div
                className={style.color}
                style={{ backgroundColor: color.color }}
              ></div>
            </div>
          ))
        : null}
    </div>
  );
};
