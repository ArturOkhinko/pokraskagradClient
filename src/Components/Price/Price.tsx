import React, { FC } from "react";
import style from "./Price.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addPricePunct,
  addPriceToSum,
} from "../../store/reducers/sumPriceReducer";
import { nanoid } from "nanoid";
import { Loader } from "../Loader/Loader";

type PriceInfo = {
  defaultValueInput: string;
  priceInput: string;
  id: string;
  radius?: string;
  text: string;
  name: string;
};

interface PriceProps {
  price: WheelPriceJSONType[];
  setPrice?: Function;
  priceInfo?: PriceInfo;
  setPriceInfo?: (price: PriceInfo) => void;
  savePostInfo?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  openWindow?: (isOpen: boolean) => void;
  isOpen?: boolean;
}

export const Price: FC<PriceProps> = React.memo(
  ({
    price,
    setPrice,
    priceInfo,
    setPriceInfo,
    savePostInfo,
    openWindow,
    isOpen,
  }) => {
    const info = useSelector((state: WheelReducer) => state.wheels.info);
    const [isLoader, setIsLoader] = React.useState<boolean>(true);
    React.useEffect(() => {
      if (setPrice && info[0].price > 0 && info[0].initialPriceCount > 0) {
        setPrice((price: WheelPriceJSONType[]) =>
          price.map((element, index) => {
            return {
              ...info[index],
              price: info[index].price * info[index].initialPriceCount,
            };
          })
        );
      }
    }, [info]);
    React.useEffect(() => {
      if (price[0]) {
        setIsLoader(false);
      }
    }, [price]);
    const createNewPrice: (e: React.ChangeEvent<HTMLInputElement>) => void = (
      e
    ) => {
      if (setPrice) {
        setPrice(
          price.map((element) => {
            if (element.id === e.target.id) {
              const newPrice = info.find((price) => price.id === e.target.id);
              if (!Number(e.target.value)) {
                return {
                  ...element,
                  price: 0,
                };
              }
              return {
                ...element,
                price: Number(newPrice?.price) * Number(e.target.value),
              };
            }
            return element;
          })
        );
      }
    };

    const color: string = useSelector(
      (state: ColorReducerType) => state.colorTheme.color
    );
    const dispatch = useDispatch();
    interface button extends React.MouseEvent {
      id?: number;
    }
    const addToSum: (e: button) => void = (e) => {
      price.map((element) => {
        if (element.id === e.currentTarget.id) {
          if (element.price > 0) {
            dispatch(addPriceToSum({ price: element.price }));
            dispatch(
              addPricePunct({
                text: element.text + ` ( ${element.price} ₽ )`,
                id: nanoid(8),
                price: Number(element.price),
              })
            );
          }
        }
      });
    };

    const openWindowAdmin = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      if (openWindow) {
        openWindow(true);
      }
      if (priceInfo && setPriceInfo) {
        const priceValues = info.find(
          (element) => element.id === e.currentTarget.id
        )!;
        const getPriceInfo = () => {
          if (priceValues.model) {
            return {
              ...priceInfo,
              id: e.currentTarget.id,
              defaultValueInput: String(priceValues.initialPriceCount),
              priceInput: String(priceValues.price),
              radius: priceValues.model,
              name: priceValues.name,
              text: priceValues.text,
            };
          }
          return {
            ...priceInfo,
            id: e.currentTarget.id,
            defaultValueInput: String(priceValues.initialPriceCount),
            priceInput: String(priceValues.price),
            name: priceValues.name,
            text: priceValues.text,
          };
        };
        setPriceInfo(getPriceInfo());
      }
    };
    const user = useSelector((state: AccLogReducerType) => state.accLog);
    return (
      <div className={style.main} style={{ color: color }}>
        <Loader isLoader={isLoader} />
        {price.map((element, index) =>
          element.initialPriceCount ? (
            <div
              className={style.wheel}
              key={element.id}
              style={{ border: `1px solid ${color}` }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={style.mainText}>
                {element.model ? (
                  <div className={style.model}>
                    <h2>
                      <i>{element.model}</i>
                    </h2>
                  </div>
                ) : null}
                {typeof element.img !== "string" && element.img ? (
                  <div className={style.sliderImg}>
                    {element.img.map((element, index) => (
                      <img src={element} key={index} />
                    ))}
                  </div>
                ) : (
                  <img src={element.img} />
                )}
              </div>
              <i className={style.name}>{element.text}</i>
              <hr className={style.linear} />
              <div className={style.inputDisc}>
                <i>{element.name}</i>
                <input
                  placeholder={"1"}
                  defaultValue={element.initialPriceCount}
                  id={String(element.id)}
                  onChange={(e) => createNewPrice(e)}
                  style={{ border: `1px solid ${color}`, color: color }}
                />
              </div>
              <hr className={style.linear} />
              <div className={style.button}>
                <div className={style.addToSum}>
                  <button
                    style={{ border: `1px solid ${color}` }}
                    data-price={Number(element.price)}
                    onClick={(e) => addToSum(e)}
                    id={String(element.id)}
                    className={style.addToSumButton}
                  >
                    Добавить к цене
                  </button>
                </div>
                <div className={style.price}>
                  {element.price < 100000000 ? (
                    element.price + " " + "₽"
                  ) : (
                    <div className={style.aleshaFond}>
                      Если у тебя есть столько денег, то лучше переведи их сюда{" "}
                      <a href="https://aleshafond.ru/children">
                        https://aleshafond.ru/children
                      </a>
                    </div>
                  )}
                </div>
                {user.user.role === "admin" && openWindow ? (
                  <div className={style.adminBarButton}>
                    <button
                      id={element.id}
                      className={style.adminButton}
                      onClick={(e) => openWindowAdmin(e)}
                    >
                      Изменить
                    </button>
                  </div>
                ) : null}
              </div>
              {setPriceInfo && priceInfo && isOpen ? (
                <div className={style.adminBar}>
                  <div className={style.inputAdmin}>
                    <div className={style.defaultValue}>
                      <p>Изначальное количество:</p>
                      <input
                        id={element.id}
                        value={priceInfo?.defaultValueInput}
                        onChange={(e) =>
                          setPriceInfo!({
                            ...priceInfo,
                            defaultValueInput: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className={style.priceAdmin}>
                      <p>Цена: </p>
                      <input
                        value={priceInfo.priceInput}
                        onChange={(e) =>
                          setPriceInfo!({
                            ...priceInfo,
                            priceInput: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className={style.inputName}>
                      <p>Название в корзине: </p>
                      <input
                        value={priceInfo.text}
                        onChange={(e) =>
                          setPriceInfo!({
                            ...priceInfo,
                            text: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className={style.inputText}>
                      <p>Текст: </p>
                      <input
                        value={priceInfo.name}
                        onChange={(e) =>
                          setPriceInfo!({
                            ...priceInfo,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <button
                    onClick={(e) => savePostInfo!(e)}
                    className={style.savePostInfo}
                  >
                    Сохранить изменения
                  </button>
                </div>
              ) : null}
            </div>
          ) : null
        )}
      </div>
    );
  }
);
