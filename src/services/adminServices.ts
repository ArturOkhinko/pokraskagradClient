import { useDispatch } from "react-redux";
import { adminModule } from "../modules/adminModule";
import { orange, white } from "../store/reducers/colorReducer";
type DeletData = {
  id: string;
  accessToken: string;
};
type SignResponce = {
  role: string;
  accessToken: never;
  refreshToken: never;
  email: string;
  status: number;
  message: string;
};
type responceType = {
  status: number;
  message: string;
};
type WheelInfoType = {
  defaultValue: number;
  id: string;
  name: string;
  price: number;
  radius: string;
  text: string;
};

type DataSupports = {
  name: string;
  id: string;
  defaultValue: string;
  price: number;
  text: string;
};
type DataSandblast = {
  name: string;
  price: number;
};
type PowderPoint = {
  id: string;
  status: number;
  message: string;
};
type RemoveDescriptionPost = (id: string, accessToken: string) => responceType;
class AdminService {
  async refresh() {
    const responce = await adminModule.refresh();
    return responce;
  }
  async deletMainDescription(data: DeletData) {
    const responce = await adminModule.deleteMainDescription(data);
    return responce;
  }
  async logout() {
    const responce = await adminModule.logout();
    return responce;
  }
  async sign(
    linkToFetch: string,
    email: string,
    password: string,
    code: string
  ) {
    const responce: SignResponce = await adminModule.sign(
      linkToFetch,
      email,
      password,
      code
    );
    return responce;
  }
  async getInfoAboutUser() {
    const responce = await adminModule.getInfoAboutUser();
    return responce;
  }
  async removeDescriptionPost(id: string, accessToken: string) {
    const responce = await adminModule.removeDescriptionPost(id, accessToken);
    return responce.json();
  }
  async wheelInfo(postInfo: {
    defaultValue: number;
    price: number;
    radius?: string;
    accessToken: string;
    text: string;
    wheelName: string;
  }) {
    try {
      const wheelInfo = await adminModule.wheelInfo(
        postInfo?.defaultValue,
        postInfo?.price,
        postInfo?.accessToken,
        postInfo?.text,
        postInfo?.wheelName,
        postInfo?.radius
      );
      if (wheelInfo.wheelInfo) {
        return {
          status: wheelInfo.status,
          message: wheelInfo.message,
          info: wheelInfo.wheelInfo.sort(
            (a: WheelInfoType, b: WheelInfoType) => {
              if (a.radius > b.radius) {
                return -1;
              }
              if (a.radius < b.radius) {
                return 1;
              }
            }
          ),
        };
      }
      return wheelInfo;
    } catch (e) {
      console.log(e);
    }
  }

  async updateInfoTruckWheels(data: any, accessToken: string) {
    const operationInfo: { status: number; message: string } =
      await adminModule.updateInfoTruckWheels(data, accessToken);
    return operationInfo;
  }
  async updateInfoSupports(data: DataSupports, accessToken: string) {
    const operationInfo = await adminModule.updateInfoSupports(
      data,
      accessToken
    );
    return operationInfo;
  }
  async insertInfoSandblast(data: DataSandblast, accessToken: string) {
    const operationInfo = await adminModule.insertInfoSandblast(
      data,
      accessToken
    );
    return operationInfo;
  }
  async deleteInfoSandblast(data: { id: string }, accessToken: string) {
    const operationInfo = await adminModule.deleteInfoSandblast(
      data,
      accessToken
    );
    return operationInfo;
  }
  async insertPowderPoint(data: { img: string }, accessToken: string) {
    const operationInfo: PowderPoint = await adminModule.insertPowderPoint(
      data,
      accessToken
    );
    return operationInfo;
  }
  async deletePowderPoint(data: { id: string }, accessToken: string) {
    const operationInfo: PowderPoint = await adminModule.deletePowderPoint(
      data,
      accessToken
    );
    return operationInfo;
  }
}

export const adminService = new AdminService();
