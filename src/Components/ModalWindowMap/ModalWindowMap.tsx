import React from "react";
import style from "./ModalWindowMap.module.css";
import YandexMaps from "../../img/YandexMap.png";
import GoogleMaps from "../../img/GoogleMaps.png";
import { FC } from "react";

interface ModalWindow {
  close: (isOpen: boolean) => void;
  isOpen: boolean;
}
export const ModalWindowMap: FC<ModalWindow> = ({ close, isOpen }) => {
  return (
    <div className={style.mainWindow}>
      {isOpen ? (
        <div className={style.main} onClick={() => close(false)}>
          <div className={style.modalWindow}>
            <div className={style.maps}>
              <a
                href="https://www.google.com/maps/@53.2331715,50.5933595,3a,75y,42.75h,84.8t/data=!3m6!1e1!3m4!1sVJrlh9bzqXfH-AG1ogpH5w!2e0!7i13312!8i6656?entry=ttu"
                className={style.google}
              >
                <img src={GoogleMaps} />
                <p>Google maps</p>
              </a>
              <a
                className={style.yandex}
                href="https://yandex.ru/maps/11133/kinel/house/promyshlennaya_ulitsa_6a/YUkYcw5jSUUOQFtpfX5ydXxqZw==/?ll=50.592977%2C53.234028&z=18.8"
              >
                <img src={YandexMaps} />
                <p>Яндекс карты</p>
              </a>
            </div>
            <p className={style.textChoice}>
              Выберите катры, на которых вам будет удобнее посмотреть наше место
              расположение
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};
