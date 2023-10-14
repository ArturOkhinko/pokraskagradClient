import React from "react";
import style from "./info.Style/info.module.css";
import { Description } from "../Description/Description";
import { FC } from "react";
import { ModalWindowMap } from "../ModalWindowMap/ModalWindowMap";
import { useSelector } from "react-redux";
import { serverService } from "../../services/serverService";
import { DescriptionAboutCompany } from "../DescriptionAboutCompany/DescriptionAboutCompany";

type InfoType = {
  header: string;
  description: string;
  img?: string[];
  id: string;
};
export const Info: FC = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [news, setNews] = React.useState<News[]>([]);

  const getInfoDescription = async () => {
    const info: InfoType[] = await serverService.getInfoDescriptionPost();
    setNews(
      info.map((element) => {
        return {
          ...element,
          isOpen: false,
          actionName: "Развернуть",
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
