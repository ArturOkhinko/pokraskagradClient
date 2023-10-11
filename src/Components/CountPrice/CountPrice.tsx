import React, { FC } from "react";
import style from "./CountPrice.module.css";
import { useSelector } from "react-redux";
import { ModalList } from "../ModalList/ModalList";

export const CountPrice: FC = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const price = useSelector((state: SumPriceReducerType) => state.sum.sum);
  const color = useSelector(
    (state: ColorReducerType) => state.colorTheme.color
  );
  return (
    <div className={style.main} style={{ color: color }}>
      <div className={style.price}>
        {price > 0 ? <p>{price}₽</p> : null}
        <button className={style.buttonPrice} onClick={() => setIsOpen(true)}>
          🛒
        </button>
      </div>
      <div className={style.items}>
        <div>
          <ModalList isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </div>
  );
};
