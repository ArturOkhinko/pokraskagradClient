import wheels22 from ".././img/TruckWheel22.jpeg";
import wheels225 from ".././img/TruckWheel22.5.jpeg";
import wheels21 from ".././img/TruckWheel21.jpeg";
import wheels20 from ".././img/TruckWheel20.jpeg";
import wheels195 from ".././img/TruckWheel19.5.jpeg";
import wheels175 from ".././img/TruckWheel17.5.jpeg";
import wheels17 from ".././img/TruckWheel17.jpeg";
import wheels16 from ".././img/TruckWheel16.jpeg";

type TruckWheelInfo = {
  [index: string]: string;
};

export const truckWheelInfoImg: TruckWheelInfo = {
  16: wheels16,
  17: wheels17,
  17.5: wheels175,
  19.5: wheels195,
  20: wheels20,
  21: wheels21,
  22: wheels22,
  22.5: wheels225,
};
