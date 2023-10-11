import React from "react";
import style from "./MainDescription.module.css";
import { useDispatch, useSelector } from "react-redux";
import { adminService } from "../../services/adminServices";
import { Status } from "../Status/Status";
import { InsertPost } from "../InsertPost/InsertPost";
import { serverService } from "../../services/serverService";
import { login } from "../../store/reducers/accauntReducer";

type Description = {
  id: string;
  img: string[];
  header: string;
  description: string;
};
type DescriptionData = {
  id: string;
  img: string;
  header: string;
  description: string;
};

type Status = {
  status: number;
  message: string;
};

export const MainDescription = () => {
  const [post, setPost] = React.useState<Description[]>([]);
  const [res, setRes] = React.useState<Status>({ status: 0, message: "" });

  const color = useSelector(
    (state: ColorReducerType) => state.colorTheme.color
  );

  const accessToken = useSelector(
    (state: AccLogReducerType) => state.accLog.user.accessToken
  );
  const dispatch = useDispatch();

  const removePost = async (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.id;
    const responce = await adminService.deletMainDescription({
      id,
      accessToken,
    });
    if (responce.status === 200) {
      setRes(responce);
      setPost((post: Description[]) => {
        return post.filter((element) => element.id !== id);
      });
    }
    if (responce.status === 400) {
      const refresh = await adminService.refresh();
      dispatch(login(refresh));
      const responce = await adminService.deletMainDescription({
        id,
        accessToken: refresh.accessToken,
      });
      setRes(responce);
      setPost((post: Description[]) => {
        return post.filter((element) => element.id !== id);
      });
    }
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
    const description: DescriptionData[] =
      await serverService.getInfoMainDescription();
    setPost(
      description.map((element) => {
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
      {res?.status !== 0 ? <Status responce={res!} /> : null}
      <InsertPost
        url="/mainDescription"
        pushItemForClient={pushItemForClient}
      />
      <div className={style.allPost}>
        {post?.map((element) => (
          <div className={style.mainPost}>
            <div className={style.post}>
              <div className={style.text} style={{ color: color }}>
                <i>{element.header}</i>
                <i>{element.description}</i>
              </div>
              <div className={style.images}>
                {element.img[0]
                  ? element.img.map((img) => <img src={img} />)
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
