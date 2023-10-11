import React, { FC } from "react";
import style from "../Supports/Supports.module.css";
import { Price } from "../Price/Price";
import { serverService } from "../../services/serverService";
import { useDispatch } from "react-redux";
import { pushInfo } from "../../store/reducers/infoWheelsReducer";

type Supports = {
  id: string;
  defaultValue: string;
  name: string;
  price: number;
  text: string;
  img: string;
};
export const Supports: FC = () => {
  const [price, setPrice] = React.useState<SupportsType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const dispatch = useDispatch();

  const getInfo = async () => {
    const info: Supports[] = await serverService.getInfoSupports();
    const priceInfo = info.map((element) => {
      const img = element.img.split(",");
      return {
        price: element.price,
        name: element.name,
        id: element.id,
        text: element.text,
        initialPriceCount: Number(element.defaultValue),
        img: img.length === 1 ? img[0] : img,
      };
    });
    if (priceInfo) {
      dispatch(pushInfo(priceInfo));
      setPrice(priceInfo);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className={style.main}>
      <div className={style.topLine}>
        <p></p>
      </div>
      <div className={style.support}>
        {price && !loading ? (
          <Price price={price} setPrice={setPrice} />
        ) : (
          <p>Загрузка</p>
        )}
      </div>
    </div>
  );
};
