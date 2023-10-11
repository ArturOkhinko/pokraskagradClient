import React, { FC } from "react";
import style from "./Home.Style/Home.module.css";
import { HelloContent } from "../HelloContent/HelloContent";

import { InfoLine } from "../InfoLine/InfoLine";
export const Home: FC = () => {
  return (
    <div className={style.main}>
      <div className={style.helloContent}>
        <HelloContent />
      </div>
      <div className={style.infoLine}>
        <InfoLine />
      </div>
    </div>
  );
};
