import { useEffect } from "react";
import { useLogin } from "../../contexts/UserContext";
import { useRouter } from "../../hooks/useRouter";
import Comment from "../Comment";
import Video from "../Video";
import VideoConcern from "../VideoConcern";
import styles from "./Watch.module.scss";

const Watch = () => {
  // location
  const router = useRouter();

  const { socket, cache } = useLogin();

  const videoId = router.query.slug as string;

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

  return (
    <div className={styles.watch}>
      <div className={styles["primary"]}>
        <Video videoId={videoId} />
        <Comment videoId={videoId} />
      </div>
      <div className={styles["secondary"]}>
        <VideoConcern />
      </div>
    </div>
  );
};

export default Watch;
