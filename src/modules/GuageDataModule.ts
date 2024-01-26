import $api from "../http/index";
import { IGuageData } from "../models/IGuageData";
import { AxiosResponse } from "axios";

export class GaugeDataModule {
  static async getGuageData(): Promise<AxiosResponse<IGuageData>> {
    return $api.get("data");
  }
}
