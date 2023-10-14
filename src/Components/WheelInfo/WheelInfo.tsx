import React from "react";
import style from "../WheelInfo/WheelInfo.module.css";
import wheels22 from "../../img/Wheel22.jpeg";
import wheels21 from "../../img/Wheel21.jpeg";
import wheels20 from "../../img/Wheel20.jpeg";
import wheels19 from "../../img/Wheel19.jpeg";
import wheels18 from "../../img/Wheel18.jpeg";
import wheels17 from "../../img/Wheel17.jpeg";
import { Price } from "../Price/Price";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { serverService } from "../../services/serverService";
import { wheelInfoImg } from "../../Data/WheelInfoImg";
import { pushInfo } from "../../store/reducers/infoWheelsReducer";

type WheelInfoOfServer = {
  defaultValue: number;
  id: string;
  name: string;
  price: number;
  radius: string;
  text: string;
};

export const WheelInfo: FC = () => {
  const [price, setPrice] = React.useState<WheelPriceJSONType[]>([]);
  const [isLoader, setIsLoader] = React.useState<boolean>(true);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const getPrice = async () => {
      const price: WheelInfoOfServer[] = await serverService.getInfoWheel();
      const wheelPrice: WheelPriceJSONType[] = price.map(
        (element: WheelInfoOfServer) => {
          return {
            id: element.id,
            price: element.price,
            model: element.radius,
            name: element.name,
            text: element.text,
            initialPriceCount: element.defaultValue,
            img: wheelInfoImg[element.radius],
          };
        }
      );
      setPrice(wheelPrice);
      dispatch(pushInfo(wheelPrice));
    };
    getPrice();
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
      <div className={style.wheels}>
        <Price price={price} setPrice={setPrice} />
      </div>
    </div>
  );
};
