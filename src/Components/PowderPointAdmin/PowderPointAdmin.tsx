import React from "react";
import style from "./PowderPointAdmin.module.css";
import { useDispatch, useSelector } from "react-redux";
import { FC } from "react";
import { Status } from "../Status/Status";
import { SliderImg } from "../SliderImg/SliderImg";
import { PowderPointImgsResponse } from "../../models/responce/PowderPointImgsResponse";
import { ServerModule } from "../../modules/serverModule";
import { AdminModule } from "../../modules/adminModule";
import { status } from "../../models/status";

export const PowderPointAdmin: FC = () => {
  const [imgs, setImgs] = React.useState<PowderPointImgsResponse[]>([]);
  const [imgFromAdmin, setImgFromAdmin] = React.useState<string>("");
  const [res, setRes] = React.useState<status>({
    status: 0,
  });
  const color = useSelector(
    (state: ColorReducerType) => state.colorTheme.color
  );
  const getInfo = async () => {
    const response = await ServerModule.getInfoPowderPointImgs();
    console.log(response);
    setImgs(response.data);
  };
  React.useLayoutEffect(() => {
    getInfo();
  }, []);

  const save = async () => {
    if (!imgFromAdmin) {
      setRes({ status: 400, message: "Поле незаполнено" });
      setTimeout(() => setRes({ status: 0, message: "" }), 1000);
      return;
    }
    const response = await AdminModule.addImgPowderPoint(imgFromAdmin);
    setImgs([...imgs, { id: response.data.id, img: imgFromAdmin }]);
    setRes({ status: response.status });
    setTimeout(() => setRes({ status: 0 }), 1000);
  };

  const deleteImg = async (id: string) => {
    const response = await AdminModule.removeImgPowderPoint(id);
    setRes({ status: response.status });
    setTimeout(() => setRes({ status: 0, message: "" }), 1000);
    setImgs!(imgs.filter((element) => element.id !== id));
  };

  return (
    <>
      <SliderImg imgs={imgs} deleteImg={deleteImg} />
      <div className={style.main}>
        <Status response={res} />
        <input
          style={{ border: `1px solid ${color}` }}
          value={imgFromAdmin}
          onChange={(e) => setImgFromAdmin(e.target.value)}
          placeholder="Ссылка на картинку"
        />
        <button onClick={save} className={style.saveButton}>
          Добавить
        </button>
      </div>
    </>
  );
};
