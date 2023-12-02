import React, { FC } from "react";
import style from "../HelloContent/HelloContent.module.css";
import logo from "../../img/logo.jpeg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import WhatsApp from "../../img/WhatsApp.png";
import { SocialHome } from "../SocialHome/SocialHome";

export const HelloContent: FC = () => {
  const color = useSelector(
    (state: ColorReducerType) => state.colorTheme.color
  );

  return (
    <div className={style.main}>
      <div className={style.helloContent}>
        <div className={style.info}>
          <a className={style.phoneNumber} href="https://wa.me/79874440763">
            <i>8 (987) 444 07 63</i>
            <img src={WhatsApp} className={style.whatsAppNumber} />
          </a>
          <hr />
          <a className={style.VK} href="https://vk.com/pokrasgrad">
            <i>Наша группа во ВКонтакте</i>
          </a>
          <hr />
          <p className={style.dye}>
            <i>Любые краски. Любой оттенок.</i>
          </p>
          <hr />
          <p className={style.linkToCatalog}>
            <i>Наши услуги и цены смотри в</i>{" "}
            <Link to={"/catalog"}>
              <i>каталоге</i>
            </Link>
          </p>
          <hr />
        </div>
        <a className={style.img} href="https://vk.com/pokrasgrad">
          <img src={logo} style={{ border: `1px solid ${color}` }} />
        </a>
      </div>
      <hr className={style.limiter} />
    </div>
  );
};
