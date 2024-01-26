import React, { FC } from "react";
import style from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage/MainPage";
import { Hystory } from "./pages/Hystiry/Hystory";

export const App: FC = () => {
  return (
    <div className={style.main}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/hystory" element={<Hystory />} />
      </Routes>
    </div>
  );
};
