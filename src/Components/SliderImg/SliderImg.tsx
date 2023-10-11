import React from "react";
import style from "./SliderImg.module.css";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminService } from "../../services/adminServices";
import { login } from "../../store/reducers/accauntReducer";
import { Status } from "../Status/Status";

type Items = {
  id: string;
  img: string;
};

interface SliderImg {
  setItems?: (items: Items[]) => void;
  items: Items[];
}

export const SliderImg: FC<SliderImg> = ({ setItems, items }) => {
  const [res, setRes] = React.useState<{ status: number; message: string }>({
    status: 0,
    message: "",
  });
  const userData = useSelector((state: AccLogReducerType) => state.accLog.user);
  const dispatch = useDispatch();
  const deleteImg = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const id = e.currentTarget.id;
    const operationInfo = await adminService.deletePowderPoint(
      { id },
      userData.accessToken
    );
    if (operationInfo.status === 400) {
      const userData = await adminService.refresh();
      dispatch(login(userData));
      if (userData && userData.role === "admin") {
        const operationInfo = await adminService.deletePowderPoint(
          { id },
          userData.accessToken
        );
        setRes({
          status: operationInfo.status,
          message: operationInfo.message,
        });
        setTimeout(() => setRes({ status: 0, message: "" }), 1000);
        setItems!(items.filter((element) => element.id !== id));
        return;
      }
    }
    setRes({ status: operationInfo.status, message: operationInfo.message });
    setTimeout(() => setRes({ status: 0, message: "" }), 1000);
    setItems!(items.filter((element) => element.id !== id));
  };

  return (
    <div className={style.main}>
      <Status responce={res} />
      {items
        ? items.map((element) => (
            <div className={style.img} key={element.id}>
              {userData.role === "admin" && setItems ? (
                <div className={style.silverBackground}>
                  <button
                    className={style.button}
                    id={element.id}
                    onClick={(e) => deleteImg(e)}
                  >
                    Удалить
                  </button>
                </div>
              ) : null}
              <img src={element.img} className={style.exemple} />
            </div>
          ))
        : null}
    </div>
  );
};
