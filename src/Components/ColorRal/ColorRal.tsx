import React, { FC } from "react";
import style from "../ColorRal/ColorRal.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { colorJSON } from "../../Data/ColorJSON";
import { Loader } from "../Loader/Loader";

interface ColorRalProps {
  sortedKind: string;
  valueInput: string;
  setModalWindow: (isOpen: boolean) => void;
}
export const ColorRal: FC<ColorRalProps> = ({
  sortedKind,
  valueInput,
  setModalWindow,
}) => {
  const [colors, setColors] = React.useState<ColorJSONType[]>([]);
  const [isLoader, setIsLoader] = React.useState<boolean>(false);
  const color = useSelector(
    (state: ColorReducerType) => state.colorTheme.color
  );
  React.useEffect(() => {
    setColors(colorJSON);
  }, []);

  const searchAndSorted: ColorJSONType[] = React.useMemo(() => {
    console.log("СИАРЧЬ ЭНД СОРТЕД");
    if (valueInput) {
      if (sortedKind === "RGB") {
        return colors.filter((element) => {
          if (element.RGB) {
            return element.RGB.includes(valueInput);
          }
          return false;
        });
      }

      if (sortedKind === "RAL") {
        return colors.filter((element) => {
          if (element.RAL) {
            return element.RAL.toLowerCase().includes(valueInput.toLowerCase());
          }
          return false;
        });
      }

      if (sortedKind === "HTML") {
        return colors.filter((element) => {
          if (element.HTML) {
            return element.HTML.toLowerCase().includes(
              valueInput.toLowerCase()
            );
          }
          return false;
        });
      }
      if (sortedKind === "") {
        setModalWindow(true);
      }

      return colors;
    }

    return colors;
  }, [valueInput, sortedKind, colors]);
  React.useEffect(() => {
    if (searchAndSorted) {
      setIsLoader(false);
    }
    if (!searchAndSorted) {
      setIsLoader(true);
    }
  }, [searchAndSorted]);
  return (
    <>
      {searchAndSorted[0] ? (
        searchAndSorted.map((element, index) =>
          element.RGB ? (
            <div className={style.colorRal}>
              <div
                className={style.color}
                style={{ backgroundColor: `rgb(${element.RGB})` }}
              ></div>
              <div className={style.text} style={{ color: color }}>
                <p>{element.RAL}</p>
                <p>RGB {element.RGB}</p>
                <p>HEX {element.HTML}</p>
              </div>
            </div>
          ) : null
        )
      ) : valueInput !== "" ? (
        <div className={style.notHaveColor}>
          <p>
            Такой цвет ({valueInput}) скорее всего не существует. Свяжитесь с
            нами, чтобы уточнить этот вопрос.
          </p>
          <div className={style.social}>
            <p>8 (987) 444 07 63</p>
          </div>
        </div>
      ) : null}
      <Loader isLoader={isLoader} />
    </>
  );
};
