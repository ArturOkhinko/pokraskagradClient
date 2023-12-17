import React, { useState } from "react";
import style from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AdminModule } from "../../modules/adminModule";
import { login as loginAction } from "../../store/reducers/accauntReducer";
import { Link } from "react-router-dom";
import { AxiosResponse } from "axios";
export const Login = () => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [response, setResponse] = useState<responceState>();
  const color = useSelector(
    (store: ColorReducerType) => store.colorTheme.color
  );

  const dispatch = useDispatch();
  const login = async () => {
    try {
      const responseLogin = await AdminModule.login(email, password);
      dispatch(
        loginAction({
          email: responseLogin.data.user.email,
          role: responseLogin.data.user.role,
          accessToken: responseLogin.data.accessToken,
        })
      );
      setResponse({
        status: "ok",
        message: `вы успешно вошли, ${responseLogin.data.user.role}`,
      });
    } catch (e: any) {
      console.log(e);
      setResponse({
        status: "error",
        message: e.response.data.message,
      });
    }
  };

  return (
    <div className={style.main}>
      <div
        className={style.login}
        style={{ border: `1px solid ${color}`, color: color }}
      >
        <div className={style.inputs}>
          <input
            placeholder="Почта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ border: `1px solid ${color}`, color: color }}
          />
          <input
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ border: `1px solid ${color}`, color: color }}
          />
        </div>
        {response ? (
          <div className={style.responseMessage + " " + style[response.status]}>
            <p>{response.message}</p>
          </div>
        ) : null}
        <button className={style.auth} onClick={login}>
          login
        </button>
      </div>
      <Link className={style.otherPage} to={"/registration"}>
        registration
      </Link>
    </div>
  );
};
