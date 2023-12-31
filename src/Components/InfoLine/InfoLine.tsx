import React from "react";
import style from "./infoLine.module.css";
import { motion } from "framer-motion";
import { FC } from "react";
import { Line } from "../Line/Line";
import { useSelector } from "react-redux";
import { ServerModule } from "../../modules/serverModule";
import { mainDescriptionState } from "../../models/states/mainDescriptionState";

type InfoOfLineType = {
  img: string[];
  header: string;
  description: string;
  id: string;
};

export const InfoLine: FC = () => {
  const [infoOfLine, setInfoOfLine] =
    React.useState<DescriptionPostResponce[]>();

  const getInfo = async () => {
    const data = await ServerModule.getInfoMainDescription();
    setInfoOfLine(data.data);
  };
  React.useEffect(() => {
    getInfo();
  }, []);

  const textAnimation: AnimationType = {
    hidden: {
      y: 40,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  const color = useSelector(
    (state: ColorReducerType) => state.colorTheme.color
  );

  return (
    <div className={style.main}>
      {infoOfLine
        ? infoOfLine.map((element) => (
            <motion.div
              className={style.infoLine}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.4 }}
              key={element.id}
            >
              <motion.div
                className={style.companyDescription}
                style={{ color: color }}
              >
                <h2>
                  <motion.i variants={textAnimation}>{element.header}</motion.i>
                </h2>
                <motion.i variants={textAnimation}>
                  {element.description}
                </motion.i>
              </motion.div>
              <motion.div className={style.line} variants={textAnimation}>
                <Line images={element.img.split(",")} />
              </motion.div>
            </motion.div>
          ))
        : null}
    </div>
  );
};
