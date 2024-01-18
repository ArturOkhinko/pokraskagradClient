import React from "react";
import style from "../ServiceChoice/ServiceChoice.module.css";
import { ServiceCatalog } from "../ServiceCatalog/ServiceCatalog";
import wheels from "../../img/Whels.png";
import TrukWheel from "../../img/TrukWheel.png";
import colorPowder from "../../img/colorPowder.png";
import sandblast from "../../img/sandblast.jpeg";
import { useSelector } from "react-redux";

export default function ServiceChoice() {
  const services: ServiceChoiceType[] = [
    {
      img: wheels,
      name: "Пескоструй и покраска дисков",
      text: "Цена указана за покраску дисков и пескоструй. Перед покраской дисков необходимо их пескоструить ведь иначе работа будет не качественной, а так как мы всегда выполняем свою работу максимально качественно, мы всегда пескоструим диски.",
      link: "/wheelInfo",
    },
    {
      img: TrukWheel,
      name: "Пескоструй и покраска дисков для грузоввых автомобилей",
      text: "Цена указана за покраску дисков и пескоструй. Перед покраской дисков необходимо их пескоструить ведь иначе работа будет не качественной, а так как мы всегда выполняем свою работу максимально качественно, мы всегда пескоструим диски.",
      link: "/trukService",
    },
    {
      img: colorPowder,
      name: "Порошковая покраска",
      text: "Покраска любых изделий. Цена зависит от размера и сложности покраски.",
      link: "/powderPoint",
    },
    {
      img: sandblast,
      name: "Пескоструй других деталей",
      text: "Посмотрите цены за пескострую любых других деталей",
      link: "/serviceSandblast",
    },
  ];
  const [search, setSearch] = React.useState<string>();
  const color = useSelector(
    (state: ColorReducerType) => state.colorTheme.color
  );

  const searchServices: ServiceChoiceType[] | null = React.useMemo(() => {
    if (search) {
      return services.filter((element) => {
        if (element.name.toLowerCase().includes(search.toLowerCase())) {
          return element;
        }
        return null;
      });
    }
    return services;
  }, [search]);

  return (
    <div className={style.main} style={{ color: color }}>
      <p>Выберите вид услуги, который вас интересует</p>
      <input
        placeholder={" 🔍 поиск услуги"}
        style={{ border: `1px solid ${color}` }}
        className={style.inputMain}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className={style.services}>
        <div className={style.powderWheels}>
          <ServiceCatalog serviceChoice={searchServices} />
        </div>
      </div>
    </div>
  );
}
