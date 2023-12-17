import $api from "../http";
import { PowderPointImgsResponse } from "../models/responce/PowderPointImgsResponse";
import { SandblastResponse } from "../models/responce/SandblastResponse";
import { SupportsResponse } from "../models/responce/SupportsInfoResponse";
import { WheelInfoResponse } from "../models/responce/WheelInfoResponse";
import { AxiosResponse } from "axios";

export class ServerModule {
  static async getInfoPostDescription(): Promise<
    AxiosResponse<DescriptionPostResponce[]>
  > {
    return $api.get<DescriptionPostResponce[]>(
      "/getInfo/?tableName=postDescription"
    );
  }
  static async getInfoMainDescription(): Promise<
    AxiosResponse<DescriptionPostResponce[]>
  > {
    return $api.get<DescriptionPostResponce[]>(
      "/getInfo/?tableName=description"
    );
  }
  static async getInfoWheel(): Promise<AxiosResponse<WheelInfoResponse[]>> {
    return $api.get<WheelInfoResponse[]>("/getInfo/?tableName=wheelInfo");
  }
  static async getInfoTruckWheel(): Promise<
    AxiosResponse<WheelInfoResponse[]>
  > {
    return $api.get<WheelInfoResponse[]>("/getInfo/?tableName=truckInfo");
  }
  static async getInfoSupports(): Promise<AxiosResponse<SupportsResponse[]>> {
    return $api.get<SupportsResponse[]>("/getInfo/?tableName=supports");
  }
  static async getInfoSandblast(): Promise<AxiosResponse<SandblastResponse[]>> {
    return $api.get<SandblastResponse[]>("/getInfo/?tableName=sandblast");
  }
  static async getInfoPowderPointImgs(): Promise<
    AxiosResponse<PowderPointImgsResponse[]>
  > {
    return $api.get<PowderPointImgsResponse[]>(
      "/getInfo/?tableName=powderPoint"
    );
  }
}
