import styles from "./LibraryVideos.module.scss";
import user_img from "../../assets/img/user.png";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { NetworkStatus } from "@apollo/client";
import { useVideosQuery } from "../../generated/graphql";

interface LibraryVideosProps {
  slug: string;
}
const limit = 12;

const LibraryVideos = ({ slug }: LibraryVideosProps) => {
  const dataFake = [
    {
      id: "17ZXlVzLb0toTe3dtO8q80DmVlnQz9R99",
      title: "Tokyo Ghoul",
      description: "this is description",
      userId: "1",
      commentable: true,
      thumbnailUrl: "https://images8.alphacoders.com/546/thumbbig-546902.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
      user: {
        firstName: "user",
        lastName: "mr",
        image_url: user_img,
      },
    },
    {
      id: "1r27Pc7Y4p8VALLxl3MUZSvMIAIoK2CGe",
      title: "Arcane",
      description: "this is description",
      userId: "1",
      commentable: true,
      thumbnailUrl: "https://images2.alphacoders.com/119/thumbbig-1192178.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
      user: {
        firstName: "user",
        lastName: "mr",
        image_url: user_img,
      },
    },
    {
      id: "1VOhQq4iMun2ojv9CindmKnd4s4CgAwDd",
      title: "Sword Art Online",
      description: "this is description",
      userId: "1",
      commentable: true,
      thumbnailUrl: "https://images8.alphacoders.com/533/thumbbig-533007.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
      user: {
        firstName: "user",
        lastName: "mr",
        image_url: user_img,
      },
    },
    {
      id: "1HSLvuGOSUfDQWC7ZwZlFobnfzlgGfwld",
      title: "Naruto",
      description: "this is description",
      userId: "1",
      commentable: true,
      thumbnailUrl: "https://images3.alphacoders.com/135/thumbbig-135625.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
      user: {
        firstName: "user",
        lastName: "mr",
        image_url: user_img,
      },
    },
    {
      id: "1c2dBx0KCmX3aAbqRFYaJLxiwIPeOoZ73",
      title: "Dragon Ball",
      description: "this is description",
      userId: "1",
      commentable: true,
      thumbnailUrl: "https://images.alphacoders.com/605/thumbbig-605799.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
      user: {
        firstName: "user",
        lastName: "mr",
        image_url: user_img,
      },
    },
    {
      id: "12STlO4qx1tccXTTvRmdGG8cU57EJEdbK",
      title: "One Piece Stamp",
      description: "this is description",
      userId: "1",
      commentable: true,
      thumbnailUrl: "https://images6.alphacoders.com/606/thumbbig-606263.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
      user: {
        firstName: "user",
        lastName: "mr",
        image_url: user_img,
      },
    },
    {
      id: "1GoZqWSYQXk2YYQz6T4KT27QCiPrSfK2V",
      title: "Bleach EX",
      description: "this is description",
      userId: "1",
      commentable: true,
      thumbnailUrl: "https://images3.alphacoders.com/167/thumbbig-16729.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
      user: {
        firstName: "user",
        lastName: "mr",
        image_url: user_img,
      },
    },
    {
      id: "1XN64i3mSXalozFZ6lFBiDJSlgYHdZztG",
      title: "Pokemon",
      description: "this is description",
      userId: "1",
      commentable: true,
      thumbnailUrl: "https://images5.alphacoders.com/613/thumbbig-613925.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
      user: {
        firstName: "user",
        lastName: "mr",
        image_url: user_img,
      },
    },
    {
      id: "1Ot-lfQvZtOFrBv78hTmLT8SrMR3qflEs",
      title: "Your Name",
      description: "this is description",
      userId: "1",
      commentable: true,
      thumbnailUrl: "https://images2.alphacoders.com/742/thumbbig-742320.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
      user: {
        firstName: "user",
        lastName: "mr",
        image_url: user_img,
      },
    },
    {
      id: "1D2Jya5U-kcuRjJSPJSfi4ZMJm1AQSyAx",
      title: "Fairy Tail",
      description: "this is description",
      userId: "1",
      commentable: true,
      thumbnailUrl: "https://images6.alphacoders.com/311/thumbbig-311015.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
      user: {
        firstName: "user",
        lastName: "mr",
        image_url: user_img,
      },
    },
  ];
  // lay tam video home 😃
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, loading, fetchMore, networkStatus } = useVideosQuery({
    variables: {
      limit,
    },
    notifyOnNetworkStatusChange: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadingMore = networkStatus === NetworkStatus.fetchMore;

  const loadMore = () => {
    fetchMore({ variables: { cursor: data?.videos?.cursor } });
  };

  const handleScroll = useCallback(() => {
    let condition: number = 0;
    if (document.documentElement.scrollHeight < 1500) condition = 0.38;
    else if (document.documentElement.scrollHeight < 2500) condition = 0.66;
    else if (document.documentElement.scrollHeight < 3500) condition = 0.8;
    else condition = 0.9;
    if (
      window.scrollY / document.documentElement.scrollHeight >= condition &&
      data?.videos?.hasMore
    ) {
      if (!loading) {
        fetchMore({ variables: { cursor: data?.videos?.cursor } });
      }
    }
  }, [data?.videos?.cursor, fetchMore, data?.videos?.hasMore, loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const videos = data?.videos?.paginatedVideos || dataFake;

  if (loading && !data?.videos)
    return (
      <h1>
        <Spinner />
      </h1>
    );
  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        {videos?.map((video, index) => (
          <Link to={`/watch/${video.id}`} key={index}>
            <div className={styles["layout-item"]}>
              <div className={styles["layout-img-container"]}>
                <img
                  src={
                    video.thumbnailUrl ||
                    "https://images6.alphacoders.com/311/thumbbig-311015.webp"
                  }
                  alt="img"
                  className={styles["layout-img"]}
                />
                <h2>Xem ngay</h2>
              </div>
              <div className={styles["layout-content"]}>
                <div className={styles["layout-content_img"]}>
                  <img
                    src={
                      video.user.image_url ||
                      "https://images6.alphacoders.com/311/thumbbig-311015.webp"
                    }
                    alt="user"
                  />
                </div>
                <div className={styles["layout-content_inf"]}>
                  <h3 className={styles["layout-content_title"]}>
                    {video.title}
                  </h3>
                  <h4 className={styles["layout-content_descript"]}>
                    {video.description}
                  </h4>
                  <h4 className={styles["layout-content_autname"]}>
                    {video.user.lastName + " " + video.user.firstName}
                  </h4>
                  <time className={styles["layout-content_time"]}>
                    {video.createdAt}
                  </time>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {loadingMore && <Spinner />}

      {data?.videos?.hasMore && <button onClick={loadMore}>Load More</button>}
    </div>
  );
};

export default LibraryVideos;
