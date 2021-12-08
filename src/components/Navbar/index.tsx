import { useContext } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/img/logo.png";
import { NavContext } from "../../contexts/NavContext";
import styles from "./NavBar.module.scss";

const Navbar = () => {
  // context
  const { action } = useContext(NavContext);

  return (
    <div className={styles["navigation"] + " " + styles[action]}>
      <ul>
        <li>
          <Link to="/">
            <span className={styles.icon}>
              <i className="fab fa-youtube"></i>
            </span>
            <div className={styles.logo}>
              <img src={logo} alt="logo" />
            </div>
          </Link>
        </li>
        <li>
          <Link to="/">
            <span className={styles.icon}>
              <i className="fas fa-home"></i>
            </span>
            <span className={styles.title}>Trang chủ</span>
          </Link>
        </li>
        <li>
          <Link to="/explore">
            <span className={styles.icon}>
              <i className="far fa-compass"></i>
            </span>
            <span className={styles.title}>Khám phá</span>
          </Link>
        </li>
        <li>
          <Link to="/subscriptions">
            <span className={styles.icon}>
              <i className="fab fa-youtube-square"></i>
            </span>
            <span className={styles.title}>Kênh đăng ký</span>
          </Link>
        </li>
        <li>
          <Link to="/library">
            <span className={styles.icon}>
              <i className="far fa-play-circle"></i>
            </span>
            <span className={styles.title}>Thư viện</span>
          </Link>
        </li>
        <li>
          <Link to="/contact">
            <span className={styles.icon}>
              <i className="fas fa-phone-square-alt"></i>
            </span>
            <span className={styles.title}>Liên hệ</span>
          </Link>
        </li>
        <li>
          <Link to="/">
            <span className={styles.icon}>
              <i className="fas fa-sign-out-alt"></i>
            </span>
            <span className={styles.title}>Đăng xuất</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
