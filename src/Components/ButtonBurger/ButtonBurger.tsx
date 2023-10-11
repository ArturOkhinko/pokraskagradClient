import React from "react";
import style from "../ButtonBurger/ButtonBurger.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import VK from "../../img/VK.png";
import WhatsApp from "../../img/WhatsApp.png";
import Telegram from "../../img/Telegram.png";
import Instogram from "../../img/Instogram.png";
import { Color } from "../Color/Color";
import {
  blue,
  green,
  orange,
  red,
  yellow,
} from "../../store/reducers/colorReducer";

export default function ButtonBurger() {
  const [isWindowOpen, setIsWindowOpen] = React.useState<Boolean>(false);
  const [colorArr, setColorsArr] = React.useState<ColorSet[]>([
    { color: "rgb(255, 88, 51)", colorFunction: red },
    { color: "rgb(51, 174, 255)", colorFunction: blue },
    { color: "yellow", colorFunction: yellow },
    { color: "greenyellow", colorFunction: green },
    { color: "orange", colorFunction: orange },
  ]);

  const color = useSelector(
    (state: ColorReducerType) => state.colorTheme.color
  );
  return (
    <div className={style.main}>
      <div
        className={style.button}
        style={{ border: `1px solid ${color}` }}
        onClick={() => setIsWindowOpen((windowOpen) => !windowOpen)}
      >
        <hr className={style.burgerHr} />
        <hr className={style.burgerHr} />
        <hr className={style.burgerHr} />
      </div>
      {isWindowOpen ? (
        <div
          className={style.mainButtonWindow}
          onClick={() => setIsWindowOpen(false)}
        >
          <div className={style.buttonWindow_color}>
            <div className={style.buttonWindow}>
              <div className={style.links} style={{ color: color }}>
                <Link
                  className={style.link}
                  to="/home"
                  style={{
                    color: `${color}`,
                  }}
                >
                  Главная
                </Link>

                <Link
                  className={style.link}
                  to="/info"
                  style={{ color: `${color}` }}
                >
                  О нас
                </Link>

                <Link
                  className={style.link}
                  to="/catalog"
                  style={{ color: `${color}` }}
                >
                  Каталог
                </Link>
              </div>
              <div className={style.social}>
                <a href="https://vk.com/pokrasgrad">
                  <img src={VK} />
                </a>
                <a href="https://wa.me/79874440763">
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
            <div className={style.colorMin}>
              <Color colors={colorArr} mouseColor={setColorsArr} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
