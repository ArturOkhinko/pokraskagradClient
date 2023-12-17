import React, { FC, useState } from "react";
import style from "./WheelAdminModalWindow.module.css";
import { wheelAdminWindowState } from "../../models/states/wheelAdminWindowState";
import { AdminModule, adminModule } from "../../modules/adminModule";
import { status } from "../../models/status";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { WheelInfoResponse } from "../../models/responce/WheelInfoResponse";

interface WheelAdminModalWindow {
  setAdminWindowParams: (params: wheelAdminWindowState) => void;
  adminWindowParams: wheelAdminWindowState | undefined;
  setRes: (res: status) => void;
  save: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const WheelAdminModalWindow: FC<WheelAdminModalWindow> = ({
  setAdminWindowParams,
  adminWindowParams,
  setRes,
  save,
}) => {
  if (!adminWindowParams) {
    return <p></p>;
  }

  const changeAdminWindowParams = (value: string, field: string) => {
    const number = Number(value);

    if (Number.isNaN(number)) {
      setRes({ status: 400, message: "Введите число" });
      setTimeout(() => setRes({ status: 0, message: "" }), 1000);
      return;
    }

    if (number > 1000000) {
      setRes({ status: 400, message: "Максимальная цена" });
      setTimeout(() => setRes({ status: 0, message: "" }), 1000);
      return;
    }

    setAdminWindowParams({
      ...adminWindowParams,
      [field]: Number(value),
    });
  };
  return (
    <>
      {adminWindowParams?.isOpen ? (
        <div
          className={style.modalWindow}
          onClick={() =>
            setAdminWindowParams({ ...adminWindowParams, isOpen: false })
          }
        >
          <div
            className={style.adminBar}
            onClick={(event) => event.stopPropagation()}
          >
            <i>{adminWindowParams?.radius}</i>
            <div className={style.inputs}>
              <div className={style.input}>
                <i>Изначальное количество</i>
                <input
                  placeholder="Изначальное количество"
                  defaultValue={adminWindowParams.initialPriceCount}
                  value={adminWindowParams.initialPriceCount}
                  onChange={(e) =>
                    changeAdminWindowParams(e.target.value, "initialPriceCount")
                  }
                />
              </div>
              <div className={style.input}>
                <i>Цена</i>
                <input
                  placeholder="Цена"
                  value={adminWindowParams.price}
                  defaultValue={adminWindowParams.price}
                  onChange={(e) =>
                    changeAdminWindowParams(e.target.value, "price")
                  }
                />
              </div>
            </div>
            <div className={style.catalogPrice}>
              Цена в каталоге{" "}
              {adminWindowParams.price * adminWindowParams.initialPriceCount} ₽
            </div>
            <button onClick={save}>Сохранить</button>
          </div>
        </div>
      ) : null}
    </>
  );
};
