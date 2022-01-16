import { NetworkStatus } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserVideosQuery } from "../../generated/graphql";
import { getDateFromString } from "../../utils/dateHelper";
import Spinner from "../Spinner";
import styles from "./MeVideos.module.scss";

interface MeVideosProps {
  userId: string;
}

const MeVideos = ({ userId }: MeVideosProps) => {
  const [videoSelected, setVideoSelected] = useState("");

  const { data, loading, fetchMore, networkStatus } = useUserVideosQuery({
    variables: {
      limit: 10,
      userId,
    },
    notifyOnNetworkStatusChange: true,
  });

  const loadingMore = networkStatus === NetworkStatus.fetchMore;

  const loadMore = () => {
    if (data?.videoUser?.hasMore) {
      fetchMore({ variables: { cursor: data?.videoUser?.cursor } });
    }
  };

  const handleScroll = useCallback(() => {
    let condition = 0;
    if (document.documentElement.scrollHeight <= 1500) {
      condition = 0.25;
    } else if (document.documentElement.scrollHeight <= 2500) condition = 0.66;
    else if (document.documentElement.scrollHeight <= 3500) condition = 0.78;
    else condition = 0.88;
    if (
      window.scrollY / document.documentElement.scrollHeight >= condition &&
      data?.videoUser?.hasMore &&
      !loading
    ) {
      fetchMore({ variables: { cursor: data?.videoUser?.cursor } });
    }
  }, [data?.videoUser?.cursor, fetchMore, data?.videoUser?.hasMore, loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  if (!data?.videoUser) return <h2>Không có video nào được tải lên</h2>;

  return (
    <>
      {data?.videoUser.paginatedVideos.map((video) => (
        <div className={styles["videos-item"]} key={video.id}>
          <div className={styles["videos-item_img"]}>
            <img src={video.thumbnailUrl as string} alt="video" />
          </div>
          <div className={styles["videos-item_content"]}>
            <h3>
              {video.title} - {video.description}
            </h3>
            <h4>{getDateFromString(video.createdAt)}</h4>
          </div>
          <div className={styles["videos-control"]}>
            <div
              className={styles["videos-control__icon"]}
              onClick={() => {
                // const newVideo = videoSelected === "" ? video.id : "";
                setVideoSelected((pre) => {
                  return video.id === pre ? "" : video.id;
                });
              }}
            >
              <i className="fas fa-ellipsis-v"></i>
              {video.id === videoSelected && (
                <div className={styles["videos-control__menu"]}>
                  <Link to={`/edit/${video.id}`}>
                    <div className={styles["menu-item"]}>
                      <span className={styles["menu-icon"]}>
                        <i className="fas fa-edit"></i>
                      </span>
                      <span className={styles["menu-title"]}>Chỉnh sửa</span>
                    </div>
                  </Link>
                  <div className={styles["menu-item"]}>
                    <span className={styles["menu-icon"]}>
                      <i className="fas fa-trash-alt"></i>
                    </span>
                    <span className={styles["menu-title"]}>Xóa</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      {loadingMore && <Spinner />}
      {data.videoUser.hasMore && <button onClick={loadMore}>show more</button>}
    </>
  );
};

export default MeVideos;
