import { NetworkStatus } from "@apollo/client";
import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFindQuery } from "../../generated/graphql";
import { useRouter } from "../../hooks/useRouter";
import { getDateFromString } from "../../utils/dateHelper";
import Spinner from "../Spinner";
import styles from "./Search.module.scss";

const Search = () => {
  const router = useRouter();
  const key = router.query.q;

  const { data, loading, fetchMore, networkStatus } = useFindQuery({
    variables: {
      query: key as string,
      limit: 1,
    },
    notifyOnNetworkStatusChange: true,
  });

  const loadingMore = networkStatus === NetworkStatus.fetchMore;

  const loadMore = () => {
    fetchMore({ variables: { cursor: data?.find?.cursor } });
  };

  const handleScroll = useCallback(() => {
    let condition: number = 0;
    if (document.documentElement.scrollHeight < 1500) condition = 0.38;
    else if (document.documentElement.scrollHeight < 2500) condition = 0.66;
    else if (document.documentElement.scrollHeight < 3500) condition = 0.8;
    else condition = 0.9;
    if (
      window.scrollY / document.documentElement.scrollHeight >= condition &&
      data?.find?.hasMore
    ) {
      if (!loading) {
        fetchMore({ variables: { cursor: data?.find?.cursor } });
      }
    }
  }, [data?.find?.cursor, fetchMore, data?.find?.hasMore, loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const videosSearched = data?.find?.paginatedVideos;

  if (loading && !data?.find)
    return (
      <h1>
        <Spinner />
      </h1>
    );

  if (!loading && !data?.find) return <h2>Không có kết quả</h2>;

  return (
    <div className={styles.container}>
      <div className={styles["content"]}>
        <h3 className={styles["content-title"]}>
          {data?.find?.totalCount} kết quả được tìm thấy
        </h3>
        {videosSearched?.map((video) => (
          <Link to={`/watch/${video.id}`} key={video.id}>
            <div className={styles["secondary-item"]}>
              <div className={styles["secondary-item_img"]}>
                <img src={video.thumbnailUrl as string} alt="video" />
              </div>
              <div className={styles["secondary-item_content"]}>
                <h3>
                  {video.title} - {video.description}
                </h3>
                <h4>{video.user.fullName}</h4>
                <h4>{getDateFromString(video.createdAt)}</h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {loadingMore && <Spinner />}

      {data?.find?.hasMore && <button onClick={loadMore}>Load More</button>}
    </div>
  );
};

export default Search;
