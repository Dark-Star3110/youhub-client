import { Link } from "react-router-dom";
import styles from "./VideoConcern.module.scss";
import { useVideoConcernQuery } from "../../generated/graphql";
import Spinner from "../Spinner";
import { getDateFromString } from "../../utils/dateHelper";
import { NetworkStatus } from "@apollo/client";

const VideoConcern: React.FC<{ videoId: string }> = ({ videoId }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, loading, fetchMore, networkStatus } = useVideoConcernQuery({
    variables: {
      limit: 12,
      videoId,
    },
    notifyOnNetworkStatusChange: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadingMore = networkStatus === NetworkStatus.fetchMore;

  if (loading && !data?.videoConcern?.paginatedVideos) return <Spinner />;

  if (!loading && !data?.videoConcern?.paginatedVideos)
    return <h2>Không có đề xuất</h2>;

  return (
    <>
      {data?.videoConcern?.paginatedVideos.map((video) => (
        <Link to={`/watch/${video.id}`} key={video.id}>
          <div className={styles["secondary-item"]}>
            <div className={styles["secondary-item_img"]}>
              <img src={video.thumbnailUrl as string} alt="video" />
            </div>
            <div className={styles["secondary-item_content"]}>
              <h3>{video.title}</h3>
              <h4>{video.user.lastName + " " + video.user.firstName}</h4>
              <h4>{getDateFromString(video.createdAt)}</h4>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default VideoConcern;
