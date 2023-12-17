import React, { FC } from "react";
import style from "./ModalList.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  removePricePunct,
  removePriceToSum,
} from "../../store/reducers/sumPriceReducer";
import VK from "../../img/VK.png";
import WhatsApp from "../../img/WhatsApp.png";
import Telegram from "../../img/Telegram.png";
import Instogram from "../../img/Instogram.png";
import { motion } from "framer-motion";

interface ModalListProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
export const ModalList: FC<ModalListProps> = ({ isOpen, setIsOpen }) => {
  const color = useSelector(
    (state: ColorReducerType) => state.colorTheme.color
  );
  const price = useSelector((state: SumPriceReducerType) => state.sum.sum);
  const items = useSelector((state: SumPriceReducerType) => state.sum.items);
  const dispatch = useDispatch();

  interface removeToPrice extends React.MouseEvent<HTMLButtonElement> {
    id?: number;
  }

  const removeToPrice = (e: removeToPrice) => {
    dispatch(removePricePunct({ id: e.currentTarget.id }));
    dispatch(removePriceToSum({ id: e.currentTarget.id, items: items }));
  };

  const textAnimation: AnimationType = {
    hidden: {
      y: 10,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  const whatsApp = React.useRef(
    "https://wa.me/79874440763?text=" +
      "Здравствуйте, хотел бы заказать у вас следующие услуги" +
      " " +
      items
        .map((element) => {
          return element.text + "-" + element.price;
        })
        .join(",")
  );
  return (
    <div>
      {isOpen ? (
        <div className={style.main} onClick={() => setIsOpen(false)}>
          <>
            <button className={style.close}>
              <p className={style.textClose} onClick={() => setIsOpen(false)}>
                ✖️
              </p>
            </button>
            <div
              className={style.topModalWindow}
              onClick={(event) => event.stopPropagation()}
            >
              <div
                className={style.items}
                style={{ border: `1px solid ${color}` }}
              >
                {items[0] ? (
                  items.map((element, index) => (
                    <motion.p
                      className={style.item}
                      key={index}
                      initial="hidden"
                      whileInView="visible"
                      variants={textAnimation}
                    >
                      <i className={style.openItem}>
                        {element.text} ({element.price} ₽)
                      </i>
                      <button
                        className={style.removeItem}
                        id={element.id}
                        onClick={(e) => removeToPrice(e)}
                      >
                        ❌
                      </button>
                    </motion.p>
                  ))
                ) : (
                  <p className={style.conditional}>
                    Сдесь будут отбражаться услуги, которые вы добавили в
                    корзину.
                  </p>
                )}
              </div>
              <div className={style.social}>
                <a href="https://vk.com/pokrasgrad">
                  <img src={VK} />
                </a>
                <a href={whatsApp.current}>
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
            {price > 0 ? (
              <div>
                <p className={style.welcomeText}>
                  Мы готовы предоставить вам эти услуги. Позвони нам или напиши.
                </p>
                <div className={style.infoPrice}>
                  <i className={style.text}>
                    Вы выбрали услуги общей стоимостью:
                  </i>
                  <h4 className={style.priceWindow}>
                    <i>{price} ₽</i>
                  </h4>
                </div>
              </div>
            ) : null}
          </>
        </div>
      ) : null}
    </div>
  );
};
