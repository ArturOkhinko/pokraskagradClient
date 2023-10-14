import React from "react";
import style from "./DescriptionAboutCompany.module.css";
import Hangar from "../../img/Hangar.jpeg";
import HangarMap from "../../img/HangarMap.jpeg";
import HangarMapSecond from "../../img/HangarMapSEcond.jpeg";
import HangarPoint from "../../img/HangarPoint.jpeg";
import HangarSandblast from "../../img/HaungarSandblast.jpeg";
import VK from "../../img/VK.png";
import WhatsApp from "../../img/WhatsApp.png";
import Telegram from "../../img/Telegram.png";
import Instogram from "../../img/Instogram.png";
import exempleWheelsGold from "../../img/exempleWheelsGold.jpeg";
import exempleWheelGold from "../../img/exempleWheelGold.jpeg";
import exemple from "../../img/exemple.jpeg";
import exempleWheel from "../../img/exmpleWheel.jpeg";
import { useSelector } from "react-redux";
import { FC } from "react";
import { Social } from "../Social/Social";

interface DescriptionAboutCompany {
  setIsOpen: (isOpen: boolean) => void;
}

export const DescriptionAboutCompany: FC<DescriptionAboutCompany> = ({
  setIsOpen,
}) => {
  const color = useSelector(
    (state: ColorReducerType) => state.colorTheme.color
  );
  return (
    <div>
      <div className={style.topLine} style={{ color: color }}>
        <div className={style.exemple}>
          <div className={style.imagesExemple}>
            <img className={style.exempleWheel} src={exempleWheelsGold} />
            <img className={style.exempleWheel} src={exempleWheel} />
            <img className={style.exempleWheel} src={exemple} />
            <img className={style.exempleWheel} src={exempleWheelGold} />
          </div>
        </div>
        <div className={style.welcome}>
          <p className={style.attract}>
            Звоните нам и пишите в любое время, для уточнения вопросов по
            <a>бесплатной доставке</a>, ценам или любого другого
          </p>
          <div className={style.mainSocial}>
            <Social />
          </div>
          <div className={style.minDescription}>
            <p className={style.descriptionOfCompany}>
              Мы предлагаем высококачественные услуги покраски и пескоструя
              металических изделий. Например дисков от машины, которые мы сами
              довезем до ангара и вернем уже готовые, а для крупных заказов у
              нас имеется грузовая машина.
            </p>
            <details className={style.infoOfCompany}>
              <summary>
                ДРУЗЬЯ, ХОТИТЕ СДЕЛАТЬ СВОЕ АВТО, МОТОЦИКЛ ИЛИ ВЕЛОСИПЕД
                ПО-НАСТОЯЩЕМУ УНИКАЛЬНЫМ и СТИЛЬНЫМ?
              </summary>
              <p>
                Тогда пора обратиться к @pokrasgrad за услугами покраски
                металлических изделий порошковой краской! Мы предлагаем
                высококачественную и профессиональную услугу покраски, которая
                подойдет для любого типа металлических изделий, включая элементы
                подвески автомобилей, авто и мото диски, велорамы и многое
                другое. ❗ Наша команда опытных специалистов использует только
                передовые материалы и технологии, чтобы создавать уникальные и
                прочные покрытия на металлических изделиях. ⚡ Порошковая краска
                - это не только стильный и модный внешний вид, но и защита от
                коррозии и других внешних факторов, что позволит вашим изделиям
                сохранить свой первоначальный вид на долгое время. Мы подберем
                идеальный цвет и оттенок для вашего проекта, чтобы он стал
                по-настоящему уникальным и запоминающимся. ✅ Так же занимаемся
                профессиональной пескоструйной очисткой и покраской порошковой
                краской любых металлических конструкций! Обращайтесь к
                @pokrasgrad за услугами покраски металлических изделий
                порошковой краской и делайте свое авто, мотоцикл или велосипед
                стильным и неповторимым! Свяжитесь с @pokrasgrad прямо сейчас,
                чтобы получить бесплатную консультацию и узнать больше о нашей
                услуге.
              </p>
            </details>
          </div>
        </div>
      </div>
      <div className={style.location} style={{ color: color }}>
        <div className={style.visual}>
          <div className={style.images}>
            <img src={HangarMap} />
            <img src={HangarMapSecond} />
            <img src={Hangar} />
            <img src={HangarPoint} />
            <img src={HangarSandblast} />
          </div>
          <button
            className={style.locationLink}
            onClick={() => setIsOpen(true)}
            style={{ color: color }}
          >
            <p>Мы находимся по адресу:</p>
            <ul className={style.local}>
              <li>город: Кинель,</li>
              <li>улица: Промышленная</li>
              <li>дом: 6А</li>
            </ul>
            <p className={style.planet}>🌍</p>
          </button>
        </div>
        <p className={style.visualText}>
          Фотографии нашего ангара и оборудования
        </p>
      </div>
    </div>
  );
};
