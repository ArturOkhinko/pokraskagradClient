import React, { useState } from "react";
import { Price } from "../Price/Price";
import { useDispatch, useSelector } from "react-redux";
import style from "./WheelInfoAdmin.module.css";
import { Status } from "../Status/Status";
import { pushInfo } from "../../store/reducers/infoWheelsReducer";
import { ServerModule } from "../../modules/serverModule";
import { WheelInfoResponse } from "../../models/responce/WheelInfoResponse";
import { wheelAdminWindowState } from "../../models/states/wheelAdminWindowState";
import { WheelAdminModalWindow } from "../WheelAdminModalWindow/WheelAdminModalWindow";
import { status } from "../../models/status";
import { AdminModule } from "../../modules/adminModule";

export const WheelInfoAdmin = () => {
  const [items, setItems] = useState<WheelInfoResponse[]>([]);
  const [res, setRes] = useState<status>({ status: 0 });
  const [adminWindowParams, setAdminWindowParams] =
    useState<wheelAdminWindowState>();
  const dispatch = useDispatch();

  const openModalWindow = (
    id: string,
    price: number,
    initialPriceCount: number,
    radius: string
  ) => {
    setAdminWindowParams({
      isOpen: true,
      id,
      price,
      initialPriceCount,
      radius,
    });
  };

  React.useEffect(() => {
    const getWheelInfo = async () => {
      const wheelInfo = await ServerModule.getInfoWheel();
      setItems(wheelInfo.data);
      dispatch(pushInfo(wheelInfo.data));
    };
    getWheelInfo();
  }, []);

  const save = async () => {
    if (!adminWindowParams) {
      return;
    }
    const response = await AdminModule.updateWheelInfo(
      adminWindowParams.initialPriceCount,
      adminWindowParams.price,
      adminWindowParams.id
    );

    setItems(
      items.map((item) => {
        if (item.id === adminWindowParams.id) {
          return {
            ...item,
            price: adminWindowParams.price,
            initialPriceCount: adminWindowParams.initialPriceCount,
          };
        }
        return item;
      })
    );
    setRes({ status: response.status });
    setTimeout(() => setRes({ status: 0 }), 1000);
  };

  return (
    <div className={style.main}>
      <div className={style.status}>
        <Status response={res} />
      </div>
      <Price
        items={items}
        setItems={setItems}
        openAdminWindow={openModalWindow}
      />
      <WheelAdminModalWindow
        setAdminWindowParams={setAdminWindowParams}
        adminWindowParams={adminWindowParams}
        setRes={setRes}
        save={save}
      />
    </div>
  );
};
