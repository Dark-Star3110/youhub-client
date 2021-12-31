import { Reference } from "@apollo/client";
import { useEffect } from "react";
import { useLogin } from "../../contexts/UserContext";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { useRouter } from "../../hooks/useRouter";
import Comment from "../Comment";
import Video from "../Video";
import VideoConcern from "../VideoConcern";
import styles from "./Watch.module.scss";

const Watch = () => {
  useCheckAuth();
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
      cache.modify({
        fields: {
          comments(existing) {
            existing.paginatedComments.forEach((comment: Reference) => {
              cache.evict({ id: comment.__ref });
            });
          },
        },
      });
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
