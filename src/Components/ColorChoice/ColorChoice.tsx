import React from "react";
import style from "../ColorChoice/ColorChoice.module.css";
import { ColorRal } from "../ColorRal/ColorRal";
import { useSelector } from "react-redux";
import { MySelect } from "../MySelect/MySelect";
import { MyInput } from "../MyInput/MyInput";
import { colorJSON } from "../../Data/ColorJSON";
import { Link } from "react-router-dom";
import { ModalWindow } from "../ModalWindow/ModalWindow";

export default function ColorChoice() {
  const [valueInput, setValueInput] = React.useState<string>("");
  const [modalWindow, setModalWindow] = React.useState<boolean>(false);
  const [sortedKind, setSortedKind] = React.useState("");

  const selectedSort = (event: string) => {
    setSortedKind(event);
  };

  const myInputChange = (e: string) => {
    setValueInput(e);
  };

  const color = useSelector(
    (state: ColorReducerType) => state.colorTheme.color
  );

  React.useEffect(() => {
    if (modalWindow) {
      setValueInput("");
    }
  }, [modalWindow]);
  return (
    <div className={style.colorChoice}>
      {modalWindow ? (
        <ModalWindow
          close={setModalWindow}
          backgroundColor={"rgb(255, 174, 0)"}
          header="Предупреждение"
          description="Сначала выберите вариант сортировки в выпадающем списке. Он находится прямо под строкой поиска."
          color="red"
        />
      ) : null}
      <div className={style.topLine}>
        <p className={style.textInstruction} style={{ color: color }}>
          Выберите формат записи цвета, и введите его в поисковую строку. Сдесь
          представлены все цвета, в которые мы красим детали. Цена за краску
          включена в стоимость услуг. Если хотите узнать скоьлько будет стоить
          покраска, дисков, суппортов или других деталей,
          <Link to="/catalog" className={style.link}>
            перейдите в наш каталог
          </Link>
        </p>
        <div className={style.search}>
          <div className={style.mySelect}>
            <MySelect
              value={sortedKind}
              onChange={selectedSort}
              options={["RAL", "RGB", "HTML"]}
              defaultValue={"Выберите механизм поиска"}
            />
          </div>
          <div className={style.myInput}>
            <MyInput
              valueInput={valueInput}
              onChange={myInputChange}
              defaultText={"Сначала выберите механизм поиска"}
            />
          </div>
        </div>
      </div>
      <div className={style.colorRal}>
        <ColorRal
          sortedKind={sortedKind}
          valueInput={valueInput}
          setModalWindow={setModalWindow}
        />
      </div>
    </div>
  );
}
