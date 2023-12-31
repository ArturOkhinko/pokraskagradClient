import React from "react";
import style from "./TruckService.module.css";
import { Price } from "../Price/Price";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { truckWheelInfoImg } from "../../Data/TruckWheelInfoImg";
import { pushInfo } from "../../store/reducers/infoWheelsReducer";
import { WheelInfoResponse } from "../../models/responce/WheelInfoResponse";
import { ServerModule } from "../../modules/serverModule";

type InfoAboutPrice = {
  defaultValue: string;
  id: string;
  name: string;
  price: number;
  radius: string;
  text: string;
};
export const TrukService = () => {
  const [price, setPrice] = React.useState<WheelInfoResponse[]>([]);

  const getInfo = async () => {
    const response = await ServerModule.getInfoTruckWheel();
    setPrice(response.data);
  };

  React.useEffect(() => {
    getInfo();
  }, []);

  const color = useSelector(
    (state: ColorReducerType) => state.colorTheme.color
  );
  return (
    <div className={style.main}>
      <p style={{ color: color }}>
        Сдесь указана общая{" "}
        <a className={style.underlineText}>цена за пескостуй и покраску</a>{" "}
        дисков, так как нет смысла красить их не отпескоструев. Если вас
        интерисует,{" "}
        <a className={style.noPoint}>только пескоструй, без покраски,</a> тогда
        перейдите в{" "}
        <Link to="/serviceSandblast" className={style.link}>
          каталог цен на пескоструй
        </Link>
      </p>
      <Price items={price} setItems={setPrice} />
    </div>
  );
};
