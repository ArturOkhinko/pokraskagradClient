import React from "react";
import style from "../PowderPoint/PowderPoint.module.css";
import powder from "../../img/powder.jpg";
import { useSelector } from "react-redux";
import { PowderPointAdmin } from "../PowderPointAdmin/PowderPointAdmin";
import { SliderImg } from "../SliderImg/SliderImg";
import { serverService } from "../../services/serverService";

type Items = {
  id: string;
  img: string;
};
export const PowderPoint = () => {
  const [items, setItems] = React.useState<Items[]>([]);
  const color = useSelector(
    (state: ColorReducerType) => state.colorTheme.color
  );

  const getInfo = async () => {
    const images = await serverService.getInfoPowderPoint();
    setItems(images);
  };

  React.useLayoutEffect(() => {
    getInfo();
  }, []);
  return (
    <div className={style.main}>
      <div className={style.text}>
        <h4>
          <i>От 280 ₽/1М²</i>
        </h4>
      </div>
      <div className={style.img}>
        <img src={powder} />
        <p style={{ color: color }} className={style.description}>
          Расчет цены делают наши мастера на основании размеров обрабатываемой
          или окрашиваемой площади, степени загрязненности, глубины коррозии
          (если такая имеется), количества расходных материалов на пескоструй
          или краску и т.д. За более детальной информацией обращайтесь к нашим
          консультантам в личные сообщения группы и по указанному номеру
          телефона✅
        </p>
      </div>
      <p className={style.exemple} style={{ color: color }}>
        Сдесь представленны примеры наших работ
      </p>
      <SliderImg items={items} />
    </div>
  );
};
