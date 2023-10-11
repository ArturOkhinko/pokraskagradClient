import React from "react";

type Server = (url: string, method: "GET" | "POST", json?: any) => any;
export const useFetchToServer: Server = (url, method, json) => {
  const responce = React.useMemo(() => {
    const responce = fetch(`http://localhost:3000${url}`, {
      method: method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(json),
    });
    return responce;
  }, []);
  return responce;
};
