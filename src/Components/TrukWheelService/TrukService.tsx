import React from "react";
import style from "./TruckService.module.css";
import { Price } from "../Price/Price";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { serverService } from "../../services/serverService";
import { truckWheelInfoImg } from "../../Data/TruckWheelInfoImg";
import { pushInfo } from "../../store/reducers/infoWheelsReducer";

type InfoAboutPrice = {
  defaultValue: string;
  id: string;
  name: string;
  price: number;
  radius: string;
  text: string;
};
export const TrukService = () => {
  const [price, setPrice] = React.useState<WheelPriceJSONType[]>([]);

  const dispatch = useDispatch();
  const getInfo = async () => {
    const info: InfoAboutPrice[] = await serverService.getInfoTruckWheels();
    const price: WheelPriceJSONType[] = info.map((element) => {
      return {
        id: element.id,
        price: element.price,
        model: element.radius,
        name: element.name,
        text: element.text,
        initialPriceCount: Number(element.defaultValue),
        img: truckWheelInfoImg[element.radius],
      };
    });
    console.log(info);
    setPrice(price);
    dispatch(pushInfo(price));
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
        <a className={style.underlineText}>цена за пескостуй и покрасску</a>{" "}
        дисков, так как нет смысла красить их не отпескоструев. Если вас
        интерисует,{" "}
        <a className={style.noPoint}>только пескоструй, без покраски,</a> тогда
        перейдите в{" "}
        <Link to="/serviceSandblast" className={style.link}>
          каталог цен на пескоструй
        </Link>
      </p>
      <Price price={price} setPrice={setPrice} />
    </div>
  );
};
