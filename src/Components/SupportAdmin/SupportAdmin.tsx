import React from "react";
import style from "./SupportAdmin.module.css";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pushInfo } from "../../store/reducers/infoWheelsReducer";
import { Status } from "../Status/Status";
import { ServerModule } from "../../modules/serverModule";
import { SupportsResponse } from "../../models/responce/SupportsInfoResponse";
import { status } from "../../models/status";

export const SupportAdmin: FC = () => {
  const [price, setPrice] = React.useState<SupportsResponse[]>();
  const [res, setRes] = React.useState<status>({ status: 0 });
  const [loader, setLoader] = React.useState<boolean>(true);

  const getInfoAboutSupports = async () => {
    const response = await ServerModule.getInfoSupports();
    setPrice(response.data);
  };
  React.useEffect(() => {
    getInfoAboutSupports();
  }, []);

  return (
    <div>
      {price && !loader ? (
        <div>
          <Status response={res} />
        </div>
      ) : (
        <p>Загрузка</p>
      )}
    </div>
  );
};
