import { useLogin } from "../../contexts/UserContext";
import { useRouter } from "../../hooks/useRouter";
import Spinner from "../Spinner";
import styles from "./User.module.scss";
import banner from "../../assets/img/banner.jpg";
import { useState } from "react";
import UserVideos from "../UserVideos";
import { Link } from "react-router-dom";

const User = () => {
  // state
  const [tab, setTab] = useState("home");
  const [pgStyle, setPgStyle] = useState({
    left: 0,
    width: "127px",
  });

  const router = useRouter();
  const userId = router.query.slug as string;

  const {
    state: { details },
  } = useLogin();

  const handleClick = (e: React.MouseEvent) => {
    const left = (e.target as HTMLSpanElement).offsetLeft;
    const width = (e.target as HTMLSpanElement).offsetWidth + "px";
    setPgStyle({ left, width });
    const newTab = (e.target as HTMLSpanElement).id;
    setTab(newTab);
  };

  return (
    <div className={styles.container}>
      {details ? (
        <>
          <div className={styles.banner}>
            <img src={(details.banner_url as string) ?? banner} alt="" />
          </div>
          <div className={styles.controls}>
            <div className={styles["user"]}>
              <div className={styles["user__inf"]}>
                <div className={styles["user__img"]}>
                  <img src={details.image_url as string} alt="user" />
                </div>
                <div className={styles["user__name"]}>
                  <h2>{details.firstName + " " + details.lastName}</h2>
                  <small>69N Người đăng ký</small>
                </div>
              </div>
              <div className={styles.btn}>
                {details.id === userId ? (
                  <Link to="/me">
                    <button className={styles["edit-btn"]}>CHỈNH SỬA</button>
                  </Link>
                ) : (
                  <button className={styles["scr-btn"]}>ĐĂNG KÝ</button>
                )}
              </div>
            </div>
            <div className={styles.menu}>
              <span
                className={styles["menu-item"]}
                id="home"
                onClick={handleClick}
              >
                Trang chủ
              </span>
              <span
                className={styles["menu-item"]}
                id="videos"
                onClick={handleClick}
              >
                Video
              </span>
              <span
                className={styles["menu-item"]}
                id="intro"
                onClick={handleClick}
              >
                Giới thiệu
              </span>
              <span className={styles["menu-proges"]} style={pgStyle}></span>
            </div>
          </div>
          <div className={styles["content"]}>
            {tab === "home" && <h2>Sin lỗi vì không biết để gì được hưm</h2>}
            {tab === "videos" && <UserVideos />}
            {tab === "intro" && (
              <div className={styles["intro"]}>
                <div className={styles["intro-detail"]}>
                  <div className={styles["intro-detail__item"]}>
                    <h3>Mô tả</h3>
                    <pre>{details.channelDecscription ?? "chưa có mô tả"}</pre>
                  </div>
                  <div className={styles["intro-detail__item"]}>
                    <h3>Chi tiết</h3>
                    <small>Địa điểm: Việt Nam</small>
                  </div>
                </div>
                <div className="intro-statistic">
                  <h4>Thống kê</h4>
                  <h4>Đã tham gia {details.createdAt}</h4>
                  <h4>69 videos</h4>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default User;
