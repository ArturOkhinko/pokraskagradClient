import React, { useEffect, useState } from "react";
import style from "./Indicators.module.css";
import { GaugeDataModule } from "../../modules/GuageDataModule";
import { useAppDispatch } from "../../hooks/redux";
import { userSlice } from "../../store/reducers/statusReducer";

export default function Indicators() {
  const [indicator, setIndicator] = useState({ temp: 0, co2: 0 });

  const dispatch = useAppDispatch();
  const { correctStatusDushnila } = userSlice.actions;

  const defineStyle = () => {
    if (indicator.temp < 27 && indicator.co2 < 800) {
      return style.ok;
    }
    return style.danger;
  };

  const getGuageData = async () => {
    const guageData = await GaugeDataModule.getGuageData(); //{ co2: 550, temp: 22.62 };

    setIndicator({
      co2: Number(guageData.data.co2),
      temp: Number(guageData.data.temp),
    });
    dispatch(
      correctStatusDushnila({
        co2: Number(guageData.data.co2),
        temp: Number(guageData.data.temp),
      })
    );
  };
  useEffect(() => {
    getGuageData();
    setInterval(getGuageData, 60000);
  }, []);

  return (
    <div className={`${defineStyle()} ${style.mainIndicators}`}>
      <div className={style.indicator}>
        <p className={style.valueIndicator}>{indicator.temp} °C</p>
        <p className={style.nameParameter}>Температура</p>
      </div>
      <div className={style.indicator}>
        <p className={style.valueIndicator}>{indicator.co2} ppm</p>
        <p className={style.nameParameter}>CO2</p>
      </div>
    </div>
  );
}
