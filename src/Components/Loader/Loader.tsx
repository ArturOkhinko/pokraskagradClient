import React from "react";
import style from "./Loader.module.css";
import { FC } from "react";

interface Lodaer {
  isLoader: boolean;
}
export const Loader: FC<Lodaer> = ({ isLoader }) => {
  return (
    <div className={style.main}>
      {isLoader ? (
        <div className={style.loader}>
          <div className={`${style.inner} ${style.one}`}></div>
          <div className={`${style.inner} ${style.two}`}></div>
          <div className={`${style.inner} ${style.three}`}></div>
        </div>
      ) : null}
    </div>
  );
};
