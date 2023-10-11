import React from "react";
import style from "./Description.module.css";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminService } from "../../services/adminServices";
import { login } from "../../store/reducers/accauntReducer";

type DescriptionsProps = {
  header: string;
  description: string;
  img?: string[];
  id: string;
  isOpen: boolean;
  actionName: string;
};
interface Description {
  descriptionsProps: DescriptionsProps[];
  setDescriptions: (props: DescriptionsProps[]) => void;
  removeDescriptionPost?: (e: React.MouseEvent<HTMLElement>) => void;
}

export const Description: FC<Description> = ({
  descriptionsProps,
  setDescriptions,
  removeDescriptionPost,
}) => {
  const open = (e: React.MouseEvent<HTMLElement>) => {
    const id = Number(e.currentTarget.id);
    setDescriptions!(
      descriptionsProps.map((element, index) => {
        if (index === id) {
          if (!element.isOpen) {
            return {
              ...element,
              isOpen: !element.isOpen,
              actionName: "Свернуть",
            };
          }
          if (element.isOpen) {
            return {
              ...element,
              isOpen: !element.isOpen,
              actionName: "Развернуть",
            };
          }
        }
        return element;
      })
    );
  };
  const color = useSelector(
    (state: ColorReducerType) => state.colorTheme.color
  );

  return (
    <div className={style.main}>
      {descriptionsProps.map((element, index) => (
        <div
          className={style.description}
          key={element.id}
          style={{ border: `1px solid ${color}`, color: color }}
        >
          <div className={style.text}>
            <h2 className={style.header}>
              <i>{element.header}</i>
            </h2>
            <button
              className={style.buttonExpend + " " + style.button}
              id={String(index)}
              onClick={open}
            >
              {element.actionName}
            </button>
          </div>
          <div className={element.isOpen ? style.open : style.close}>
            <p className={style.descriptionCompany}>{element.description}</p>
            <div
              className={
                element.img && element.img[0] !== "null"
                  ? style.images
                  : style.none
              }
            >
              {element.img && element.img[0] !== "null"
                ? element.img!.map((el, index) => <img src={el} key={index} />)
                : null}
            </div>
          </div>
          {removeDescriptionPost ? (
            <button
              className={style.adminButton + " " + style.button}
              id={element.id}
              onClick={(e) => removeDescriptionPost!(e)}
            >
              Удалить
            </button>
          ) : null}
        </div>
      ))}
    </div>
  );
};
