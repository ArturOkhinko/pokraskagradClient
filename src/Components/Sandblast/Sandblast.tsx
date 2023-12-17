import React from "react";
import style from "../Sandblast/Sandblast.module.css";
import { ServiceMain } from "../ServiceMain/ServiceMain";
import { Loader } from "../Loader/Loader";
import { SandblastResponse } from "../../models/responce/SandblastResponse";
import { ServerModule } from "../../modules/serverModule";

export default function Sandblast() {
  const [price, setPrice] = React.useState<SandblastResponse[]>([]);
  const [isLoader, setIsLoader] = React.useState<boolean>(true);

  const getInfo = async () => {
    const response = await ServerModule.getInfoSandblast();
    setPrice(response.data);
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
