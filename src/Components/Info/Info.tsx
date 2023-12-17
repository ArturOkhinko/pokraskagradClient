import React from "react";
import style from "./info.Style/info.module.css";
import { Description } from "../Description/Description";
import { FC } from "react";
import { ModalWindowMap } from "../ModalWindowMap/ModalWindowMap";
import { DescriptionAboutCompany } from "../DescriptionAboutCompany/DescriptionAboutCompany";
import { ServerModule } from "../../modules/serverModule";
import { newsDescriptionState } from "../../models/states/newsDescriptionState";

export const Info: FC = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [news, setNews] = React.useState<newsDescriptionState[]>();

  const getInfoDescription = async () => {
    const info = await ServerModule.getInfoPostDescription();
    setNews(
      info.data.map((element) => {
        return {
          ...element,
          isOpen: false,
          actionName: "Развернуть",
          img: element.img.split(","),
        };
      })
    );
  };

  React.useEffect(() => {
    getInfoDescription();
  }, []);

  return (
    <div className={style.main}>
      <DescriptionAboutCompany setIsOpen={setIsOpen} />
      <div className={style.modalWindow}>
        <ModalWindowMap close={setIsOpen} isOpen={isOpen} />
      </div>
      <div className={style.description}>
        <Description descriptionsProps={news} setDescriptions={setNews} />
      </div>
    </div>
  );
};
