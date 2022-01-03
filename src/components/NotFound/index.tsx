import styles from "./NotFound.module.scss";
import { Link } from "react-router-dom";

import logo404 from "../../assets/img/404_logo.svg";
import astronaut from "../../assets/img/astronaut.png";
import mars from "../../assets/img/mars.svg";
import spaceship from "../../assets/img/spaceship.svg";
import star from "../../assets/img/star.svg";

const NotFound = () => {
  return (
    <div
      className={styles.notfound}
      style={{
        backgroundImage: `url(${star}),linear-gradient(to bottom, #05007a, #4d007d)`,
      }}
    >
      <div
        className={styles["mars"]}
        style={{
          background: `url(${mars}) no-repeat bottom center`,
          backgroundSize: "cover",
        }}
      ></div>
      <img src={logo404} className={styles["logo-404"]} alt="img" />

      <p className={styles["title"]}>Oh no!!</p>
      <p className={styles["subtitle"]}>
        Bạn có thể đã viết sai URL <br /> hoặc yêu cầu được gửi đến một trang
        không tồn tại.
      </p>
      <div className={styles["back-home"]}>
        <Link className={styles["btn-back"]} to="/">
          Quay lại Trang Chủ
        </Link>
      </div>
      <img src={astronaut} className={styles["astronaut"]} alt="img" />
      <img src={spaceship} className={styles["spaceship"]} alt="img" />
    </div>
  );
};

export default NotFound;
