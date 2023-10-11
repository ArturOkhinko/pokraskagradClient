import React from "react";
import style from "../Sandblast/Sandblast.module.css";
import { useSelector } from "react-redux";
import { ServiceMain } from "../ServiceMain/ServiceMain";
import { serverService } from "../../services/serverService";
import { Loader } from "../Loader/Loader";

type SandblastInfo = {
  id: string;
  name: string;
  price: number;
};

export default function Sandblast() {
  const [price, setPrice] = React.useState<SandblastJSONType[]>([]);
  const [isLoader, setIsLoader] = React.useState<boolean>(true);
  const getInfo = async () => {
    const sandblastInfo: SandblastInfo[] =
      await serverService.getInfoSandblast();
    console.log(sandblastInfo);
    setPrice(
      sandblastInfo.map((e) => {
        return {
          id: e.id,
          nameSandblast: e.name,
          priceSandblast: e.price,
        };
      })
    );
    setIsLoader(false);
  };

  React.useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className={style.main}>
      <div className={style.mainPrice}>
        <div className={style.serviceSandblast}>
          <Loader isLoader={isLoader} />
          <ServiceMain price={price} />
        </div>
      </div>
    </div>
  );
}
