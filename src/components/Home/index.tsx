import { NetworkStatus } from "@apollo/client";
import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../contexts/UserContext";
import { useVideosQuery } from "../../generated/graphql";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { useRouter } from "../../hooks/useRouter";
import { getStringToDate } from "../../utils/dateHelper";
import SlickNav from "../SlickNav";
import Spinner from "../Spinner";
import styles from "./Home.module.scss";

const limit = 12;

const Home = () => {
  const { loading: authLoading } = useCheckAuth();

  const router = useRouter();
  const {
    setState: setUserState,
    state: { checkPass },
  } = useLogin();

  useEffect(() => {
    if (!checkPass)
      setUserState((prev) => ({
        ...prev,
        checkPass: true,
      }));
  }, [checkPass, setUserState]);
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

  const videos = data?.videos?.paginatedVideos;

  if (authLoading || (loading && !data?.videos))
    return (
      <h1>
        <Spinner />
      </h1>
    );

  return (
    <div className={styles.home}>
      <SlickNav />
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
                <div
                  className={styles["layout-content_img"]}
                  title={video.user.fullName || ""}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    router.push(`/user/${video.user.id}`);
                  }}
                >
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
                  <h4
                    className={styles["layout-content_autname"]}
                    title={video.user.fullName || ""}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      router.navigate(`/user/${video.user.id}`);
                    }}
                  >
                    {video.user.fullName}
                  </h4>
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

      {data?.videos?.hasMore && <button onClick={loadMore}>Load More</button>}
    </div>
  );
};

export default Home;
