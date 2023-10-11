import React, { FC } from "react";
import style from "../ServiceMain/serviceMain.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addPricePunct,
  addPriceToSum,
} from "../../store/reducers/sumPriceReducer";
import { nanoid } from "nanoid";
import { motion } from "framer-motion";
import { searchedReducer } from "../../store/reducers/searchReducer";
import VK from "../../img/VK.png";
import WhatsApp from "../../img/WhatsApp.png";
import Telegram from "../../img/Telegram.png";
import Instogram from "../../img/Instogram.png";

interface ServiceMainProps {
  price: SandblastJSONType[];
  deleteItem?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export const ServiceMain: FC<ServiceMainProps> = ({ price, deleteItem }) => {
  const [search, setSearch] = React.useState<string>("");

  const color = useSelector(
    (state: ColorReducerType) => state.colorTheme.color
  );
  const userData = useSelector((state: AccLogReducerType) => state.accLog.user);
  const dispatch = useDispatch();

  interface MouseEvent extends React.MouseEvent<HTMLButtonElement> {
    id?: string[];
  }

  const addPrice = (e: MouseEvent) => {
    price.forEach((element, index) => {
      if (index === Number(e.currentTarget.id[5])) {
        dispatch(
          addPricePunct({
            id: e.currentTarget.id.slice(0, 4),
            text: element.nameSandblast + ` ( ${element.priceSandblast} ₽ ) `,
            price: element.priceSandblast,
          })
        );
        dispatch(addPriceToSum({ price: element.priceSandblast }));
      }
    });
  };

  const searchPrice: SandblastJSONType[] | string = React.useMemo(() => {
    if (search !== "") {
      const searchedPrice = price.filter((element) => {
        return element.nameSandblast
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      if (searchedPrice[0]) {
        return searchedPrice;
      }
      return "В каталоге нет таких пунктов. Свяжитесь с нами, чтобы узнать цену на ваш запрос.";
    }
    return price;
  }, [search, price]);
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

  return (
    <div className={style.main}>
      <div className={style.topLine}>
        <input
          className={style.searchInput}
          style={{ border: `1px solid ${color}` }}
          placeholder=" 🔍 Поиск детали"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className={style.items}>
        {typeof searchPrice !== "string" ? (
          searchPrice.map((element, index) => (
            <motion.div
              className={style.mainService}
              style={{ border: `1px solid ${color}` }}
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.7 }}
              variants={textAnimation}
            >
              <div className={style.topLineItem}>
                <div className={style.name} style={{ color: color }}>
                  <p>{element.nameSandblast}</p>
                </div>
                <div
                  className={style.price}
                  style={{ color: "rgb(40, 170, 24)" }}
                >
                  <p>{element.priceSandblast} ₽</p>
                </div>
              </div>
              <div className={style.mainPrice}>
                <div className={style.button}>
                  <button
                    id={[nanoid(4), String(index)]}
                    onClick={(e) => addPrice(e)}
                    className={style.addPrice}
                  >
                    Добавить к цене
                  </button>
                  {userData.role === "admin" && deleteItem ? (
                    <button
                      id={element.id}
                      className={style.adminButton}
                      onClick={(e) => deleteItem(e)}
                    >
                      Удалить
                    </button>
                  ) : null}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className={style.socialMain}>
            <p style={{ color: color }}>{searchPrice}</p>
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
    </div>
  );
};