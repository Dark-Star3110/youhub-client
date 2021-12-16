import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { NavContext } from "../../contexts/NavContext";

//use micro
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";
import styles from "./TopBar.module.scss";
import { useLogin } from "../../contexts/UserContext";
import { useLogoutMutation } from "../../generated/graphql";
import { useRouter } from "../../hooks/useRouter";

const TopBar = () => {
  // state
  const [show, setShow] = useState("");

  const router = useRouter()
  // context
  const { toggleNav } = useContext(NavContext);
  const { state: {details}, setState: setUserContext } = useLogin()
  
  const [ logoutMutation ] = useLogoutMutation()

  const logoutHandler = async () => {
    const response = await logoutMutation()
    if (response.data?.logout) {
      console.log('qua day');
      setUserContext(preValues => ({
        ...preValues,
        details: undefined,
        token: undefined
      }))
      window.localStorage.setItem('logout', Date.now().toString())
      router.push('/')
    }
    // check error here
  }

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
      {details ? (
        <>
          <div className={styles.user}>
            <div
              className={styles["create-btn"]}
              onClick={() => {
                setShow(show === "create" ? "" : "create");
              }}
            >
              <i className={styles["user-item"] + " fas fa-video"}></i>
            </div>
            <div>
              <i className={styles["user-item"] + " fas fa-th"}></i>
            </div>
            <div className={styles["noti-btn"]}>
              <i className={styles["user-item"] + " far fa-bell"}></i>
            </div>
            <div
              className={styles["user-item-img"]}
              onClick={() => {
                setShow(show === "user" ? "" : "user");
              }}
            >
              <img className={styles["user-img"]} src={details.image_url as string} alt="user" />
            </div>
          </div>
          <div className={styles["user-info"] + " " + styles["show-" + show]}>
            <div className={styles["user-info-head"]}>
              <img className={styles["user-info-img"]} src={details.image_url as string} alt="user" />
              <div className={styles["user-info-head__title"]}>
                <h3>{`${details.firstName} ${details.lastName}`}</h3>
                <p>Quản lí tài khoản của bạn</p>
              </div>
            </div>
            <div className={styles["user-info-item"]}>
              <span className={styles["user-info-icon"]}>
                <i className="fas fa-user-circle"></i>
              </span>
              <span className={styles["user-info-title"]}>Kênh của bạn</span>
            </div>
            <div className={styles["user-info-item"]}>
              <span className={styles["user-info-icon"]}>
                <i className="fas fa-donate"></i>
              </span>
              <span className={styles["user-info-title"]}>
                Giao dịch và mua gói thành viên
              </span>
            </div>
            <div className={styles["user-info-item"]} onClick={logoutHandler}>
              <span className={styles["user-info-icon"]}>
                <i className="fas fa-sign-out-alt"></i>
              </span>
              <span className={styles["user-info-title"]}>Đăng xuất</span>
            </div>
          </div>
          <div
            className={styles["video-create-menu"] + " " + styles["show-" + show]}
          >
            <div
              className={styles["video-create-item"]}
              onClick={() => {
                setShow(show === "create" ? "" : "create");
              }}
            >
              <Link to="/create">
                <span className={styles["video-create-icon"]}>
                  <i className="far fa-file-video"></i>
                </span>
                <span className={styles["video-create-title"]}>Tải video lên</span>
              </Link>
            </div>
            <div
              className={styles["video-create-item"]}
              onClick={() => {
                setShow(show === "create" ? "" : "create");
              }}
            >
              <span className={styles["video-create-icon"]}>
                <i className="fas fa-film"></i>
              </span>
              <span className={styles["video-create-title"]}>Phát trực tiếp</span>
            </div>
          </div>
        </>
      ) : (
        <Link to="/login" className={styles["login-btn"]}>
          <span className={styles["login-btn__icon"]}>
            <i className="far fa-user-circle"></i>
          </span>
          <span className={styles["login-btn__title"]}>Đăng nhập</span>
        </Link>
      )}
    </div>
  );
};

export default TopBar;
