import React, { FC, useState } from "react";
import style from "./AdminBar.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminService } from "../../services/adminServices";
import { orange, white } from "../../store/reducers/colorReducer";
import { login } from "../../store/reducers/accauntReducer";
import { Status } from "../Status/Status";
import { linkAdminBar, linksAdminBar } from "../../Data/LinksAdminBar";

export const AdminBar: FC = () => {
  const [res, setRes] = React.useState<{ status: number; message: string }>({
    status: 0,
    message: "",
  });
  const [dataLinksForAdminBar, setDataLinksForAdminBar] =
    useState<linkAdminBar[]>(linksAdminBar);
  const userData = useSelector((state: AccLogReducerType) => state.accLog.user);
  const role = userData.role;
  const dispatch = useDispatch();
  const logout = () => {
    const responce = adminService.logout();
    responce.then((res) => {
      if (res.status === 400) {
        dispatch(orange());
        setTimeout(() => dispatch(white()), 1000);
      }
      if (res.status === 200) {
        dispatch(login({ email: "", login: false, role: "", accessToken: "" }));
      }
      setRes({ status: res.status, message: res.message });
      setTimeout(() => setRes({ status: 0, message: "" }), 1000);
    });
  };
  return (
    <div className={style.main}>
      {res.status !== 0 ? <Status responce={res} /> : null}
      <div>
        {role === "admin" ? (
          <div className={style.mainLinks}>
            {dataLinksForAdminBar?.map((link) => (
              <Link className={style.link} to={link.link}>
                <div className={style.mainDescription}>{link.name}</div>
                <img src={link.img} />
              </Link>
            ))}
          </div>
        ) : (
          <>
            <Link to="/login">Войти как админ</Link>
            <Link to="/registration">Зарегистрироваться</Link>
          </>
        )}
      </div>
      <button onClick={logout} className={style.admin}>
        <p>Выйти из аккаунта</p>
      </button>
    </div>
  );
};
