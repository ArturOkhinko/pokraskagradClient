import React from "react";
import style from "./Status.module.css";
import { FC } from "react";

interface Status {
  responce: {
    message: string;
    status: number;
  };
}
export const Status: FC<Status> = ({ responce }) => {
  return (
    <div className={style.main}>
      {responce.status > 0 ? (
        <div className={responce.status === 400 ? style.danger : style.ok}>
          {responce.message}
        </div>
      ) : null}
    </div>
  );
};
