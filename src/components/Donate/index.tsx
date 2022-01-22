import { useState } from "react";
import styles from "./Donate.module.scss";
import milo from "../../assets/img/milo.png";
import banner from "../../assets/img/banner.png";
import logo from "../../assets/img/logo.png";

const Donante = () => {
  const [count, setCount] = useState(1);
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles["logo-milo"]}>
          <img src={milo} alt="milo" />
        </div>
        <div className={styles["logo"]}>
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className={styles.banner}>
        <img src={banner} alt="banner" />
      </div>
      <div className={styles.content}>
        <div className={styles["content-inf"]}>
          <p>
            💩💩Bạn nào thấy hay có thể ủng hộ cho mình hộp milo, gói oreo hay
            chỉ là gói mì tôm hảo hảo cũng được. Toàn bộ số tiền sẽ được sử dụng
            để vận hành, duy trì và phát triển website trong tương lai.
          </p>
        </div>
        <div className={styles["content-menu"]}>
          <h3>Mua cho YouHub hộp milo</h3>
          <div className={styles["content-menu__item"]}>
            <div className={styles["content-menu__icon"]}>
              <img src={milo} alt="milo" />
            </div>
            <small>X</small>
            <div
              className={
                styles["content-menu__count"] +
                " " +
                styles[count === 1 ? "active" : ""]
              }
              onClick={() => setCount(1)}
            >
              1
            </div>
            <div
              className={
                styles["content-menu__count"] +
                " " +
                styles[count === 3 ? "active" : ""]
              }
              onClick={() => setCount(3)}
            >
              3
            </div>
            <div
              className={
                styles["content-menu__count"] +
                " " +
                styles[count === 5 ? "active" : ""]
              }
              onClick={() => setCount(5)}
            >
              5
            </div>
            <div
              className={
                styles["content-menu__count"] +
                " " +
                styles[count === 8 ? "active" : ""]
              }
              onClick={() => setCount(8)}
            >
              8
            </div>
          </div>
          <button className={styles["content-menu__btn"]}>
            <a
              href="https://me.momo.vn/youhub"
              target="_blank"
              rel="noreferrer"
            >
              Ủng hộ {count * 8}000 VNĐ
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Donante;
