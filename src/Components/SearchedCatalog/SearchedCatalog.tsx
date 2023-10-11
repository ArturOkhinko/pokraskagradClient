import React, { FC } from "react";
import style from "./SearchedCatalog.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { LiaAngleDoubleRightSolid } from "react-icons/lia";
interface SearchedCatalog {
  linkItems: SearchingCatalogType[] | null;
  searchedCatalog: SearchingCatalogType[] | null;
}

export const SearchedCatalog: FC<SearchedCatalog> = ({
  linkItems,
  searchedCatalog,
}) => {
  const color = useSelector(
    (state: ColorReducerType) => state.colorTheme.color
  );
  return (
    <div className={style.items}>
      {searchedCatalog && linkItems
        ? linkItems.map((element) => (
            <div className={style.item}>
              <Link
                to={element.link}
                style={{ color: color }}
                className={style.linkItem}
              >
                {element.name}
                <p className={style.arrows}>
                  <LiaAngleDoubleRightSolid />
                  <LiaAngleDoubleRightSolid />
                  <LiaAngleDoubleRightSolid />
                  <LiaAngleDoubleRightSolid />
                </p>
              </Link>
            </div>
          ))
        : null}
    </div>
  );
};
