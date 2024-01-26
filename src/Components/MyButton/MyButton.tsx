import React, { FC } from "react";
import style from "./MyButton.module.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface MyButtonProps {
  nameButton: string;
}
export const MyButton: FC<MyButtonProps> = ({ nameButton }) => {
  return (
    <div className={style.main}>
      <Link to="hystory" className={style.myButton}>
        <p className={style.nameButton}>{nameButton}</p>
        <FaArrowRightLong />
      </Link>
    </div>
  );
};
