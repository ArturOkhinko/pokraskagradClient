import React, { useEffect } from "react";
import style from "./SandblastAdmin.module.css";
import { ServiceMain } from "../ServiceMain/ServiceMain";
import { Status } from "../Status/Status";
import { ModalWindowSandblast } from "../ModalWindowSandblast/ModalWindowSandblast";
import { ServerModule } from "../../modules/serverModule";
import { SandblastResponse } from "../../models/responce/SandblastResponse";
import { status } from "../../models/status";
import { AdminModule } from "../../modules/adminModule";

export const SandblastAdmin = () => {
  const [price, setPrice] = React.useState<SandblastResponse[]>([]);
  const [name, setName] = React.useState<string>("");
  const [priceInput, setPriceInput] = React.useState<string>("");
  const [res, setRes] = React.useState<status>({ status: 0 });
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const deleteItem = async (id: string) => {
    const response = await AdminModule.deleteItemCatalog(id);
    setRes({ status: response.status });
    setTimeout(() => setRes({ status: 0 }), 1000);
    setPrice(price.filter((item) => item.id !== id));
  };

  const insertSandblast = async () => {
    if (!name && !priceInput) {
      setRes({ status: 400, message: "Не все поля заполнены" });
      setTimeout(() => setRes({ status: 0, message: "" }), 1000);
      return;
    }
    if (!Number(priceInput)) {
      setRes({ status: 400, message: "Введите число в поле для цены" });
      setTimeout(() => setRes({ status: 0, message: "" }), 2000);
      setPriceInput("");
      return;
    }
    const response = await AdminModule.createNewItemInCatalog(
      Number(priceInput),
      name
    );
    setPrice([
      ...price,
      { id: response.data.id, name, price: Number(priceInput) },
    ]);
    setRes({ status: response.status });
    setTimeout(() => setRes({ status: 0 }), 1000);
  };

  useEffect(() => {
    const getInfo = async () => {
      const response = await ServerModule.getInfoSandblast();
      setPrice(response.data);
    };
    getInfo();
  }, []);
  return (
    <div className={style.main}>
      <Status response={res} />
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
