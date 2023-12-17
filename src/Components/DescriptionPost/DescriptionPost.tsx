import React from "react";
import style from "./DescriptionPost.module.css";
import { Status } from "../Status/Status";
import { Description } from "../Description/Description";
import { InsertPost } from "../InsertPost/InsertPost";
import { FC } from "react";
import { ServerModule } from "../../modules/serverModule";
import { AdminModule } from "../../modules/adminModule";
import { newsDescriptionState } from "../../models/states/newsDescriptionState";

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
  const [posts, setPosts] = React.useState<newsDescriptionState[]>();

  const removeDescriptionPost = async (id: string) => {
    const response = await AdminModule.removeDescriptionPost(id);
    if (response.status >= 200 && response.status < 300) {
      setRes({ status: response.status, message: "Данные успешно удаленны" });
    }
    if (response.status >= 300) {
      setRes({ status: response.status, message: "Ошибка" });
    }

    setPosts(posts?.filter((post) => post.id !== id));
    setTimeout(() => setRes({ status: 0, message: "" }), 1000);
  };

  const getInfo = async () => {
    try {
      const response = await ServerModule.getInfoPostDescription();
      setPosts(
        response.data.map((post) => {
          return {
            ...post,
            img: post.img?.split(","),
            isOpen: false,
            actionName: "Развернуть",
          };
        })
      );
    } catch (e) {
      console.log(e);
    }
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
    if (posts) {
      setPosts([
        ...posts,
        {
          id: data.id,
          description: data.description,
          header: data.header,
          img: data.img?.split(",") || "null",
          isOpen: false,
          actionName: "Развернуть",
        },
      ]);
    }
  };
  return (
    <div className={style.main}>
      {res?.status !== 0 ? <Status response={res!} /> : null}
      <InsertPost
        url="/descriptionPost"
        pushItemForClient={pushItemForClient}
      />
      <Description
        descriptionsProps={posts}
        setDescriptions={setPosts}
        removeDescriptionPost={removeDescriptionPost}
      />
    </div>
  );
};
