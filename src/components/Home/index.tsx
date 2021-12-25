import { NetworkStatus } from "@apollo/client";
import { Link } from "react-router-dom";
import { useVideosQuery } from "../../generated/graphql";
import SlickNav from "../SlickNav";
import Spinner from "../Spinner";
import styles from "./Home.module.scss";

const limit = 4;

const Home = () => {
  const { data, loading, fetchMore, networkStatus } = useVideosQuery({
    variables: {
      limit,
    },
    notifyOnNetworkStatusChange: true,
  });

  const loadingMore = networkStatus === NetworkStatus.fetchMore;

  const loadMore = () => {
    fetchMore({ variables: { cursor: data?.videos?.cursor } });
  };

  return (
    <div className={styles.home}>
      <SlickNav />
      <div className={styles.layout}>
        {data?.videos?.paginatedVideos.map((video, index) => (
          <Link to={`/watch/${video.id}`} key={index}>
            <div className={styles["layout-item"]}>
              <img
                src={
                  video.thumbnailUrl ||
                  "https://images6.alphacoders.com/311/thumbbig-311015.webp"
                }
                alt="img"
                className={styles["layout-img"]}
              />
              <div className={styles["layout-content"]}>
                <h3 className={styles["layout-content_title"]}>
                  {video.title}
                </h3>
                <h4 className={styles["layout-content_descript"]}>
                  {video.description}
                </h4>
                <time className={styles["layout-content_time"]}>
                  {video.createdAt}
                </time>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {!data?.videos && !loading && (
        <h1 style={{ marginTop: "20px" }}>Không có dữ liệu</h1>
      )}
      {data?.videos?.hasMore && <button onClick={loadMore}>Load More</button>}
      {loadingMore && <Spinner />}
    </div>
  );
};

export default Home;
