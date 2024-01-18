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
import { Footer } from "./Components/Footer/Footer";
import { PowderPoint } from "./Components/PowderPoint/PowderPoint";
import { TrukService } from "./Components/TrukWheelService/TrukService";
import { Registration } from "./Components/Registration/Registration";
import { Login } from "./Components/Login/Login";
import { MainDescription } from "./Components/MainDescription/MainDescription";
import { AdminBar } from "./Components/AdminBar/AdminBar";
import { DescriptionPost } from "./Components/DescriptionPost/DescriptionPost";
import { useDispatch } from "react-redux";
import { login } from "./store/reducers/accauntReducer";
import { WheelInfoAdmin } from "./Components/WheelInfoAdmin/WheelInfoAdmin";
import { TruckWheelInfo } from "./Components/trukWheelInfoAdmin/TrukWheelInfoAdmin";
import { SandblastAdmin } from "./Components/SanblastAdmin/SandblastAdmin";
import { PowderPointAdmin } from "./Components/PowderPointAdmin/PowderPointAdmin";
import { DiscountVK } from "./Components/DiscountVK/DiscountVK";
import { AdminModule } from "./modules/adminModule";

export const App: FC = () => {
  const dispatch = useDispatch();
  const getInfoAboutUser = async () => {
    try {
      const userData = await AdminModule.getInfoAboutUser();
      if (
        userData &&
        userData.status === 200 &&
        userData.data.accessToken !== ""
      ) {
        dispatch(
          login({
            email: userData.data.user.email,
            role: userData.data.user.role,
            accessToken: userData.data.accessToken,
          })
        );
      }
    } catch (e) {
      dispatch(
        login({
          email: "",
          role: "",
          accessToken: "",
        })
      );
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
          <Route path="/powderPoint" element={<PowderPoint />} />
          <Route path="/trukService" element={<TrukService />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mainDescription" element={<MainDescription />} />
          <Route path="/admin" element={<AdminBar />} />
          <Route path="/descriptionPost" element={<DescriptionPost />} />
          <Route path="/wheelInfoAdmin" element={<WheelInfoAdmin />} />
          <Route path="/truckWheelInfoAdmin" element={<TruckWheelInfo />} />
          <Route path="/sandblastAdmin" element={<SandblastAdmin />} />
          <Route path="/powderPointAdmin" element={<PowderPointAdmin />} />
          <Route path="/discountVK" element={<DiscountVK />} />
        </Routes>
      </div>
      <div className={style.footer}>
        <Footer />
      </div>
    </div>
  );
};
