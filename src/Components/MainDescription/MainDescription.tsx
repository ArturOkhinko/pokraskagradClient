import React from "react";
import style from "./MainDescription.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Status } from "../Status/Status";
import { InsertPost } from "../InsertPost/InsertPost";
import { AdminModule } from "../../modules/adminModule";
import { ServerModule } from "../../modules/serverModule";
import { status } from "../../models/status";

type Description = {
  id: string;
  img: string[];
  header: string;
  description: string;
};

export const MainDescription = () => {
  const [post, setPost] = React.useState<Description[]>([]);
  const [res, setRes] = React.useState<status>({ status: 0 });

  const color = useSelector(
    (state: ColorReducerType) => state.colorTheme.color
  );

  const accessToken = useSelector(
    (state: AccLogReducerType) => state.accLog.user.accessToken
  );

  const removePost = async (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.id;

    const responce = await AdminModule.deleteMainDescription(id, accessToken);
    if (!responce) {
      setRes({ status: 400, message: "Ошибка, авторизуйтесь" });
      setTimeout(() => setRes({ status: 0, message: "" }), 1000);
      return;
    }
    setRes({ status: responce.status, message: responce.data.message });
    setPost((post: Description[]) => {
      return post.filter((element) => element.id !== id);
    });
    setTimeout(() => setRes({ status: 0, message: "" }), 1000);
  };

  const pushItemForClient = (data: {
    id: string;
    header: string;
    description: string;
    img: string;
  }) => {
    setPost([
      ...post,
      {
        id: data.id,
        header: data.header,
        description: data.description,
        img: data.img.split(","),
      },
    ]);
  };

  const getInfo = async () => {
    const responce = await ServerModule.getInfoMainDescription();
    setPost(
      responce.data.map((element: any) => {
        return {
          ...element,
          img: element.img.split(","),
        };
      })
    );
  };

  React.useLayoutEffect(() => {
    getInfo();
  }, []);

  return (
    <div className={style.main}>
      {res?.status !== 0 ? <Status response={res!} /> : null}
      <InsertPost
        url="/mainDescription"
        pushItemForClient={pushItemForClient}
      />
      <div className={style.allPost}>
        {post?.map((element) => (
          <div className={style.mainPost} key={element.id}>
            <div className={style.post}>
              <div className={style.text} style={{ color: color }}>
                <i>{element.header}</i>
                <i>{element.description}</i>
              </div>
              <div className={style.images}>
                {element.img[0]
                  ? element.img.map((img, index) => (
                      <img src={img} key={index} />
                    ))
                  : null}
              </div>
            </div>
            <button
              id={element.id}
              className={style.deleteButton}
              onClick={(e) => removePost(e)}
            >
              Удалить пост
            </button>
            <hr className={style.linear} />
          </div>
        ))}
      </div>
    </div>
  );
};
