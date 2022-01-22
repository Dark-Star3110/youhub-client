import { NetworkStatus } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFindLazyQuery } from "../../generated/graphql";
import { useRouter } from "../../hooks/useRouter";
import { getDateFromString } from "../../utils/dateHelper";
import Spinner from "../Spinner";
import styles from "./Search.module.scss";
import notFind from "../../assets/img/404_search.jpg";
import { useLogin } from "../../contexts/UserContext";

const Search = () => {
  const { cache } = useLogin();

  const router = useRouter();
  const q = router.query.q;
  const [key, setKey] = useState(q as string);

  const [onSearch, { networkStatus, fetchMore, data, loading }] =
    useFindLazyQuery();

  const search = useCallback(async () => {
    const res = await onSearch({
      variables: {
        query: key,
        limit: 5,
      },
    });

    if (!res.error) {
      cache.modify({
        fields: {
          find(existing) {
            return res.data?.find;
          },
        },
      });
    }
  }, [cache, onSearch, key]);

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

  useEffect(() => {
    setKey(router.query.q as string);
    search();
  }, [router.query.q, search]);

  const videosSearched = data?.find?.paginatedVideos;

  if (loading && !data?.find)
    return (
      <h1>
        <Spinner />
      </h1>
    );

  if (!loading && !data?.find)
    return (
      <div className={styles.container}>
        <div className={styles.ops}>
          <div className={styles.notFind}>
            <div className={styles.meme}>
              <img src={notFind} alt="not find" />
            </div>
            <h2>Không có kết quả cho tìm kiếm của bạn 😥😥</h2>
          </div>
        </div>
      </div>
    );

  return (
    <div className={styles.container}>
      {data?.find?.totalCount ? (
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
                    {video.title} -{" "}
                    {video.description.length < 100
                      ? video.description
                      : video.description.slice(0, 50) + "..."}
                  </h3>
                  <h4>{video.user.fullName}</h4>
                  <h4>{getDateFromString(video.createdAt)}</h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className={styles.ops}>
          <div className={styles.notFind}>
            <div className={styles.meme}>
              <img src={notFind} alt="not find" />
            </div>
            <h2>Không có kết quả cho tìm kiếm của bạn 😥😥</h2>
          </div>
        </div>
      )}
      {loadingMore && <Spinner />}

      {data?.find?.hasMore && <button onClick={loadMore}>Load More</button>}
    </div>
  );
};

export default Search;
