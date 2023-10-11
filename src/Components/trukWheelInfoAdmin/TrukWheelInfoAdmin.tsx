import React from "react";
import style from "./TrukWheelInfoAdmin.module.css";
import { Price } from "../Price/Price";
import { serverService } from "../../services/serverService";
import { truckWheelInfoImg } from "../../Data/TruckWheelInfoImg";
import { useDispatch, useSelector } from "react-redux";
import { pushInfo } from "../../store/reducers/infoWheelsReducer";
import { AdminModalWindow } from "../AdminModalWindow/AdminModalWindow";
import { adminService } from "../../services/adminServices";
import { Status } from "../Status/Status";
import { login, token } from "../../store/reducers/accauntReducer";

type WheelInfoOfServer = {
  defaultValue: number;
  id: string;
  name: string;
  price: number;
  radius: string;
  text: string;
};

type PriceInfo = {
  defaultValueInput: string;
  priceInput: string;
  id: string;
  radius?: string;
  text: string;
  name: string;
};

export const TruckWheelInfo = () => {
  const [price, setPrice] = React.useState<WheelPriceJSONType[]>();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [priceInfo, setPriceInfo] = React.useState<PriceInfo>({
    defaultValueInput: "",
    priceInput: "",
    id: "",
    radius: "",
    text: "",
    name: "",
  });
  const [res, setRes] = React.useState<{ status: number; message: string }>({
    status: 0,
    message: "",
  });
  const dispatch = useDispatch();
  const userInfo = useSelector((state: AccLogReducerType) => state.accLog.user);

  const getInfo = async () => {
    const info = await serverService.getInfoTruckWheels();
    const price: WheelPriceJSONType[] = info.map(
      (element: WheelInfoOfServer) => {
        return {
          id: element.id,
          price: element.price,
          model: element.radius,
          name: element.name,
          text: element.text,
          initialPriceCount: Number(element.defaultValue),
          img: truckWheelInfoImg[element.radius],
        };
      }
    );
    setPrice(price);
    dispatch(pushInfo(price));
  };

  const savePostInfo = async () => {
    const updateInfo = {
      id: priceInfo.id,
      defaultValue: priceInfo.defaultValueInput,
      radius: priceInfo.radius,
      price: priceInfo.priceInput,
      text: priceInfo.text,
      wheelName: priceInfo.name,
    };

    const operationInfo = await adminService.updateInfoTruckWheels(
      updateInfo,
      userInfo.accessToken
    );

    if (operationInfo.status === 200) {
      setRes({ status: operationInfo.status, message: operationInfo.message });
      setTimeout(() => setRes({ status: 0, message: "" }), 1000);
    }
    if (operationInfo.status === 400) {
      const refresh = async () => {
        const userData = await adminService.refresh();
        const operationInfo = await adminService.updateInfoTruckWheels(
          updateInfo,
          userData.accessToken
        );
        setRes({
          status: operationInfo.status,
          message: operationInfo.message,
        });
        dispatch(login(userData));
        setTimeout(() => setRes({ status: 0, message: "" }), 1000);
      };
      refresh();
      return;
    }
    console.log(operationInfo);
  };

  React.useEffect(() => {
    getInfo();
  }, []);

  return (
    <div>
      <Status responce={res} />
      {price ? (
        <>
          <Price
            price={price}
            setPrice={setPrice}
            isOpen={isOpen}
            openWindow={setIsOpen}
            priceInfo={priceInfo}
            setPriceInfo={setPriceInfo}
          />
          <div className={style.adminModalWindow}>
            <AdminModalWindow
              price={[
                price.find((e: WheelPriceJSONType) => e.id === priceInfo.id)!,
              ]}
              savePostInfo={savePostInfo}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              priceInfo={priceInfo}
              setPriceInfo={setPriceInfo}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};
