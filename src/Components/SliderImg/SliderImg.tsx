import React from "react";
import style from "./SliderImg.module.css";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Status } from "../Status/Status";
import { PowderPointImgsResponse } from "../../models/responce/PowderPointImgsResponse";
import { status } from "../../models/status";

interface SliderImg {
  imgs: PowderPointImgsResponse[];
  deleteImg?: (id: string) => void;
}

export const SliderImg: FC<SliderImg> = ({ imgs, deleteImg }) => {
  const [res, setRes] = React.useState<status>({
    status: 0,
  });

  return (
    <div className={style.main}>
      <Status response={res} />
      {imgs
        ? imgs.map((element) => (
            <div className={style.img} key={element.id}>
              {deleteImg ? (
                <div className={style.silverBackground}>
                  <button
                    className={style.button}
                    onClick={() => deleteImg(element.id)}
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
