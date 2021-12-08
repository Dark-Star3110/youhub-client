import { useContext } from "react";
import { NavContext } from "../../contexts/NavContext";

//use micro
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";
import styles from "./TopBar.module.scss";
import user_img from "../../assets/img/user.png";

const TopBar = () => {
  const { toggleNav } = useContext(NavContext);

  return (
    <div className={styles.topbar}>
      <div className={styles.toggle} onClick={toggleNav}>
        <i className="fas fa-bars"></i>
      </div>
      <div className={styles.search}>
        <input type="text" placeholder="Tìm kiếm" />
        <button>
          <i className="fas fa-search"></i>
        </button>
        <span className={styles.voice}>
          <i className="fas fa-microphone"></i>
        </span>
      </div>
      <div className={styles.user}>
        <i className={styles["user-item"] + " fas fa-video"}></i>
        <i className={styles["user-item"] + " fas fa-th"}></i>
        <i className={styles["user-item"] + " far fa-bell"}></i>
        <img
          className={styles["user-item"] + " " + styles["user-img"]}
          src={user_img}
          alt="user"
        />
      </div>
    </div>
  );
};

export default TopBar;
