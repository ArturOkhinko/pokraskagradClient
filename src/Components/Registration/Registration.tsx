import React from "react";
import { FC } from "react";
import style from "./Registration.module.css";
import { AdminForm } from "../AdminForm/AdminForm";

export const Registration: FC = () => {
  return (
    <div className={style.main}>
      <AdminForm
        header="Введите почту и пароль для регистрации"
        linkToFetch="/registration"
        anotherPage={{ link: "/login", namePage: "Войти" }}
        buttonText="Зарегистрироваться"
      />
    </div>
  );
};
