import React from "react";
import style from "./Catalog.Style/Catalog.module.css";
import colorImg from "../../img/pngegg.png";
import services from "../../img/Services.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { searching } from "./searching";
import { SearchedCatalog } from "../SearchedCatalog/SearchedCatalog";
import { FC } from "react";

export const Catalog: FC = () => {
  const [search, setSearch] = React.useState<string>();
  const [searchedCatalog, setSearchedCatalog] = React.useState<
    SearchingCatalogType[] | null
  >([]);

  React.useEffect(() => {
    setSearchedCatalog(searching(search));
  }, [search]);

  const color = useSelector(
    (state: ColorReducerType) => state.colorTheme.color
  );
  return (
    <div className={style.main}>
      <div className={style.input}>
        <input
          style={{ border: `1px solid ${color}`, color: color }}
          placeholder=" 🔍 поиск по всему каталогу"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {searchedCatalog ? (
        <div className={style.searchedCatalog}>
          <SearchedCatalog
            linkItems={searchedCatalog}
            searchedCatalog={searchedCatalog}
          />
        </div>
      ) : (
        <>
          <div className={style.text}>
            <p style={{ color: color }}>
              Выберите с чего вы хотите начать поиск.
            </p>
          </div>
          <Link className={style.color} to="/colorChoice">
            <img src={colorImg} style={{ border: `1px solid ${color}` }} />
            <div className={style.serviceName + " " + style.colorName}>
              <i>Цвета</i>
            </div>
          </Link>
          <Link className={style.services} to="/serviceChoice">
            <img src={services} style={{ border: `1px solid ${color}` }} />
            <div className={style.serviceName + " " + style.servicesName}>
              <i>Услуги</i>
            </div>
          </Link>
        </>
      )}
    </div>
  );
};
