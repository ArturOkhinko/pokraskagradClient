import React, { FC } from "react";
import style from "./Logo.module.css";

export const Logo: FC = () => {
  return (
    <div className={style.main}>
      <img src="https://storage.yandexcloud.net/pokraskagrad.ru/gooddelo.png" />
    </div>
  );
};
