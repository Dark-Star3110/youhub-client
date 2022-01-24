import styles from "./LibraryVideos.module.scss";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { NetworkStatus } from "@apollo/client";
import {
  useVideosVotedQuery,
  useVideosWatchLaterQuery,
  VoteType,
} from "../../generated/graphql";
import { useLogin } from "../../contexts/UserContext";
import { getDateFromString } from "../../utils/dateHelper";

interface LibraryVideosProps {
  slug: string;
}

const LibraryVideos = ({ slug }: LibraryVideosProps) => {
  const { cache } = useLogin();
  const {
    data: watchData,
    loading: watchLoading,
    fetchMore: watchFetchMore,
    networkStatus: watchNetworkStatus,
  } = useVideosWatchLaterQuery({
    variables: {
      limit: 12,
    },
    skip: slug !== "playlist",
    notifyOnNetworkStatusChange: true,
  });
  const {
    data: voteData,
    loading: voteLoading,
    fetchMore: voteFetchMore,
    networkStatus: voteNetworkStatus,
  } = useVideosVotedQuery({
    variables: {
      limit: 12,
      type: slug === "disliked" ? VoteType.Dislike : VoteType.Like,
    },
    skip: slug === "playlist",
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    return () => {
      if (slug !== "playlist") {
        cache.evict({ fieldName: "videosVoted" });
      }
    };
  }, [cache, slug]);

  const handleScroll = useCallback(() => {
    let condition: number = 0;
    if (document.documentElement.scrollHeight < 1500) condition = 0.38;
    else if (document.documentElement.scrollHeight < 2500) condition = 0.66;
    else if (document.documentElement.scrollHeight < 3500) condition = 0.8;
    else condition = 0.9;
    if (window.scrollY / document.documentElement.scrollHeight >= condition) {
      if (
        slug === "playlist" &&
        !watchLoading &&
        watchData?.videosWatchLater?.hasMore
      ) {
        watchFetchMore({
          variables: { cursor: watchData.videosWatchLater.cursor },
        });
      }
      if (
        slug !== "playlist" &&
        !voteLoading &&
        voteData?.videosVoted?.hasMore
      ) {
        voteFetchMore({ variables: { cursor: voteData.videosVoted.cursor } });
      }
    }
  }, [
    slug,
    voteData?.videosVoted?.cursor,
    voteData?.videosVoted?.hasMore,
    voteFetchMore,
    voteLoading,
    watchData?.videosWatchLater?.cursor,
    watchData?.videosWatchLater?.hasMore,
    watchFetchMore,
    watchLoading,
  ]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const loadingMore =
    slug === "playlist"
      ? watchNetworkStatus === NetworkStatus.fetchMore
      : voteNetworkStatus === NetworkStatus.fetchMore;

  const data =
    slug === "playlist" ? watchData?.videosWatchLater : voteData?.videosVoted;

  const videos =
    slug === "playlist"
      ? watchData?.videosWatchLater?.paginatedVideos
      : voteData?.videosVoted?.paginatedVideos;
  const loading = slug === "playlist" ? watchLoading : voteLoading;

  if (loading && !videos && !data)
    return (
      <h1>
        <Spinner />
      </h1>
    );
  if (!loading && (!videos || videos.length <= 0))
    return (
      <div className={styles.container}>
        <div className={styles["no-video"]}>
          Chưa có video nào trong danh sách
        </div>
      </div>
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
                  <h4 className={styles["layout-content_autname"]}>
                    {video.user.firstName + " " + video.user.lastName}
                  </h4>
                  <time className={styles["layout-content_time"]}>
                    {getDateFromString(video.createdAt)}
                  </time>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {loadingMore && <Spinner />}

      {data?.hasMore && <button>Load More</button>}
    </div>
  );
};

export default LibraryVideos;
