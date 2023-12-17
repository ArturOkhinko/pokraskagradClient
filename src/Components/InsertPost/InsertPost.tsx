import React from "react";
import style from "./InsertPost.module.css";
import { Status } from "../Status/Status";
import { useDispatch, useSelector } from "react-redux";
import { FC } from "react";
import { NewPostRequest } from "../../models/request/NewPostRequest";
import { AdminModule } from "../../modules/adminModule";
import { status } from "../../models/status";

interface InsertPost {
  url: string;
  pushItemForClient: Function;
}
export const InsertPost: FC<InsertPost> = ({ url, pushItemForClient }) => {
  const [header, setHeader] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [imgInput, setImgInput] = React.useState<string>("");
  const [res, setRes] = React.useState<status>({ status: 0 });

  const addImg = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setImgInput([...e.target.value].filter((e) => e !== " ").join(""));
  };

  const insert = async (data: NewPostRequest) => {
    const responce = await AdminModule.createNewPost(data, url);

    if (!responce) {
      setRes({ status: 400, message: "Ошибка, авторизуйтесь" });
      setTimeout(() => setRes({ status: 0, message: "" }), 1000);
      return;
    }

    setRes({ status: responce.status, message: responce.data.message });
    pushItemForClient({
      id: responce.data.id,
      header,
      description,
      img: imgInput || "null",
    });

    setTimeout(() => setRes({ status: 0, message: "" }), 1000);
  };

  const save = () => {
    if (!header || !description) {
      setRes({ status: 400, message: "Не все поля заполнены" });
      setTimeout(() => setRes({ status: 0, message: "" }), 1000);
      return;
    }

    insert({
      id: "",
      description: description!,
      img: imgInput !== "" ? imgInput.split(",") : null,
      header: header!,
    });
    setHeader("");
    setDescription("");
    setImgInput("");
  };

  const color = useSelector(
    (state: ColorReducerType) => state.colorTheme.color
  );

  return (
    <div className={style.main}>
      {res?.status !== 0 ? <Status response={res!} /> : null}
      <div className={style.newPost}>
        <textarea
          className={style.header}
          style={{ color: color }}
          value={header}
          onChange={(e) => setHeader(e.target.value)}
          placeholder="Заголовок"
        />
        <textarea
          className={style.description}
          style={{ color: color }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
