import React, { FC } from "react";
import style from "./DushnilaStatus.module.css";
import { useAppSelector } from "../../hooks/redux";

export default function DushnilaStatus() {
  const status = useAppSelector((store) => store.statusReducer);

  const defineReason = () => {
    if (status.status === "ok") {
      return "Все показатели в норме";
    }
    if (status.reason === "co2temp") {
      return "CO2 и температура превышают норму";
    }
    if (status.reason === "co2") {
      return "CO2 превышает норму";
    }
    if (status.reason === "temp") {
      return "Температура превышает норму";
    }
  };

  const defineStatus = () => {
    if (status.status === "ok") {
      return "Душнила доволен вами";
    }
    return "Душнила не доволен вами";
  };
  return (
    <div
      className={`${status.status === "ok" ? style.ok : style.danger} ${
        style.main
      }`}
    >
      <p className={style.status}>{defineStatus()}</p>
      <p className={style.reason}>{defineReason()}</p>
    </div>
  );
}
