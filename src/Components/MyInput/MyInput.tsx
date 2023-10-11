import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { otherMianing } from "../../store/reducers/kindSortReducer";
import style from "./MyInput.module.css";
interface MyInputProps {
  valueInput: string;
  onChange: (e: string) => void;
  defaultText: string;
}

export const MyInput: FC<MyInputProps> = ({
  valueInput,
  onChange,
  defaultText,
}) => {
  const color = useSelector(
    (state: ColorReducerType) => state.colorTheme.color
  );
  const placeholder = useSelector(
    (state: SortReducerType) => state.kindSort.placeholder
  );
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(otherMianing({ mianing: defaultText }));
  }, []);
  return (
    <input
      style={{ border: `1px solid ${color}`, color: color }}
      placeholder={placeholder}
      value={valueInput}
      onChange={(e) => onChange(e.target.value)}
      className={style.input}
    />
  );
};
