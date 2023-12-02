import React, { FC, useState } from "react";
import style from "./DiscountVK.module.css";
import { adminModule } from "../../modules/adminModule";
import { adminService } from "../../services/adminServices";
type userWidthDiscount = {
  email: string;
  amountOfDiscount: number;
};
export const DiscountVK: FC = () => {
  const [discountUser, setDiscountUser] = useState<userWidthDiscount>();
  const [promocode, setPromocode] = useState<string>();
  const searchUserWidthDiscount = async () => {
    if (promocode) {
      const user = await adminService.searchUserWidthDiscount(promocode);
      setDiscountUser({ email: user.email, amountOfDiscount: user.discount });
    }
  };

  return (
    <div className={style.discountVK}>
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
      <div className={style.user}>
        <p>{discountUser?.email}:</p>
        <p>{discountUser?.amountOfDiscount} %</p>
      </div>
    </div>
  );
};
