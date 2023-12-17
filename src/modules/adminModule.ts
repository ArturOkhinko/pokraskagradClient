import $api from "../http/index";
import { AxiosResponse } from "axios";
import { AuthResponce } from "../models/responce/AuthResponse";
import { NewPostRequest } from "../models/request/NewPostRequest";
import { NewPostResponse } from "../models/responce/NewPostResponse";
import { Alteration } from "../models/responce/Alteration";
import $apiVK from "../http/VK";

export class AdminModule {
  static async refresh(): Promise<AxiosResponse<RefreshResponce>> {
    return $api.get<RefreshResponce>("/refresh");
  }
  static async createNewPost(
    data: NewPostRequest,
    url: string
  ): Promise<AxiosResponse<NewPostResponse>> {
    return $api.post<NewPostResponse>(url, {
      data,
    });
  }
  static async deleteMainDescription(
    id: string,
    accessToken: string
  ): Promise<AxiosResponse<DeleteMainDescriptionResponce>> {
    return $api.delete<DeleteMainDescriptionResponce>(
      "/deleteMainDescription",
      { data: { id, accessToken } }
    );
  }
  static async logout(): Promise<AxiosResponse<DeleteMainDescriptionResponce>> {
    return $api.get<DeleteMainDescriptionResponce>("/logout");
  }

  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponce>> {
    return $api.post<AuthResponce>("/login", { email, password });
  }
  static async registration(
    email: string,
    password: string,
    code: string
  ): Promise<AxiosResponse<AuthResponce>> {
    return $api.post<AuthResponce>("/registration", { email, password, code });
  }

  static async removeDescriptionPost(id: string): Promise<AxiosResponse<any>> {
    return $api.delete<any>("/removeDescriptionPost", {
      data: { id },
    });
  }

  static async updateWheelInfo(
    initialPriceCount: number,
    price: number,
    id: string
  ): Promise<AxiosResponse<any>> {
    return $api.put<any>("/updateWheelInfo", {
      data: {
        id,
        price,
        initialPriceCount,
      },
    });
  }
  static async updateTruckWheelInfo(
    initialPriceCount: number,
    price: number,
    id: string
  ): Promise<AxiosResponse<any>> {
    return $api.put<any>("/updateTruckInfo", {
      data: {
        id,
        price,
        initialPriceCount,
      },
    });
  }
  static async createNewItemInCatalog(
    price: number,
    name: string
  ): Promise<AxiosResponse<Alteration>> {
    return $api.post<Alteration>("/createNewItemInSandblast", {
      data: {
        price,
        name,
      },
    });
  }
  static async deleteItemCatalog(id: string): Promise<AxiosResponse<any>> {
    return $api.delete<any>("/deleteItemSandblast", {
      data: {
        id,
      },
    });
  }

  static async addImgPowderPoint(
    linkToImg: string
  ): Promise<AxiosResponse<Alteration>> {
    return $api.post<Alteration>("/addImgPowderPoint", {
      data: {
        linkToImg,
      },
    });
  }

  static async removeImgPowderPoint(id: string): Promise<AxiosResponse<any>> {
    return $api.delete<any>("/removeImgPowderPoint", {
      data: {
        id,
      },
    });
  }
  static async searchUserWithDiscount(
    promocode: string
  ): Promise<AxiosResponse<searchUserWithDiscount>> {
    return $apiVK.post<searchUserWithDiscount>("/searchUserWithDiscount", {
      data: {
        promocode,
      },
    });
  }

  static async getInfoAboutUser(): Promise<AxiosResponse<AuthResponce>> {
    return $api.get<AuthResponce>("/getInfoAboutUser");
  }
}
export const adminModule = new AdminModule();
