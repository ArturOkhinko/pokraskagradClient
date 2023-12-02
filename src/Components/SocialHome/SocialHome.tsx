import React, { FC } from "react";
import style from "./SocialHome.module.css";
export const SocialHome: FC = () => {
  return (
    <div className={style.cilcularSocial}>
      <a className={style.cn_button} id="cn-button">
        <img />
      </a>
      <div className={style.cn_wrapper} id="cn-wrapper">
        <ul>
          <li>
            <a href="https://vk.com/pokrasgrad" className={style.first_element}>
              <img src="https://storage.yandexcloud.net/pokraskagrad.ru/social/vk.png" />
            </a>
          </li>
          <li>
            <a
              href="https://wa.me/79874440763"
              className={style.second_element}
            >
              <img src="https://storage.yandexcloud.net/pokraskagrad.ru/social/WhatsApp.svg.png" />
            </a>
          </li>
          <li>
            <a href="https://t.me/pokrasgrad" className={style.third_element}>
              <img src="https://storage.yandexcloud.net/pokraskagrad.ru/social/telegram.png" />
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com/pokrasgrad?igshid=NTc4MTIwNjQ2YQ=="
              className={style.fourth_element}
            >
              <img src="https://storage.yandexcloud.net/pokraskagrad.ru/social/Instogram.80e598d8df0c0a94d580.png" />
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com/pokrasgrad?igshid=NTc4MTIwNjQ2YQ=="
              className={style.fifth_element}
            >
              <img src="https://storage.yandexcloud.net/pokraskagrad.ru/social/mail-xxl.png" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
