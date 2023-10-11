import React from "react";
import style from "./SupportAdmin.module.css";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverService } from "../../services/serverService";
import { pushInfo } from "../../store/reducers/infoWheelsReducer";
import { Price } from "../Price/Price";
import { AdminModalWindow } from "../AdminModalWindow/AdminModalWindow";
import { Status } from "../Status/Status";
import { adminService } from "../../services/adminServices";
import { login } from "../../store/reducers/accauntReducer";

type Supports = {
  id: string;
  defaultValue: string;
  name: string;
  price: number;
  text: string;
  img: string;
};
type PriceInfo = {
  defaultValueInput: string;
  priceInput: string;
  id: string;
  text: string;
  name: string;
};

type PostInfo = {
  defaultValue: string;
  price: number;
  accessToken: string;
  text: string;
  name: string;
};
export const SupportAdmin: FC = () => {
  const [price, setPrice] = React.useState<SupportsType[]>();
  const [priceInfo, setPriceInfo] = React.useState<PriceInfo>({
    defaultValueInput: "",
    priceInput: "",
    id: "",
    text: "",
    name: "",
  });
  const [res, setRes] = React.useState<{ status: number; message: string }>({
    status: 0,
    message: "",
  });
  const [loader, setLoader] = React.useState<boolean>(true);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
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
      setLoader(false);
    }
  };

  React.useEffect(() => {
    getInfo();
  }, []);

  const userData = useSelector((state: AccLogReducerType) => state.accLog.user);
  const savePostInfo = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const supportsInfo = {
      id: priceInfo.id,
      defaultValue: priceInfo.defaultValueInput,
      price: Number(priceInfo.priceInput),
      text: priceInfo.text,
      name: priceInfo.name,
    };
    const operationInfo = await adminService.updateInfoSupports(
      supportsInfo,
      userData.accessToken
    );
    if (operationInfo.status === 400) {
      const userData = await adminService.refresh();
      if (userData.role === "admin") {
        dispatch(login(userData));
        const operationInfo = await adminService.updateInfoSupports(
          supportsInfo,
          userData.accessToken
        );
        setRes({
          status: operationInfo.status,
          message: operationInfo.message,
        });
        setTimeout(() => setRes({ status: 0, message: "" }), 1000);
      }
    }
    if (operationInfo.status === 200) {
      setRes({ status: operationInfo.status, message: operationInfo.message });
      setTimeout(() => setRes({ status: 0, message: "" }), 1000);
    }
  };
  const openWindow = () => {
    setIsOpen(true);
  };
  return (
    <div>
      {price && !loader ? (
        <div>
          <Status responce={res} />
          <Price
            price={price}
            setPrice={setPrice}
            priceInfo={priceInfo}
            setPriceInfo={setPriceInfo}
            isOpen={isOpen}
            openWindow={openWindow}
          />
          <AdminModalWindow
            price={[price.find((e) => e.id === priceInfo.id)!]}
            priceInfo={priceInfo!}
            setPriceInfo={setPriceInfo}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            savePostInfo={savePostInfo}
          />
        </div>
      ) : (
        <p>Загрузка</p>
      )}
    </div>
  );
};
