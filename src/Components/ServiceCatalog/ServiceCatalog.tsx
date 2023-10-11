import React, { FC } from "react";
import style from "../ServiceCatalog/ServiceCatalog.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import VK from "../../img/VK.png";
import WhatsApp from "../../img/WhatsApp.png";
import Telegram from "../../img/Telegram.png";
import Instogram from "../../img/Instogram.png";

interface ServiceCatalog {
  serviceChoice: ServiceChoiceType[];
}
export const ServiceCatalog: FC<ServiceCatalog> = ({ serviceChoice }) => {
  const color = useSelector(
    (state: ColorReducerType) => state.colorTheme.color
  );
  return (
    <div className={style.mainServiceChoice}>
      {serviceChoice[0] ? (
        serviceChoice.map((element) => (
          <Link className={style.main} to={element.link}>
            <div className={style.images}>
              <img src={element.img} />
            </div>
            <p className={style.text} style={{ color: color }}>
              <h3>{element.name}</h3>
              {element.text}
            </p>
          </Link>
        ))
      ) : (
        <div className={style.socialMain}>
          <p>
            Возможно вы не правильно написали название услуги. Позвоните нам или
            напишите для уточнения.
          </p>
          <div className={style.phone} style={{ color: color }}>
            8 (987) 444 07 63
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
      )}
    </div>
  );
};
