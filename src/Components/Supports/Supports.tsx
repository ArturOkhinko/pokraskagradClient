import React, { FC } from "react";
import style from "../Supports/Supports.module.css";
import { ServerModule } from "../../modules/serverModule";
import { SupportsResponse } from "../../models/responce/SupportsInfoResponse";

type Supports = {
  id: string;
  defaultValue: string;
  name: string;
  price: number;
  text: string;
  img: string;
};
export const Supports: FC = () => {
  const [price, setPrice] = React.useState<SupportsResponse[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const getInfo = async () => {
    const response = await ServerModule.getInfoSupports();
    setPrice(response.data);
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
        {price && !isLoading ? <p></p> : <p>Загрузка</p>}
      </div>
    </div>
  );
};
