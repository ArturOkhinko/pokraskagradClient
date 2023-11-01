import { urlToService } from "../values/value";

export class ServerModule {
  url: string;
  constructor(url: string) {
    this.url = url;
  }
  async getInfo(tableName: string) {
    const responce = await fetch(
      urlToService + this.url + "?tableName=" + tableName,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      }
    );
    console.log(responce);
    return responce.json();
  }
}
