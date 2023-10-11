import React from "react";
import style from "../Services/Services.module.css";
import { useSelector } from "react-redux";
export default function Services({ flexStyle, price, link, name, img }) {
  const color = useSelector((state) => state.colorTheme.color);
  return (
    <div className={style.main}>
      <div
        className={style.mainDescription}
        style={{ alignSelf: flexStyle, border: `1px solid ${color}` }}
      >
        <div className={style.img}>
          {img.map((element, index) => (
            <img
              src={element}
              key={index}
              style={{ border: `4px solid ${color}` }}
            />
          ))}
        </div>
        <div className={style.description} style={{ color: color }}>
          <p>{name}</p>
          <div className={style.price}>{price}</div>
          <div className={style.catalog}>Посмотреть в каталоге</div>
        </div>
      </div>
    </div>
  );
}
