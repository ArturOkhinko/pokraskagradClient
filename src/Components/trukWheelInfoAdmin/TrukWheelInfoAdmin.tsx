import React, { useState } from "react";
import { Status } from "../Status/Status";
import { WheelInfoResponse } from "../../models/responce/WheelInfoResponse";
import { ServerModule } from "../../modules/serverModule";
import { wheelAdminWindowState } from "../../models/states/wheelAdminWindowState";
import { Price } from "../Price/Price";
import { WheelAdminModalWindow } from "../WheelAdminModalWindow/WheelAdminModalWindow";
import { status } from "../../models/status";
import { AdminModule } from "../../modules/adminModule";

export const TruckWheelInfo = () => {
  const [trucks, setTrucks] = React.useState<WheelInfoResponse[]>([]);
  const [adminWindowParams, setAdminWindowParams] =
    useState<wheelAdminWindowState>();
  const [res, setRes] = React.useState<status>({ status: 0 });

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

  const getInfo = async () => {
    const response = await ServerModule.getInfoTruckWheel();
    setTrucks(
      response.data.sort((a, b) => Number(b.radius) - Number(a.radius))
    );
  };
  const save = async () => {
    if (!adminWindowParams) {
      return;
    }
    const response = await AdminModule.updateTruckWheelInfo(
      adminWindowParams.initialPriceCount,
      adminWindowParams.price,
      adminWindowParams.id
    );

    setTrucks(
      trucks.map((item) => {
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

  React.useEffect(() => {
    getInfo();
  }, []);

  return (
    <div>
      <Status response={res} />
      <Price
        items={trucks}
        setItems={setTrucks}
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
