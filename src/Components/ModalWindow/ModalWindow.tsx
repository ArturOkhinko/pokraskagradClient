import React from "react";
import { FC } from "react";
import style from "./ModalWindow.module.css";

import { useSelector } from "react-redux";

interface ModalWindow {
  backgroundColor: string;
  close: (isOpen: boolean) => void;
  header?: string;
  description: string;
  color?: string;
}
export const ModalWindow: FC<ModalWindow> = ({
  backgroundColor,
  close,
  header,
  description,
  color,
}) => {
  const colorReducer = useSelector(
    (state: ColorReducerType) => state.colorTheme.color
  );
  return (
    <div className={style.main} onClick={() => close(false)}>
      <div
        className={style.modalWindow}
        style={{
          backgroundColor: backgroundColor,
          color: color || colorReducer,
        }}
      >
        <div className={style.topLine}>
          <h1 className={style.header}>{header}</h1>
        </div>
        <hr className={style.delimiter} />
        <div className={style.description}>{description}</div>
      </div>
    </div>
  );
};
