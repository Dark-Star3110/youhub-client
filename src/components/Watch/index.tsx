import { useEffect, useState } from "react";
import { useRouter } from "../../hooks/useRouter";
import Comment from "../Comment";

import styles from "./Watch.module.scss";
import Video from "../Video";
import VideoConcern from "../VideoConcern";

const Watch = () => {
  // state
  const [videoId, setVideoId] = useState("");

  // location
  const router = useRouter();

  // effect
  useEffect(() => {
    const { slug } = router.query;
    // console.log(slug);
    setVideoId(slug as string);
  }, [router.query]);

  return (
    <div className={styles.watch}>
      <div className={styles["primary"]}>
        <Video videoId={videoId} />
        <Comment />
      </div>
      <div className={styles["secondary"]}>
        <VideoConcern />
      </div>
    </div>
  );
};

export default Watch;
