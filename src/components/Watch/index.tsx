import { useEffect } from "react";
import { useLogin } from "../../contexts/UserContext";
import { useRouter } from "../../hooks/useRouter";

import styles from "./Watch.module.scss";

const Watch = () => {
  // location
  const router = useRouter();

  const { socket } = useLogin();

  const videoId = router.query.slug as string;

  useEffect(() => {
    if (videoId) {
      socket.emit("join-room", videoId);
    }
    return () => {
      socket.emit("leave-room", videoId);
    };
  }, [socket, videoId]);

  return (
    <div className={styles.watch}>
      {/* <iframe
        title="Drive video player"
        src={`https://drive.google.com/file/d/${videoId}/preview`}
        width="700"
        height="480"
        allow="autoplay"
      ></iframe> */}
      <video id="videoPlayer" width="650" height="400" controls muted>
        <source
          src={`http://localhost:8000/video/play-video/${videoId}`}
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default Watch;
