import { useEffect, useState } from "react";
import { useRouter } from "../../hooks/useRouter";

import styles from "./Watch.module.scss";

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
      <iframe
        title="Drive video player"
        src={`https://drive.google.com/file/d/${videoId}/preview`}
        width="700"
        height="480"
        allow="autoplay"
      ></iframe>
    </div>
  );
};

export default Watch;
