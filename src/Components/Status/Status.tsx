import React from "react";
import style from "./Status.module.css";
import { FC } from "react";

interface Status {
  response: {
    message?: string;
    status: number;
  };
}
export const Status: FC<Status> = ({ response }) => {
  return (
    <div className={style.main}>
      {response.status > 0 && response.message ? (
        <div
          className={
            response.status >= 300 && response.status <= 500
              ? style.danger + " " + style.status
              : style.ok + " " + style.status
          }
        >
          {response.message}
        </div>
      ) : null}

      {response.status >= 200 &&
      response.status < 300 &&
      response.message === undefined ? (
        <div className={style.ok + " " + style.status}>Успешно</div>
      ) : null}
      {response.status === 401 && response.message === undefined ? (
        <div className={style.danger + " " + style.status}>Авторизуйтесь</div>
      ) : null}
      {response.status > 401 &&
      response.status <= 500 &&
      response.message === undefined ? (
        <div className={style.danger + " " + style.status}>Авторизуйтесь</div>
      ) : null}
    </div>
  );
};
