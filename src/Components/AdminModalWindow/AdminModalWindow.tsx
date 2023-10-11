import React from "react";
import style from "./AdminModalWindow.module.css";
import { Price } from "../Price/Price";
import { FC } from "react";
import { BiX } from "react-icons/bi";
type PriceInfo = {
  defaultValueInput: string;
  priceInput: string;
  id: string;
  text: string;
  radius?: string;
  name: string;
};
type AdminModalWindow = {
  price: WheelPriceJSONType[];
  savePostInfo: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  priceInfo: PriceInfo;
  setPriceInfo: (price: PriceInfo) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
export const AdminModalWindow: FC<AdminModalWindow> = ({
  price,
  savePostInfo,
  priceInfo,
  setPriceInfo,
  isOpen,
  setIsOpen,
}) => {
  const [priceProps, setPriceProps] = React.useState<WheelPriceJSONType[]>();
  React.useEffect(() => {
    if (isOpen) {
      setPriceProps(price);
    }
  }, [isOpen]);
  return (
    <>
      {isOpen && priceProps ? (
        <div className={style.main} onClick={() => setIsOpen(false)}>
          <button className={style.close} onClick={() => setIsOpen(false)}>
            <BiX />
          </button>
          <div className={style.mainPrice} onClick={() => setIsOpen(false)}>
            <Price
              price={priceProps}
              savePostInfo={savePostInfo}
              priceInfo={priceInfo}
              setPriceInfo={setPriceInfo}
              isOpen={isOpen}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};
