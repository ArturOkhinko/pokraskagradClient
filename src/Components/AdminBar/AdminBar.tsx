import React, { FC, useState } from "react";
import style from "./AdminBar.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Status } from "../Status/Status";
import { linksAdminBar } from "../../Data/LinksAdminBar";
import { AdminModule } from "../../modules/adminModule";
import { status } from "../../models/status";
import { logoutAction } from "../../store/reducers/accauntReducer";

export const AdminBar: FC = () => {
  const [res, setRes] = React.useState<status>({ status: 0 });
  const userData = useSelector((state: AccLogReducerType) => state.accLog.user);
  const role = userData.role;
  const dispatch = useDispatch();

  const logout = async () => {
    const response = await AdminModule.logout();
    setRes({ status: response.status, message: response.data.message });
    setTimeout(() => setRes({ status: 0 }), 1000);
    dispatch(logoutAction());
  };

  return (
    <div className={style.main}>
      {res.status !== 0 ? <Status response={res} /> : null}
      <div>
        {role === "admin" ? (
          <div className={style.mainLinks}>
            {linksAdminBar?.map((link) => (
              <Link className={style.link} to={link.link} key={link.link}>
                <div className={style.mainDescription}>{link.name}</div>
                <img src={link.img} />
              </Link>
            ))}
          </div>
        ) : (
          <div className={style.comeInToAcc}>
            <button>
              <Link to="/login" className={style.comeInLink}>
                Войти как админ
              </Link>
            </button>
            <button>
              <Link to="/registration" className={style.comeInLink}>
                Зарегистрироваться
              </Link>
            </button>
          </div>
        )}
        {role === "admin" ? (
          <button onClick={logout} className={style.admin}>
            <p>Выйти из аккаунта</p>
          </button>
        ) : null}
      </div>
    </div>
  );
};
