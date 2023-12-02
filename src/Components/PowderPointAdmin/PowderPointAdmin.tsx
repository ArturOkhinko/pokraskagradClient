import React from "react";
import style from "./PowderPointAdmin.module.css";
import { useDispatch, useSelector } from "react-redux";
import { FC } from "react";
import { adminService } from "../../services/adminServices";
import { Status } from "../Status/Status";
import { login } from "../../store/reducers/accauntReducer";
import { serverService } from "../../services/serverService";
import { SliderImg } from "../SliderImg/SliderImg";

type Items = {
  id: string;
  img: string;
};
type InsertInfo = {
  status: number;
  message: string;
  id: string;
};
export const PowderPointAdmin: FC = () => {
  const [items, setItems] = React.useState<Items[]>([]);
  const [value, setValue] = React.useState<string>("");
  const [res, setRes] = React.useState<{ status: number; message: string }>({
    status: 0,
    message: "",
  });
  const color = useSelector(
    (state: ColorReducerType) => state.colorTheme.color
  );
  const getInfo = async () => {
    const info = await serverService.getInfoPowderPoint();
    setItems(info);
  };
  React.useLayoutEffect(() => {
    getInfo();
  }, []);
  const dispatch = useDispatch();
  const userData = useSelector((state: AccLogReducerType) => state.accLog.user);

  const save = async () => {
    if (!value) {
      setRes({ status: 400, message: "Поле незаполнено" });
      setTimeout(() => setRes({ status: 0, message: "" }), 1000);
      return;
    }
    const operationInfo: InsertInfo = await adminService.insertPowderPoint(
      { img: value },
      userData.accessToken
    );
    if (operationInfo.status === 400) {
      const userData = await adminService.refresh();
      dispatch(login(userData));
      if (userData.role === "admin") {
        const operationInfo: InsertInfo = await adminService.insertPowderPoint(
          { img: value },
          userData.accessToken
        );
        if (setItems && items) {
          setItems([...items]);
        }
        setItems!([...items!, { img: value, id: operationInfo.id }]);
        setValue("");
        setRes({
          status: operationInfo.status,
          message: operationInfo.message,
        });
        setTimeout(() => setRes({ status: 0, message: "" }), 1000);
      }
      return;
    }

    if (operationInfo.status === 200) {
      setItems!([...items!, { img: value, id: operationInfo.id }]);
    }
    setValue("");
    setRes({
      status: operationInfo.status,
      message: operationInfo.message,
    });
    setTimeout(() => setRes({ status: 0, message: "" }), 1000);
  };

  return (
    <>
      <SliderImg items={items} setItems={setItems} />
      {userData && userData.role === "admin" ? (
        <div className={style.main}>
          <Status responce={res} />
          <input
            style={{ border: `1px solid ${color}` }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ссылка на картинку"
          />
          <button onClick={save} className={style.button}>
            Добавить
          </button>
        </div>
      ) : null}
    </>
  );
};
