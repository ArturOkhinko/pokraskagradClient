import React from "react";
import { Price } from "../Price/Price";
import { adminService } from "../../services/adminServices";
import { useDispatch, useSelector } from "react-redux";
import style from "./WheelInfoAdmin.module.css";
import { Status } from "../Status/Status";
import { AdminModalWindow } from "../AdminModalWindow/AdminModalWindow";
import { serverService } from "../../services/serverService";
import { wheelInfoImg } from "../../Data/WheelInfoImg";
import { pushInfo } from "../../store/reducers/infoWheelsReducer";
import { login } from "../../store/reducers/accauntReducer";

type Res = {
  status: number;
  message: string;
};
type WheelInfoElement = {
  defaultValue: number;
  price: number;
  radius?: string;
  text: string;
  name: string;
  id: string;
};

type WheelInfo = {
  status: number;
  message: string;
  info?: WheelInfoElement[];
};
type PostInfo = {
  defaultValue: number;
  price: number;
  radius?: string;
  accessToken: string;
  text: string;
  wheelName: string;
};
type PriceInfo = {
  defaultValueInput: string;
  priceInput: string;
  id: string;
  radius?: string;
  text: string;
  name: string;
};

type WheelInfoOfServer = {
  defaultValue: number;
  id: string;
  name: string;
  price: number;
  radius: string;
  text: string;
};

export const WheelInfoAdmin = () => {
  const [price, setPrice] = React.useState<WheelPriceJSONType[]>([]);
  const [priceInfo, setPriceInfo] = React.useState<PriceInfo>({
    defaultValueInput: "",
    priceInput: "",
    id: "",
    radius: "",
    text: "",
    name: "",
  });
  const [postInfo, setPostInfo] = React.useState<PostInfo>();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [res, setRes] = React.useState<Res>({ status: 0, message: "" });

  const userData = useSelector((state: AccLogReducerType) => state.accLog.user);
  const dispatch = useDispatch();
  const savePostInfo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const postInfo = {
      defaultValue: Number(priceInfo.defaultValueInput),
      price: Number(priceInfo.priceInput),
      radius: priceInfo.radius,
      accessToken: userData.accessToken,
      text: priceInfo.text,
      wheelName: priceInfo.name,
    };
    setPostInfo(postInfo);
  };

  React.useEffect(() => {
    const postWheel = async () => {
      const wheelInfo: WheelInfo = await adminService.wheelInfo(postInfo!);
      if (wheelInfo.status === 200 && wheelInfo.info) {
        setRes({ status: wheelInfo.status, message: wheelInfo.message });
        setTimeout(() => setRes({ status: 0, message: "" }), 1000);
        const wheel = wheelInfo.info.map(
          (element: WheelInfoElement, index: number) => {
            return {
              ...price[index],
              price: element.price,
              model: element.radius,
              name: element.name,
              id: element.id,
              text: element.text,
              initialPriceCount: element.defaultValue,
            };
          }
        );
        setPrice(wheel);
        dispatch(pushInfo(wheel));
        return;
      }
      if (wheelInfo.status === 400) {
        const info = await adminService.refresh();
        if (info.status) {
          setRes({ status: info.status, message: info.message });
          setTimeout(() => setRes({ status: 0, message: "" }), 1000);
          return;
        }
        dispatch(login(info));
        const responce = await adminService.wheelInfo({
          ...postInfo!,
          accessToken: info.accessToken,
        });

        const priceInfo = responce.info.map(
          (element: WheelInfoElement, index: number) => {
            return {
              ...price[index],
              price: element.price,
              model: element.radius,
              name: element.name,
              id: element.id,
              text: element.text,
              initialPriceCount: element.defaultValue,
            };
          }
        );
        setPrice(priceInfo);
        dispatch(pushInfo(priceInfo));
        setRes({ status: responce.status, message: responce.message });
        setTimeout(() => setRes({ status: 0, message: "" }), 1000);
        return;
      }
    };
    if (postInfo) {
      postWheel();
    }
  }, [postInfo]);

  React.useEffect(() => {
    const getWheelInfo = async () => {
      const wheelInfo: WheelInfoOfServer[] = await serverService.getInfoWheel();
      const price: WheelPriceJSONType[] = wheelInfo.map(
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
      setPrice(price);
      dispatch(pushInfo(price));
    };
    getWheelInfo();
  }, []);

  return (
    <div className={style.main}>
      <div className={style.status}>
        <Status responce={res} />
      </div>
      <p></p>
      <Price
        price={price!}
        setPrice={setPrice}
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
    </div>
  );
};
