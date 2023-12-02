import React from "react";
import style from "./SandblastAdmin.module.css";
import { serverService } from "../../services/serverService";
import { ServiceMain } from "../ServiceMain/ServiceMain";
import { adminService } from "../../services/adminServices";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/reducers/accauntReducer";
import { Status } from "../Status/Status";
import { ModalWindowSandblast } from "../ModalWindowSandblast/ModalWindowSandblast";

type SandblastInfo = {
  id: string;
  name: string;
  price: number;
};

type OperationInfo = {
  status: number;
  message: string;
  id: string;
};
export const SandblastAdmin = () => {
  const [price, setPrice] = React.useState<SandblastJSONType[]>([]);
  const [name, setName] = React.useState<string>("");
  const [priceInput, setPriceInput] = React.useState<string>("");
  const [res, setRes] = React.useState<{ status: number; message: string }>({
    status: 0,
    message: "",
  });
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const getInfo = async () => {
    const sandblastInfo: SandblastInfo[] =
      await serverService.getInfoSandblast();
    setPrice(
      sandblastInfo.map((e) => {
        return {
          id: e.id,
          nameSandblast: e.name,
          priceSandblast: e.price,
        };
      })
    );
  };

  const dispatch = useDispatch();
  const deleteItem = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const id = e.currentTarget.id;
    const operationInfo = await adminService.deleteInfoSandblast(
      { id },
      userData.accessToken
    );
    if (operationInfo.status === 400) {
      const userData = await adminService.refresh();
      dispatch(login(userData));
      if (userData.role === "admin") {
        const operationInfo = await adminService.deleteInfoSandblast(
          { id },
          userData.accessToken
        );
        console.log(operationInfo);
        setRes({
          status: operationInfo.status,
          message: operationInfo.message,
        });
        setTimeout(() => setRes({ status: 0, message: "" }));
        setPrice(price.filter((element) => element.id !== id));
      }

      if (userData.role !== "admin") {
        setRes({
          status: 400,
          message: "У вас нет таких прав",
        });
        setTimeout(() => setRes({ status: 0, message: "" }));
      }
    }
    if (operationInfo.status == 200) {
      setRes({
        status: operationInfo.status,
        message: operationInfo.message,
      });
      setTimeout(() => setRes({ status: 0, message: "" }), 1000);
    }
    setPrice(price.filter((element) => element.id !== id));
  };

  React.useEffect(() => {
    getInfo();
  }, []);

  const userData = useSelector((state: AccLogReducerType) => state.accLog.user);

  const insertSandblast = async () => {
    if (name && priceInput && Number(priceInput)) {
      const operationInfo: OperationInfo =
        await adminService.insertInfoSandblast(
          { name, price: Number(priceInput) },
          userData.accessToken
        );
      if (operationInfo.status === 400) {
        const userData = await adminService.refresh();
        dispatch(login(userData));
        if (userData.role === "admin") {
          const operationInfo: OperationInfo =
            await adminService.insertInfoSandblast(
              { name, price: Number(priceInput) },
              userData.accessToken
            );
          dispatch(login(userData));
          setRes({
            status: operationInfo.status,
            message: operationInfo.message,
          });
          setTimeout(() => setRes({ status: 0, message: "" }), 1000);
          setPrice([
            ...price,
            {
              id: operationInfo.id,
              priceSandblast: Number(priceInput),
              nameSandblast: name,
            },
          ]);
        }
        setPriceInput("");
        setName("");
      }
      if (operationInfo.status === 200) {
        setRes({
          status: operationInfo.status,
          message: operationInfo.message,
        });
        setTimeout(() => setRes({ status: 0, message: "" }), 1000);
        setPrice([
          ...price,
          {
            id: operationInfo.id,
            priceSandblast: Number(priceInput),
            nameSandblast: name,
          },
        ]);
        setPriceInput("");
        setName("");
      }
    }
    if (!name && !priceInput) {
      setRes({ status: 400, message: "Не все поля заполнены" });
      setTimeout(() => setRes({ status: 0, message: "" }), 1000);
    }
    if (!Number(priceInput)) {
      setRes({ status: 400, message: "Введите число в поле для цены" });
      setTimeout(() => setRes({ status: 0, message: "" }), 2000);
      setPriceInput("");
    }
  };

  return (
    <div className={style.main}>
      <Status responce={res} />
      <ModalWindowSandblast
        priceInput={priceInput}
        setPriceInput={setPriceInput}
        name={name}
        setName={setName}
        insertSandblast={insertSandblast}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <button className={style.pushService} onClick={() => setIsOpen(true)}>
        Добавить услугу
      </button>
      <div className={style.serviceMain}>
        <ServiceMain price={price} deleteItem={deleteItem} />
      </div>
    </div>
  );
};
