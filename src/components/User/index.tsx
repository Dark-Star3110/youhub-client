import { useEffect, useState } from "react";
import banner from "../../assets/img/banner.jpg";
import { useLogin } from "../../contexts/UserContext";
import { useUserQuery } from "../../generated/graphql";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { useRouter } from "../../hooks/useRouter";
import { getDateFromString } from "../../utils/dateHelper";
import { getNumToString } from "../../utils/numberHelper";
import Spinner from "../Spinner";
import UserVideos from "../UserVideos";
import SubscribeBtn from "./SubscribeBtn/SubscribeBtn";
import styles from "./User.module.scss";
import UserNotFound from "./UserNotFound";

const User = () => {
  useCheckAuth();
  const router = useRouter();
  const userId = router.query.slug as string;
  // state
  const [tab, setTab] = useState("home");
  const [pgStyle, setPgStyle] = useState({
    left: 0,
    width: "127px",
  });

  const {
    state: { details },
    cache,
  } = useLogin();
  const { data, loading } = useUserQuery({
    variables: { userId },
    skip: !!window.localStorage.getItem("login") && !details,
  });

  useEffect(() => {
    return () => {
      if (data?.user) {
        cache.evict({ id: `User:${data.user.id}` });
        cache.evict({ fieldName: "videoUser" });
      }
    };
  }, [cache, data?.user]);

  const handleClick = (e: React.MouseEvent) => {
    const left = (e.target as HTMLSpanElement).offsetLeft;
    const width = (e.target as HTMLSpanElement).offsetWidth + "px";
    setPgStyle({ left, width });
    const newTab = (e.target as HTMLSpanElement).id;
    setTab(newTab);
  };
  const user = data?.user;

  if (loading || (!!window.localStorage.getItem("login") && !details))
    return (
      <h1>
        <Spinner />
      </h1>
    );
  if (!user) return <UserNotFound />;
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <img src={(user.banner_url as string) || banner} alt="" />
      </div>
      <div className={styles.controls}>
        <div className={styles["user"]}>
          <div className={styles["user__inf"]}>
            <div className={styles["user__img"]}>
              <img src={user.image_url as string} alt="user" />
            </div>
            <div className={styles["user__name"]}>
              <h2>{user.firstName + " " + user.lastName}</h2>
              <small>{getNumToString(user.numSubscribers)} người đăng ký</small>
            </div>
          </div>
          <SubscribeBtn
            userId={userId}
            subscribeStatus={user.subscribeStatus}
            fullName={user.fullName as string}
          />
        </div>
        <div className={styles.menu}>
          <span className={styles["menu-item"]} id="home" onClick={handleClick}>
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
        {tab === "videos" && <UserVideos userId={userId} />}
        {tab === "intro" && (
          <div className={styles["intro"]}>
            <div className={styles["intro-detail"]}>
              <div className={styles["intro-detail__item"]}>
                <h3>Mô tả</h3>
                <pre>{user.channelDecscription ?? "chưa có mô tả"}</pre>
              </div>
              <div className={styles["intro-detail__item"]}>
                <h3>Chi tiết</h3>
                <small>Địa điểm: Việt Nam</small>
              </div>
            </div>
            <div className="intro-statistic">
              <h4>Thống kê</h4>
              <h4>Đã tham gia vào {getDateFromString(user.createdAt)}</h4>
              <h4>{user.numVideo} videos</h4>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
