import styles from "./UserVideos.module.scss";
import { Link } from "react-router-dom";
import { useUserVideosQuery } from "../../generated/graphql";
import { getStringToDate } from "../../utils/dateHelper";
import { useCallback, useEffect } from "react";
import { NetworkStatus } from "@apollo/client";
import Spinner from "../Spinner";

interface UserVideosProps {
  userId: string;
}

const UserVideos: React.FC<UserVideosProps> = ({ userId }) => {
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

  if (!data?.videoUser && loading) {
    return <Spinner />;
  }

  if (!data?.videoUser) return <h2>Không có video nào được tải lên</h2>;

  return (
    <div className={styles["user-videos"]}>
      <h3>Video tải lên</h3>
      <div className={styles.layout}>
        {data.videoUser.paginatedVideos.map((video, index) => (
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
                <div className={styles["layout-content_inf"]}>
                  <h3 className={styles["layout-content_title"]}>
                    {video.title}
                  </h3>
                  <time className={styles["layout-content_time"]}>
                    {getStringToDate(video.createdAt)}
                  </time>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {loadingMore && <Spinner />}
      {data.videoUser.hasMore && <button onClick={loadMore}>show more</button>}
    </div>
  );
};

export default UserVideos;
