import React, { FC, useState } from "react";
import style from "./DiscountVK.module.css";
import { Status } from "../Status/Status";
import { status } from "../../models/status";
import { AdminModule } from "../../modules/adminModule";

export const DiscountVK: FC = () => {
  const [discountUser, setDiscountUser] = useState<searchUserWithDiscount>();
  const [promocode, setPromocode] = useState<string>();
  const [res, setRes] = useState<status>({ status: 0 });

  const searchUserWidthDiscount = async () => {
    if (!promocode) {
      setRes({ status: 400, message: "Введите данные" });
      return;
    }
    const response = await AdminModule.searchUserWithDiscount(promocode);
    setDiscountUser({
      email: response.data.email,
      discount: response.data.discount,
    });
  };

  return (
    <div className={style.discountVK}>
      <Status response={res} />
      <div className={style.search}>
        <input
          className={style.inputPromoCode}
          placeholder="Введите promocode"
          value={promocode}
          onChange={(e) => setPromocode(e.target.value)}
        />
        <button
          className={style.searchButton}
          onClick={() => searchUserWidthDiscount()}
        >
          поиск
        </button>
      </div>
      {discountUser ? (
        <div className={style.user}>
          <p>{discountUser?.email}:</p>
          <p>{discountUser?.discount} %</p>
        </div>
      ) : null}
    </div>
  );
};
