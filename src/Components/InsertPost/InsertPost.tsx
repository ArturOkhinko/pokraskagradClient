import React from "react";
import style from "./InsertPost.module.css";
import { Status } from "../Status/Status";
import { adminService } from "../../services/adminServices";
import { useDispatch, useSelector } from "react-redux";
import { FC } from "react";
import { login } from "../../store/reducers/accauntReducer";
import { urlToService } from "../../values/value";

interface InsertPost {
  url: string;
  pushItemForClient: Function;
}

type DescriptionType = {
  id: string;
  header: string;
  description: string;
  img: string[] | null;
  accessToken: string;
};
type Status = {
  status: number;
  message: string;
};
export const InsertPost: FC<InsertPost> = ({ url, pushItemForClient }) => {
  const [header, setHeader] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [imgInput, setImgInput] = React.useState<string>("");
  const [res, setRes] = React.useState<Status>({ status: 0, message: "" });

  const dispatch = useDispatch();

  const inputDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };
  const inputHeader = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHeader(e.target.value);
  };

  const addImg = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setImgInput([...e.target.value].filter((e) => e !== " ").join(""));
  };

  const accessToken = useSelector(
    (state: AccLogReducerType) => state.accLog.user.accessToken
  );

  const insert = async (data: DescriptionType) => {
    const responce = await fetch(`${urlToService}/api${url}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return responce.json();
  };

  const save = async () => {
    if (!header || !description) {
      setRes({ status: 400, message: "Не все поля заполнены" });
      setTimeout(() => setRes({ status: 0, message: "" }), 1000);
      return;
    }

    const dataDesc: DescriptionType = {
      id: "",
      description: description!,
      img: imgInput !== "" ? imgInput.split(",") : null,
      header: header!,
      accessToken,
    };

    const responce = await insert(dataDesc);
    if (responce.status === 400) {
      const refreshRes = await adminService.refresh();
      dispatch(login(refreshRes));
      if (refreshRes.accessToken && refreshRes.role === "admin") {
        console.log(refreshRes.accessToken);
        dataDesc.accessToken = refreshRes.accessToken;
        const insertRes = await insert(dataDesc);
        console.log(insertRes);
        setRes(insertRes);
        setTimeout(() => setRes({ status: 0, message: "" }), 1000);
        pushItemForClient({
          id: insertRes.id,
          header,
          description,
          img: imgInput || "null",
        });
      } else {
        setRes({ status: 400, message: "Пользователь не авторизован" });
        setTimeout(() => setRes({ status: 0, message: "" }), 1000);
      }

      setHeader("");
      setDescription("");
      setImgInput("");
      return;
    }

    setRes(responce);
    pushItemForClient({
      id: responce.id,
      header,
      description,
      img: imgInput || "null",
    });
    setTimeout(() => setRes({ status: 0, message: "" }), 1000);
    setHeader("");
    setDescription("");
    setImgInput("");
  };

  const color = useSelector(
    (state: ColorReducerType) => state.colorTheme.color
  );

  return (
    <div className={style.main}>
      {res?.status !== 0 ? <Status responce={res!} /> : null}
      <div className={style.newPost}>
        <textarea
          className={style.header}
          style={{ color: color }}
          value={header}
          onChange={(e) => inputHeader(e)}
          placeholder="Заголовок"
        />
        <textarea
          className={style.description}
          style={{ color: color }}
          value={description}
          onChange={(e) => inputDescription(e)}
          placeholder="Описание"
        />
        <textarea
          className={style.img}
          style={{ color: color }}
          value={imgInput}
          onChange={(e) => addImg(e)}
          placeholder="Ссылки на картинки"
        />
        <button onClick={save}>Сохранить</button>
      </div>
    </div>
  );
};
