import { Link } from "react-router-dom";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { useRouter } from "../../hooks/useRouter";
import LibraryVideos from "../LibraryVideos";
import styles from "./Library.module.scss";

const Library = () => {
  useCheckAuth();
  const router = useRouter();
  const slug = router.query.slug as string;

  return (
    <div className={styles["library"]}>
      <div className={styles["menu"]}>
        <ul>
          <li>
            <Link to="/library/playlist">
              <span className={styles["icon"]}>
                <i className="far fa-clock"></i>
              </span>
              <span className={styles["title"]}>Xem sau</span>
            </Link>
          </li>
          <li>
            <Link to="/library/liked">
              <span className={styles["icon"]}>
                <i className="far fa-thumbs-up"></i>
              </span>
              <span className={styles["title"]}>Video đã thích</span>
            </Link>
          </li>
          <li>
            <Link to="/library/disliked">
              <span className={styles["icon"]}>
                <i className="far fa-calendar-times"></i>
              </span>
              <span className={styles["title"]}>Không quan tâm</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles["videos"]}>
        <LibraryVideos slug={slug} />
      </div>
    </div>
  );
};

export default Library;
