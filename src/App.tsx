import React, { FC } from "react";
import style from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import { Catalog } from "./Components/Catalog/Catalog";
import { Home } from "./Components/Home/Home";
import { Info } from "./Components/Info/Info";
import ColorChoice from "./Components/ColorChoice/ColorChoice";
import ServiceChoice from "./Components/ServiceChoice/ServiceChoice";
import { WheelInfo } from "./Components/WheelInfo/WheelInfo";
import Sandblast from "./Components/Sandblast/Sandblast";
import { Supports } from "./Components/Supports/Supports";
import { Footer } from "./Components/Footer/Footer";
import { PowderPoint } from "./Components/PowderPoint/PowderPoint";
import { TrukService } from "./Components/TrukWheelService/TrukService";
import { Registration } from "./Components/Registration/Registration";
import { Login } from "./Components/Login/Login";
import { MainDescription } from "./Components/MainDescription/MainDescription";
import { AdminBar } from "./Components/AdminBar/AdminBar";
import { DescriptionPost } from "./Components/DescriptionPost/DescriptionPost";
import { adminService } from "./services/adminServices";
import { useDispatch } from "react-redux";
import { login } from "./store/reducers/accauntReducer";
import { WheelInfoAdmin } from "./Components/WheelInfoAdmin/WheelInfoAdmin";
import { TruckWheelInfo } from "./Components/trukWheelInfoAdmin/TrukWheelInfoAdmin";
import { SupportAdmin } from "./Components/SupportAdmin/SupportAdmin";
import { SandblastAdmin } from "./Components/SanblastAdmin/SandblastAdmin";
import { PowderPointAdmin } from "./Components/PowderPointAdmin/PowderPointAdmin";

export const App: FC = () => {
  const dispatch = useDispatch();

  const getInfoAboutUser = async () => {
    const userData = await adminService.getInfoAboutUser();
    console.log(userData);
    if (
      userData &&
      userData.status &&
      userData.status === 200 &&
      userData.accessToken !== ""
    ) {
      dispatch(login(userData));
    }
    if (userData.status && userData.status === 400) {
      const refreshResponce = await adminService.refresh();
      if (refreshResponce.status === 400) {
        dispatch(login({ role: "", email: "", accessToken: "" }));
        return;
      }
      dispatch(login(refreshResponce));
    }
  };

  React.useEffect(() => {
    getInfoAboutUser();
  }, []);

  return (
    <div className={style.main}>
      <div className={style.NavBar}>
        <NavBar />
      </div>
      <div className={style.content}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/info" element={<Info />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/colorChoice" element={<ColorChoice />} />
          <Route path="/serviceChoice" element={<ServiceChoice />} />
          <Route path="/wheelInfo" element={<WheelInfo />} />
          <Route path="/serviceSandblast" element={<Sandblast />} />
          <Route path="/serviceSupports" element={<Supports />} />
          <Route path="/powderPoint" element={<PowderPoint />} />
          <Route path="/trukService" element={<TrukService />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mainDescription" element={<MainDescription />} />
          <Route path="/admin" element={<AdminBar />} />
          <Route path="/descriptionPost" element={<DescriptionPost />} />
          <Route path="/wheelInfoAdmin" element={<WheelInfoAdmin />} />
          <Route path="/truckWheelInfoAdmin" element={<TruckWheelInfo />} />
          <Route path="/supportAdmin" element={<SupportAdmin />} />
          <Route path="/sandblastAdmin" element={<SandblastAdmin />} />
          <Route path="/powderPointAdmin" element={<PowderPointAdmin />} />
        </Routes>
      </div>
      <div className={style.footer}>
        <Footer />
      </div>
    </div>
  );
};