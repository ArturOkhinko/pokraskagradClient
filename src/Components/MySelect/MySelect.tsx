import React, { FC } from "react";
import style from "../MySelect/MySelect.module.css";
import { useDispatch } from "react-redux";

import { html, ral, rgb } from "../../store/reducers/kindSortReducer";
import { useSelector } from "react-redux";

interface MyInputProps {
  defaultValue: string;
  onChange: (value: string) => void;
  options: string[];
  value: string;
}

export const MySelect: FC<MyInputProps> = ({
  defaultValue,
  onChange,
  options,
  value,
}) => {
  const dispatch = useDispatch();
  const changeKind: (value: string) => void = (value) => {
    onChange(value);
    if (value === "RAL") {
      dispatch(ral());
    }
    if (value === "RGB") {
      dispatch(rgb());
    }
    if (value === "HTML") {
      dispatch(html());
    }
  };
  const color: string = useSelector(
    (state: ColorReducerType) => state.colorTheme.color
  );
  return (
    <div className={style.mainSelect}>
      <select
        value={value}
        onChange={(event) => changeKind(event.target.value)}
        style={{ border: `1px solid ${color}` }}
      >
        <option>{defaultValue}</option>
        {options.map((element, index) => (
          <option key={index}>{element}</option>
        ))}
      </select>
    </div>
  );
};
