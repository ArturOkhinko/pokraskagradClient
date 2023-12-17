import React, { FC } from "react";
import style from "./Price.module.css";
import { useDispatch } from "react-redux";
import { addPricePunct } from "../../store/reducers/sumPriceReducer";
import { WheelInfoResponse } from "../../models/responce/WheelInfoResponse";

interface PriceProps {
  items: WheelInfoResponse[];
  setItems: (items: WheelInfoResponse[]) => void;
  openAdminWindow?: (
    id: string,
    price: number,
    initialPriceCount: number,
    radius: string
  ) => void;
}

export const Price: FC<PriceProps> = React.memo(
  ({ items, setItems, openAdminWindow }) => {
    const dispatch = useDispatch();
    const addPrice = (
      id: string,
      price: number,
      initialPriceCount: number,
      text: string
    ) => {
      const priceForWallet = price * initialPriceCount;
      dispatch(addPricePunct({ id, price: priceForWallet, text }));
    };

    const correctPrice = (id: string, newPriceCount: string) => {
      setItems(
        items.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              initialPriceCount: Number(newPriceCount),
            };
          }
          return item;
        })
      );
    };

    return (
      <div className={style.main}>
        {items.map((element, index) => (
          <div className={style.wheel} key={element.id}>
            <div className={style.mainText}>
              {element.radius ? (
                <div className={style.model}>
                  <h2>
                    <i>{element.radius}</i>
                  </h2>
                </div>
              ) : null}
              <div className={style.sliderImg}>
                {[element.img].map((element: any, index: number) => (
                  <img src={element} key={index} />
                ))}
              </div>
            </div>

            <i className={style.name}>{element.text}</i>
            <hr className={style.linear} />
            <div className={style.inputDisc}>
              <i>{element.name}</i>
              <input
                placeholder={"1"}
                defaultValue={element.initialPriceCount}
                value={element.initialPriceCount}
                onChange={(e) => correctPrice(element.id, e.target.value)}
              />
            </div>
            <hr className={style.linear} />
            <div className={style.price}>
              <div className={style.priceSize}>
                {element.price < 100000000 ? (
                  element.price * Number(element.initialPriceCount) + " " + "₽"
                ) : (
                  <div className={style.aleshaFond}>
                    Если у тебя есть столько денег, то лучше переведи их сюда{" "}
                    <a href="https://aleshafond.ru/children">
                      https://aleshafond.ru/children
                    </a>
                  </div>
                )}
              </div>
              <button
                className={style.addToSumButton}
                onClick={() =>
                  addPrice(
                    element.id,
                    element.price,
                    element.initialPriceCount,
                    element.text
                  )
                }
              >
                🛒
              </button>
            </div>
            {openAdminWindow ? (
              <div className={style.adminBarButton}>
                <button
                  className={style.adminButton}
                  onClick={() =>
                    openAdminWindow(
                      element.id,
                      element.price,
                      element.initialPriceCount,
                      element.radius
                    )
                  }
                >
                  Изменить
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    );
  }
);
