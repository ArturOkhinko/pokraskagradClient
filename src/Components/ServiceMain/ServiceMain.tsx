import React, { FC } from "react";
import style from "../ServiceMain/serviceMain.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addPricePunct,
  addPriceToSum,
} from "../../store/reducers/sumPriceReducer";
import { nanoid } from "nanoid";
import { motion } from "framer-motion";
import { Social } from "../Social/Social";
import { SandblastResponse } from "../../models/responce/SandblastResponse";

interface ServiceMainProps {
  price: SandblastResponse[];
  deleteItem?: (id: string) => void;
}
export const ServiceMain: FC<ServiceMainProps> = ({ price, deleteItem }) => {
  const [search, setSearch] = React.useState<string>("");

  const color = useSelector(
    (state: ColorReducerType) => state.colorTheme.color
  );
  const userData = useSelector((state: AccLogReducerType) => state.accLog.user);
  const dispatch = useDispatch();

  const addItemInBasket = (id: string) => {
    price.forEach((element, index) => {
      if (index === Number(id[5])) {
        dispatch(
          addPricePunct({
            id: id.slice(0, 4),
            text: element.name + ` ( ${element.price} ₽ ) `,
            price: element.price,
          })
        );
        dispatch(addPriceToSum({ price: element.price }));
      }
    });
  };

  const searchPrice: SandblastResponse[] | string = React.useMemo(() => {
    if (search !== "") {
      const searchedPrice = price.filter((element) => {
        return element.name.toLowerCase().includes(search.toLowerCase());
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
                  <p>{element.name}</p>
                </div>
                <div
                  className={style.price}
                  style={{ color: "rgb(40, 170, 24)" }}
                >
                  <p>{element.price} ₽</p>
                </div>
              </div>

              <button
                onClick={() => addItemInBasket(nanoid(4))}
                className={style.addPrice}
              >
                🛒
              </button>
              {userData.role === "admin" && deleteItem ? (
                <button
                  className={style.adminButton}
                  onClick={(e) => deleteItem(element.id)}
                >
                  Удалить
                </button>
              ) : null}
            </motion.div>
          ))
        ) : (
          <div className={style.socialMain}>
            <p>
              Деталь ({search}) не добавлена в наш каталог. Свяжитесь с нами,
              чтобы узнать цену за пескоструй вашей детали. Наша консультация
              бесплатна.
            </p>
            <Social />
          </div>
        )}
      </div>
    </div>
  );
};
