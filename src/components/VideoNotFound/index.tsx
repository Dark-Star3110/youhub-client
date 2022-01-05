import { Link } from "react-router-dom";
import styles from "./VideoNotFound.module.scss";
import videoNotFound from "../../assets/img/video-not-found.png";

const VideoNotFound = () => {
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["item"]}>
        <img src={videoNotFound} alt="video-not-found" />
      </div>
      <div className={styles["item"]}>
        <h2>Video này không còn hoạt động</h2>
      </div>
      <div className={styles["item"]}>
        <Link to="/">
          <button>Quay về trang chủ</button>
        </Link>
      </div>
    </div>
  );
};

export default VideoNotFound;
