import { urlToService } from "../values/value";

type DeletData = {
  id: string;
  accessToken: string;
};
type GetInfoAboutUser = {
  status: number;
  message: string;
  email: string;
  role: string;
};

type OperationInfo = {
  status: number;
  message: string;
};
type UpdateInfo = (data: any, accessToken: string) => OperationInfo;

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
class AdminModule {
  async refresh() {
    const responce = await fetch(`${urlToService}/api/refresh`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });
    return responce.json();
  }
  async deleteMainDescription(data: DeletData) {
    const responce = await fetch(`${urlToService}/api/deleteMainDescription`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    return responce.json();
  }
  async logout() {
    const responce = await fetch(`${urlToService}/api/logout`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    });
    return responce.json();
  }
  async sign(
    linkToFetch: string,
    email: string,
    password: string,
    code: string
  ) {
    try {
      const responce = await fetch(`${urlToService}/api${linkToFetch}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password, code }),
      });
      return responce.json();
    } catch (e) {
      console.log(e);
    }
  }
  async removeDescriptionPost(id: string, accessToken: string) {
    const data = await fetch(`${urlToService}/api/removeDescriptionPost`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ id, accessToken }),
    });
    return data;
  }
  async wheelInfo(
    defaultValue: number,
    price: number,
    accessToken: string,
    text: string,
    wheelName: string,
    radius?: string
  ) {
    const wheelInfo = await fetch(`${urlToService}/api/wheelInfo`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        defaultValue,
        price,
        radius,
        accessToken,
        text,
        wheelName,
      }),
    });
    return wheelInfo.json();
  }
  async getInfoAboutUser() {
    try {
      const responce = await fetch(`${urlToService}/api/getInfoAboutUser`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      });
      return responce.json();
    } catch (e) {}
  }

  async updateInfoTruckWheels(data: any, accessToken: string) {
    const operationInfo = await fetch(`${urlToService}/api/updateTruckInfo`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ data, accessToken }),
    });
    return operationInfo.json();
  }

  async updateInfoSupports(data: DataSupports, accessToken: string) {
    try {
      const responce = await fetch(`${urlToService}/api/updateSupportsInfo`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          data,
          accessToken,
        }),
      });
      return responce.json();
    } catch (e) {}
  }
  async insertInfoSandblast(data: DataSandblast, accessToken: string) {
    try {
      const responce = await fetch(`${urlToService}/api/updateInfoSandblast`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          data,
          accessToken,
        }),
      });
      return responce.json();
    } catch (e) {}
  }
  async deleteInfoSandblast(data: { id: string }, accessToken: string) {
    try {
      const responce = await fetch(`${urlToService}/api/deleteInfoSandblast`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          data,
          accessToken,
        }),
      });
      return responce.json();
    } catch (e) {}
  }
  async insertPowderPoint(data: { img: string }, accessToken: string) {
    try {
      const responce = await fetch(`${urlToService}/api/insertPowderPoint`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          data,
          accessToken,
        }),
      });
      return responce.json();
    } catch (e) {}
  }
  async deletePowderPoint(data: { id: string }, accessToken: string) {
    try {
      const responce = await fetch(`${urlToService}/api/deletePowderPoint`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          data,
          accessToken,
        }),
      });
      return responce.json();
    } catch (e) {}
  }
}

export const adminModule = new AdminModule();
