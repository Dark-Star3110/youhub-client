import { useEffect } from "react";
import { useLogin } from "../../contexts/UserContext";
import { useVideoQuery, Video as VideoType } from "../../generated/graphql";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { useRouter } from "../../hooks/useRouter";
import Spinner from "../Spinner";
import Video from "../Video";
import VideoConcern from "../VideoConcern";
import VideoNotFound from "../VideoNotFound";
import styles from "./Watch.module.scss";

const Watch = () => {
  useCheckAuth();
  // location
  const router = useRouter();

  const { socket, cache } = useLogin();

  const videoId = router.query.slug as string;

  const {
    state: { details },
  } = useLogin();

  useEffect(() => {
    if (videoId) {
      socket.emit("join-room", videoId);
    }
    return () => {
      socket.emit("leave-room", videoId);
      // clear cache comment paginated
      cache.evict({ fieldName: "comments" });
    };
  }, [socket, videoId, cache]);

  const { data: videoData, loading: queryLoading } = useVideoQuery({
    variables: { id: videoId },
    skip: !!!details,
  });

  if (!details || (details && queryLoading))
    return (
      <h1>
        <Spinner />
      </h1>
    );

  if (!videoData?.video && details && !queryLoading) return <VideoNotFound />;

  return (
    <div className={styles.watch}>
      <div className={styles["primary"]}>
        <Video videoData={videoData?.video as VideoType} />
      </div>
      <div className={styles["secondary"]}>
        <VideoConcern />
      </div>
    </div>
  );
};

export default Watch;
