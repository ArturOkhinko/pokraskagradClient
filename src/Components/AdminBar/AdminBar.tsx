import React from "react";
import style from "./AdminBar.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminService } from "../../services/adminServices";
import { orange, white } from "../../store/reducers/colorReducer";
import { login } from "../../store/reducers/accauntReducer";
import { Status } from "../Status/Status";

export const AdminBar = () => {
  const [res, setRes] = React.useState<{ status: number; message: string }>({
    status: 0,
    message: "",
  });
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
      <div className={style.mainLinks}>
        {role === "admin" ? (
          <>
            <Link className={style.link} to="/mainDescription">
              <div className={style.mainDescription}>
                Первая страница описание
              </div>
              <img src="https://storage.yandexcloud.net/pokraskagrad.ru/AdminBar/DescriptionCompanu.jpeg" />
            </Link>
            <Link className={style.link} to="/descriptionPost">
              <div className={style.descriptionPost}>
                Посты на странице с информацией
              </div>
              <img src="https://storage.yandexcloud.net/pokraskagrad.ru/AdminBar/PostAboutCompany.jpeg" />
            </Link>
            <Link className={style.link} to="/wheelInfoAdmin">
              <div className={style.sandblastWheels}>
                Диски колес от легковых автомобилей
              </div>
              <img src="https://storage.yandexcloud.net/pokraskagrad.ru/AdminBar/PowderWheel.jpeg" />
            </Link>
            <Link className={style.link} to="/truckWheelInfoAdmin">
              <div className={style.sandblastCargoWheels}>
                Диски от грузовых колес
              </div>
              <img src="https://storage.yandexcloud.net/pokraskagrad.ru/AdminBar/PowderTrukWheel.jpeg" />
            </Link>
            <Link className={style.link} to="/supportAdmin">
              <div className={style.supports}>Супорта</div>
              <img src="https://storage.yandexcloud.net/pokraskagrad.ru/AdminBar/supports.jpeg" />
            </Link>
            <Link className={style.link} to="/powderPointAdmin">
              <div className={style.point}>Порошковая покраска</div>
              <img src="https://storage.yandexcloud.net/pokraskagrad.ru/AdminBar/exempleWorkes.jpeg" />
            </Link>
            <Link className={style.link} to="/sandblastAdmin">
              <div className={style.sandblast}>Пескоструй других деталей</div>
              <img src="https://storage.yandexcloud.net/pokraskagrad.ru/AdminBar/sandblast.jpeg" />
            </Link>
          </>
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
