import { ServerModule } from "../modules/serverModule";
type InfoOfLineType = {
  id: string;
  img: string[];
  header: string;
  description: string;
};
type ResponceType = {
  id: string;
  img: string;
  header: string;
  description: string;
};
type WheelInfoType = {
  defaultValue: number;
  id: string;
  name: string;
  price: number;
  radius: string;
  text: string;
};
class ServerService {
  async getInfoDescription() {
    const responce = new ServerModule("/api/getInfo");
    const mainDescription = await responce.getInfo("description");
    const validResponce: InfoOfLineType[] = mainDescription.responce?.res.map(
      (element: ResponceType) => {
        return {
          id: element.id,
          description: element.description,
          header: element.header,
          img: element.img.split(","),
        };
      }
    );
    return validResponce;
  }
  async getInfoDescriptionPost() {
    const responce = new ServerModule("/api/getInfo");
    const descriptionPost = await responce.getInfo("postDescription");
    const validResponce = descriptionPost.responce.res.map(
      (element: {
        id: string;
        header: string;
        description: string;
        img: string;
      }) => {
        return {
          id: element.id,
          description: element.description,
          header: element.header,
          img: element.img.split(","),
        };
      }
    );
    return validResponce;
  }
  async getInfoWheel() {
    const responce = new ServerModule("/api/getInfo");
    const wheelInfo = await responce.getInfo("wheelInfo");
    return wheelInfo.responce.res.sort((a: WheelInfoType, b: WheelInfoType) => {
      if (a.radius > b.radius) {
        return -1;
      }
      if (a.radius < b.radius) {
        return 1;
      }
    });
  }
  async getInfoTruckWheels() {
    const responce = new ServerModule("/api/getInfo");
    const wheelInfo = await responce.getInfo("truckInfo");
    return wheelInfo.responce.res.sort((a: WheelInfoType, b: WheelInfoType) => {
      if (a.radius > b.radius) {
        return -1;
      }
      if (a.radius < b.radius) {
        return 1;
      }
    });
  }
  async getInfoSupports() {
    const responce = new ServerModule("/api/getInfo");
    const wheelInfo = await responce.getInfo("supports");
    return wheelInfo.responce.res;
  }
  async getInfoSandblast() {
    const server = new ServerModule("/api/getInfo");
    const sandblastInfo = await server.getInfo("sandblast");
    return sandblastInfo.responce.res;
  }
  async getInfoMainDescription() {
    const server = new ServerModule("/api/getInfo");
    const sandblastInfo = await server.getInfo("description");
    return sandblastInfo.responce.res;
  }
  async getInfoPowderPoint() {
    const server = new ServerModule("/api/getInfo");
    const sandblastInfo = await server.getInfo("powderPoint");
    return sandblastInfo.responce.res;
  }
}

export const serverService = new ServerService();
