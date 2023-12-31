import React, { FC } from "react";
import style from "./Social.module.css";
import { useSelector } from "react-redux";
import VK from "../../img/VK.png";
import WhatsApp from "../../img/WhatsApp.png";
import Telegram from "../../img/Telegram.png";
import Instogram from "../../img/Instogram.png";

export const Social: FC = (message) => {
  const color = useSelector(
    (state: ColorReducerType) => state.colorTheme.color
  );
  return (
    <div className={style.main}>
      <div className={style.phone} style={{ color: color }}>
        8 (987) 444 07 63
      </div>
      <div className={style.social}>
        <a href="https://vk.com/pokrasgrad">
          <img src={VK} />
        </a>
        <a href={"https://wa.me/79874440763"}>
          <img src={WhatsApp} />
        </a>
        <a href="https://t.me/pokrasgrad">
          <img src={Telegram} />
        </a>
        <a href="https://instagram.com/pokrasgrad?igshid=NTc4MTIwNjQ2YQ==">
          <img src={Instogram} />
        </a>
      </div>
    </div>
  );
};
