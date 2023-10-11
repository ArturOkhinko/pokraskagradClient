import React from "react";
import style from "./NavBar.Style/NavBar.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  blue,
  green,
  orange,
  red,
  white,
  yellow,
} from "../../store/reducers/colorReducer";
import { Color } from "../Color/Color";
import ButtonBurger from "../ButtonBurger/ButtonBurger";
import { CountPrice } from "../CountPrice/CountPrice";
export default function NavBar() {
  const [colorArr, setColorsArr] = React.useState([
    { color: "rgb(255, 88, 51)", colorFunction: red },
    { color: "rgb(51, 174, 255)", colorFunction: blue },
    { color: "yellow", colorFunction: yellow },
    { color: "greenyellow", colorFunction: green },
    { color: "orange", colorFunction: orange },
  ]);
  type Role = {
    login: boolean;
    email: string;
    role: string;
  };
  const role: Role = useSelector(
    (state: AccLogReducerType) => state.accLog.user
  );
  const color: string = useSelector(
    (state: ColorReducerType) => state.colorTheme.color
  );
  const dispatch: Function = useDispatch();
  return (
    <div className={style.main}>
      <div className={style.buttonBurger}>
        <ButtonBurger />
      </div>
      <div className={style.navBar}>
        <Link
          className={style.link}
          to="/home"
          style={{
            color: `${color}`,
          }}
        >
          Главная
        </Link>

        <Link className={style.link} to="/info" style={{ color: `${color}` }}>
          О нас
        </Link>

        <Link
          className={style.link}
          to="/catalog"
          style={{ color: `${color}` }}
        >
          Каталог
        </Link>
      </div>
      {role.role ? (
        <div className={style.role}>
          {role.role === "admin" ? (
            <Link to="/admin" className={style.admin}>
              <p>{role.email}</p>
            </Link>
          ) : (
            <Link to="/user" className={style.user} style={{ color: color }}>
              <p>{role.email}</p>
            </Link>
          )}
        </div>
      ) : null}
      <div className={style.price}>
        <CountPrice />
      </div>
      <div className={style.colors}>
        <Color colors={colorArr} mouseColor={setColorsArr} />
      </div>
      <Link to="/login" className={style.login}>
        <p>Войти</p>
      </Link>
      {color !== "white" ? (
        <button onClick={() => dispatch(white())} className={style.color}>
          Вернуть белую тему
        </button>
      ) : null}
    </div>
  );
}
