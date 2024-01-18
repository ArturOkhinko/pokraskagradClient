import React from "react";
import { FC } from "react";
import style from "./AdminForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../store/reducers/accauntReducer";

interface AdminForm {
  header: string;
  linkToFetch: string;
  anotherPage: {
    link: string;
    namePage: string;
  };
  buttonText: string;
}
export const AdminForm: FC<AdminForm> = ({
  header,
  anotherPage,
  buttonText,
}) => {
  const [password, setPassword] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [code, setCode] = React.useState<string>("");
  const [res, setRes] = React.useState<{
    status: number;
    message: string;
    role?: string;
  }>();
  const dispatch = useDispatch();

  const responce = async () => {
    console.log(responce);
    dispatch(login(responce));
  };

  const passwordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const emailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const codeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };
  const color = useSelector(
    (state: ColorReducerType) => state.colorTheme.color
  );
  return (
    <div className={style.main}>
      <p className={style.admin}>
        Сейчас регистрация или вход в систему необходим только для
        администратора, но в будующем у зарегестрированных пользователей
        появятся дополнительные возможности. Если вы не являетесь
        администратором, то прорсто перейдите на вкладку регистрация, введите
        почту и пароль. Secret code в таком случае вводить не нужно.
      </p>
      <div
        className={style.registration}
        style={{ border: `1px solid ${color}`, color: color }}
      >
        <p className={style.header}>{header}</p>
        <div className={style.inputs}>
          <input
            placeholder="Почта"
            value={email}
            onChange={(e) => emailInput(e)}
            style={{ border: `1px solid ${color}`, color: color }}
          />
          <input
            placeholder="Пароль"
            value={password}
            onChange={(e) => passwordInput(e)}
            style={{ border: `1px solid ${color}`, color: color }}
          />
          <input
            placeholder="Sicret code(Для администратора системы)"
            value={code}
            onChange={(e) => codeInput(e)}
            style={{ border: `1px solid ${color}`, color: color }}
          />
        </div>
        {res ? (
          <div className={res?.status === 400 ? style.warning : style.good}>
            <p>{res.message}</p>
            <p className={style.role} style={{ color: color }}>
              {res.role}
            </p>
          </div>
        ) : null}
        <button onClick={responce} className={style.login}>
          {buttonText}
        </button>
      </div>
      <Link
        to={anotherPage.link}
        className={style.otherPage}
        style={{ color: color }}
      >
        {anotherPage.namePage}
      </Link>
    </div>
  );
};
