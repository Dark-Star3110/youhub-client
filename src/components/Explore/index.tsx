import styles from "./Explore.module.scss";
import other_icon from "./../../assets/icon/other.png";
import game_icon from "./../../assets/icon/game.png";
import music_icon from "./../../assets/icon/music.png";
import news_icon from "./../../assets/icon/news.png";
import sport_icon from "./../../assets/icon/sport.png";

import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { useVideoCategoryQuery } from "../../generated/graphql";
import Spinner from "../Spinner";
import { getDateFromString } from "../../utils/dateHelper";
import { NetworkStatus } from "@apollo/client";

const categories: { [key: string]: string } = {
  "Âm nhạc": "9e53165f-f37b-ec11-8359-405bd82e7629",
  "Trò chơi": "a153165f-f37b-ec11-8359-405bd82e7629",
  "Tin tức": "a053165f-f37b-ec11-8359-405bd82e7629",
  "Thể thao": "9f53165f-f37b-ec11-8359-405bd82e7629",
  "Thể loại khác": "a253165f-f37b-ec11-8359-405bd82e7629",
};

const Explore = () => {
  useCheckAuth();
  const [tab, setTab] = useState<string>("Âm nhạc");
  const { data, loading, fetchMore, networkStatus } = useVideoCategoryQuery({
    variables: {
      limit: 20,
      categoryId: categories[tab],
    },
    notifyOnNetworkStatusChange: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadingMore = networkStatus === NetworkStatus.fetchMore;

  const loadMore = () => {
    fetchMore({ variables: { cursor: data?.videoCategory?.cursor } });
  };

  const handleScroll = useCallback(() => {
    let condition: number = 0;
    if (document.documentElement.scrollHeight < 1500) condition = 0.38;
    else if (document.documentElement.scrollHeight < 2500) condition = 0.66;
    else if (document.documentElement.scrollHeight < 3500) condition = 0.8;
    else condition = 0.9;
    if (
      window.scrollY / document.documentElement.scrollHeight >= condition &&
      data?.videoCategory?.hasMore
    ) {
      if (!loading) {
        fetchMore({ variables: { cursor: data?.videoCategory?.cursor } });
      }
    }
  }, [
    data?.videoCategory?.cursor,
    fetchMore,
    data?.videoCategory?.hasMore,
    loading,
  ]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
  const videos = data?.videoCategory?.paginatedVideos;
  if (loading && !videos) {
    return (
      <h1>
        <Spinner />
      </h1>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <div className={styles["menu-item"]} onClick={() => setTab("Âm nhạc")}>
          <div className={styles["menu-item__icon"]}>
            <img src={music_icon} alt="icon" />
          </div>
          <div className={styles["menu-item__text"]}>Âm nhạc</div>
        </div>
        <div className={styles["menu-item"]} onClick={() => setTab("Trò chơi")}>
          <div className={styles["menu-item__icon"]}>
            <img src={game_icon} alt="icon" />
          </div>
          <div className={styles["menu-item__text"]}>Trò chơi</div>
        </div>
        <div className={styles["menu-item"]} onClick={() => setTab("Tin tức")}>
          <div className={styles["menu-item__icon"]}>
            <img src={news_icon} alt="icon" />
          </div>
          <div className={styles["menu-item__text"]}>Tin tức</div>
        </div>
        <div className={styles["menu-item"]} onClick={() => setTab("Thể thao")}>
          <div className={styles["menu-item__icon"]}>
            <img src={sport_icon} alt="icon" />
          </div>
          <div className={styles["menu-item__text"]}>Thể thao</div>
        </div>
        <div
          className={styles["menu-item"]}
          onClick={() => setTab("Thể loại khác")}
        >
          <div className={styles["menu-item__icon"]}>
            <img src={other_icon} alt="icon" />
          </div>
          <div className={styles["menu-item__text"]}>Khác</div>
        </div>
      </div>
      <div className={styles["content"]}>
        <h3 className={styles["content-title"]}>{tab}</h3>
        {!loading && !videos && (
          <h2>Không có video thuộc thể loại này !!! 😀</h2>
        )}
        {videos?.map((video) => (
          <Link to={`/watch/${video.id}`} key={video.id}>
            <div className={styles["secondary-item"]}>
              <div className={styles["secondary-item_img"]}>
                <img src={video.thumbnailUrl as string} alt="video" />
              </div>
              <div className={styles["secondary-item_content"]}>
                <h3>{video.title}</h3>
                <h4>{video.user.firstName + " " + video.user.lastName}</h4>
                <h4>{getDateFromString(video.createdAt)}</h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {loadingMore && <Spinner />}

      {data?.videoCategory?.hasMore && (
        <button className={styles["more-btn"]} onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Explore;
