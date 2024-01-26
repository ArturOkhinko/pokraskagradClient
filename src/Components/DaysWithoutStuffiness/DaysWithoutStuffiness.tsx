import React from "react";
import style from "./DaysWithoutStuffiness.module.css";
import { MyButton } from "../MyButton/MyButton";

export default function DaysWithoutStuffiness() {
  return (
    <div className={style.main}>
      <p className={style.text}>Количество дней без душноты 0</p>
      <div className={style.button_story}>
        <MyButton nameButton="История" />
      </div>
    </div>
  );
}
