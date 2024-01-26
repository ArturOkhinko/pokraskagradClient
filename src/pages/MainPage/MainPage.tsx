import React, { FC } from "react";
import style from "./MainPage.module.css";
import DushnilaStatus from "../../Components/DushnilaStatus/DushnilaStatus";
import DaysWithoutStuffiness from "../../Components/DaysWithoutStuffiness/DaysWithoutStuffiness";
import { Logo } from "../../Components/Logo/Logo";
import Indicators from "../../Components/Indicators/Indicators";

export const MainPage: FC = () => {
  return (
    <div className={style.main}>
      <div className={style.dushnila_status}>
        <DushnilaStatus />
      </div>
      <div className={style.days_without_stuffiness}>
        <DaysWithoutStuffiness />
      </div>
      <div className={style.logo}>
        <Logo />
      </div>
      <div className={style.indicators}>
        <Indicators />
      </div>
    </div>
  );
};
