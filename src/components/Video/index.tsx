import { useState } from "react";
import styles from "./Video.module.scss";
import author_img from "../../assets/img/author.jpg";

interface VideoProps {
  videoId: string;
}

const Video = ({ videoId }: VideoProps) => {
  const [action, setAction] = useState("");

  const handleLike = () => {
    const newAction = action === "like" ? "" : "like";
    setAction(newAction);
  };

  const handleDisLike = () => {
    const newAction = action === "dislike" ? "" : "dislike";
    setAction(newAction);
  };

  return (
    <>
      <iframe
        title="Drive video player"
        src={`https://drive.google.com/file/d/${videoId}/preview`}
        allow="autoplay"
        className={styles["primary-video"]}
      ></iframe>
      <div className={styles["primary-video_inf"]}>
        <h3>This is Current video of Title</h3>
        <div className={styles["primary-video_control"]}>
          <time>Đã tải lên vào 24 thg 12,2021</time>
          <div className={styles["primary-video_icon"]}>
            <div
              className={
                styles["primary-video_icon-item"] +
                " " +
                styles[action] +
                " " +
                styles["like-btn"]
              }
              onClick={handleLike}
            >
              <span>
                <i className="far fa-thumbs-up"></i>
              </span>
              <span>THÍCH</span>
            </div>
            <div
              className={
                styles["primary-video_icon-item"] +
                " " +
                styles[action] +
                " " +
                styles["dislike-btn"]
              }
              onClick={handleDisLike}
            >
              <span>
                <i className="far fa-thumbs-down"></i>
              </span>
              <span>KHÔNG THÍCH</span>
            </div>
            <div className={styles["primary-video_icon-item"]}>
              <span>
                <i className="far fa-flag"></i>
              </span>
              <span>BÁO CÁO</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles["primary-video_author"]}>
        <div className={styles["primary-video_author__inf"]}>
          <div className={styles["primary-video_author__img"]}>
            <img src={author_img} alt="author" />
          </div>
          <div>
            <h4>Author Name</h4>
            <small>69N người đăng ký</small>
          </div>
        </div>
        <div className={styles.btn}>
          <button className={styles["scr-btn"]}>ĐĂNG KÝ</button>
        </div>
      </div>
      <div className={styles["primary-descript"]}>
        <pre>
          {`This video is made to entertain and satisfy viewers.
I don't own anything related to the background photo,
credits go to the respective owners of the audio and the photo.
#RADWIMPS #Nandemonaiya #なんでもないや
Nhạc trong video này
Tìm hiểu thêm
Bài hát
なんでもないや(movie ver.)
Nghệ sĩ
RADWIMPS
Bên cấp phép cho YouTube
ASCAP và 14 Hiệp hội bảo vệ quyền âm nhạc.`}
        </pre>
      </div>
    </>
  );
};

export default Video;
