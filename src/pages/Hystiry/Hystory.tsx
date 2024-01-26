import React, { FC } from "react";
import { Link } from "react-router-dom";
import style from "./Hystory.module.css";

export const Hystory: FC = () => {
  return (
    <div className={style.main}>
      <p>История</p>
      <Link to="/">Обратно</Link>
    </div>
  );
};
