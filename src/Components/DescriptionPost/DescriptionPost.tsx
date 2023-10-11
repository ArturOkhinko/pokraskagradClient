import React from "react";
import style from "./DescriptionPost.module.css";
import { Status } from "../Status/Status";
import { adminService } from "../../services/adminServices";
import { Description } from "../Description/Description";
import { InsertPost } from "../InsertPost/InsertPost";
import { serverService } from "../../services/serverService";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/reducers/accauntReducer";
import { FC } from "react";

type Description = {
  id: string;
  header: string;
  description: string;
  img?: string[];
  isOpen: boolean;
  actionName: string;
};

export const DescriptionPost: FC = () => {
  const [res, setRes] = React.useState({ status: 0, message: "" });
  const [post, setPost] = React.useState<Description[]>([]);

  const userData = useSelector((state: AccLogReducerType) => state.accLog.user);

  const dispatch = useDispatch();
  const removeDescriptionPost = async (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.id;
    const data = await adminService.removeDescriptionPost(
      id,
      userData.accessToken
    );
    if (data.status === 400) {
      const userData = adminService.refresh();
      userData.then((res) => {
        if (res.status === 400) {
          setRes({
            status: 400,
            message: "пользователь не авторизован",
          });
          setTimeout(() => setRes({ status: 0, message: "" }), 1000);
          return;
        }
        dispatch(login(res));
        const data = adminService.removeDescriptionPost(id, res.accessToken);
        data.then((res) => {
          if (res.status === 400) {
            setRes(res);
            setTimeout(() => setRes({ status: 0, message: "" }), 1000);
            return;
          }
          setRes(res);
          setPost(post.filter((element) => element.id !== id));
          setTimeout(() => setRes({ status: 0, message: "" }), 1000);
        });
      });
    }
    if (data.status === 200) {
      setRes(data);
      setPost(post.filter((element) => element.id !== id));
      setTimeout(() => setRes({ status: 0, message: "" }), 1000);
    }
  };
  const getInfo = async () => {
    const responce: Description[] =
      await serverService.getInfoDescriptionPost();
    console.log(responce);
    setPost(
      responce.map((element) => {
        return {
          ...element,
          isOpen: false,
          actionName: "Развернуть",
        };
      })
    );
  };

  React.useEffect(() => {
    getInfo();
  }, []);

  const pushItemForClient = (data: {
    id: string;
    description: string;
    header: string;
    img: string;
  }) => {
    setPost([
      ...post,
      {
        id: data.id,
        description: data.description,
        header: data.header,
        img: data.img?.split(",") || "null",
        isOpen: false,
        actionName: "Развернуть",
      },
    ]);
  };
  return (
    <div className={style.main}>
      {res?.status !== 0 ? <Status responce={res!} /> : null}
      <InsertPost
        url="/descriptionPost"
        pushItemForClient={pushItemForClient}
      />
      <Description
        descriptionsProps={post}
        removeDescriptionPost={removeDescriptionPost}
        setDescriptions={setPost}
      />
    </div>
  );
};
