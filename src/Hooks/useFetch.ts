import { useState } from "react";
import { useEffect } from "react";

class FetchToGoogleSheets {
  url: string;
  data: any;
  constructor(url: string) {
    const arrayUrl = [...url];
    arrayUrl.splice(-10);
    this.url = arrayUrl.join("") + "gviz/tq?";
  }

  async fetchToGoogleSheets() {
    await fetch(this.url)
      .then((res) => res.text())
      .then((rep) => {
        this.data = JSON.parse(rep.substring(47).slice(0, -2));
      });
    return this.data;
  }
}
export const useFetch = (url: string, setState: (data: string[][]) => void) => {
  const [dataForState, setDataForState] = useState<string[][]>([]);

  function queryArrayRowValue(data: any) {
    const arrayRows = data.table.rows;
    let row = 1;
    const rows: string[][] = [];
    while (arrayRows[row - 1]) {
      if (arrayRows[row - 1].c) {
        const arrayColumnsWidthObj: { v: string | number; f?: string }[] =
          arrayRows[row - 1].c;
        const arrayColumnsValue: string[] = [];
        arrayColumnsWidthObj.forEach((element) => {
          if (element && element.v) {
            arrayColumnsValue.push(String(element.v));
          }
        });
        rows.push(arrayColumnsValue);
      }
      row++;
    }
    return rows;
  }

  useEffect(() => {
    const data = new FetchToGoogleSheets(url);
    data
      .fetchToGoogleSheets()
      .then((res) => {
        return queryArrayRowValue(res);
      })
      .then((res) => {
        setDataForState(res);
      });
  }, []);
  useEffect(() => {
    if (dataForState[0]) {
      setState(dataForState);
    }
  }, [dataForState]);
};
