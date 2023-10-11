import React from "react";
import style from "./Login.module.css";
import { AdminForm } from "../AdminForm/AdminForm";
export const Login = () => {
  return (
    <div className={style.main}>
      <AdminForm
        header="Введите email и пароль чтобы войти"
        linkToFetch="/login"
        anotherPage={{ link: "/registration", namePage: "Регистрация" }}
        buttonText="Войти"
      />
    </div>
  );
};
