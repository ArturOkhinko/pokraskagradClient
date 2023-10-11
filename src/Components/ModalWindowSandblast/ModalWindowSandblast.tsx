import React from "react";
import { FC } from "react";
import style from "./ModalWindowSandblast.module.css";

interface ModalWindowSandblast {
  setName: (name: string) => void;
  setPriceInput: (name: string) => void;
  priceInput: string;
  name: string;
  insertSandblast: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const ModalWindowSandblast: FC<ModalWindowSandblast> = ({
  setName,
  name,
  priceInput,
  setPriceInput,
  insertSandblast,
  isOpen,
  setIsOpen,
}) => {
  return (
    <div className={style.main} onClick={() => setIsOpen(false)}>
      {isOpen ? (
        <div className={style.formCreatedItem}>
          <div
            className={style.mainWindow}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={style.inputAdmin}>
              <p>Название:</p>
              <input
                placeholder="Название"
                className={style.nameInput}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={style.inputAdmin}>
              <p>Цена:</p>
              <input
                placeholder="Цена"
                className={style.priceInput}
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
              />
            </div>
            <button onClick={insertSandblast} className={style.save}>
              Сохранить
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
