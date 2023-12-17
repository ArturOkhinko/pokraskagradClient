import React, { useState } from "react";
import { FC } from "react";
import style from "./Registration.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AdminModule } from "../../modules/adminModule";
import { login as loginAction } from "../../store/reducers/accauntReducer";
import { Link } from "react-router-dom";
export const Registration: FC = () => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [response, setResponse] = useState<responceState>();

  const color = useSelector(
    (store: ColorReducerType) => store.colorTheme.color
  );

  const dispatch = useDispatch();
  const registration = async () => {
    try {
      const responceRegistration = await AdminModule.registration(
        email,
        password,
        code
      );
      dispatch(
        loginAction({
          email: email,
          role: responceRegistration.data.user.role,
          accessToken: responceRegistration.data.accessToken,
        })
      );
      setResponse({
        status: "ok",
        message: `Письмо с сылкой для подтвверждения отправленна на почту, ${email}`,
      });
    } catch (e: any) {
      setResponse({
        status: "error",
        message: e.response.data.message,
      });
    }
  };
  return (
    <div className={style.main}>
      <div
        className={style.registration}
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
          <input
            placeholder="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{ border: `1px solid ${color}`, color: color }}
          />
        </div>
        {response ? (
          <div className={style.responseMessage + " " + style[response.status]}>
            <p>{response.message}</p>
          </div>
        ) : null}
        <button onClick={registration} className={style.registrationButton}>
          registration
        </button>
      </div>
      <Link className={style.otherPage} to={"/login"}>
        login
      </Link>
    </div>
  );
};
