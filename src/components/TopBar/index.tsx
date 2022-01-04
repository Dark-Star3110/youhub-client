import { ChangeEvent, useContext, useState } from "react";
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
import { ExtraNavContext } from "../../contexts/ExtraNavContext";
import Spinner from "../Spinner";
import { Reference } from "@apollo/client/cache";
import { gql } from "@apollo/client";

interface TopBarProps {
  type: string;
}

const TopBar = ({ type }: TopBarProps) => {
  // state
  const [show, setShow] = useState<"" | "create" | "user">("");
  const [searchInput, setSearchInput] = useState("");

  const router = useRouter();
  // context
  const { toggleNav } = useContext(NavContext);
  const { toggleExtraNav } = useContext(ExtraNavContext);
  const {
    state: { details },
    setState: setUserContext,
    cache,
  } = useLogin();

  const [logoutMutation] = useLogoutMutation();

  const logoutHandler = async () => {
    const response = await logoutMutation();
    if (response.data?.logout) {
      setUserContext((preValues) => ({
        ...preValues,
        details: undefined,
        token: undefined,
      }));
      cache.evict({ fieldName: "me" });
      cache.modify({
        fields: {
          videos(existing) {
            existing.paginatedVideos.forEach((video: Reference) => {
              cache.writeFragment({
                id: video.__ref,
                fragment: gql`
                  fragment VoteVideo on Video {
                    voteStatus
                  }
                `,
                data: {
                  voteStatus: 0,
                },
              });
            });
          },
        },
      });
      window.localStorage.setItem("logout", Date.now().toString());
      window.localStorage.removeItem("login");

      router.push("/");
    }
    // check error here
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className={styles.topbar}>
      {type === "watch" ? (
        <div className={styles.toggle} onClick={() => toggleExtraNav()}>
          <i className="fas fa-align-left"></i>
        </div>
      ) : (
        <div className={styles.toggle} onClick={toggleNav}>
          <i className="fas fa-bars"></i>
        </div>
      )}
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Tìm kiếm"
          value={searchInput}
          onChange={handleSearch}
        />
        <Link to={`/search?q=${searchInput}`}>
          <button>
            <i className="fas fa-search"></i>
          </button>
        </Link>
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
              <img
                className={styles["user-img"]}
                src={details.image_url as string}
                alt="user"
              />
            </div>
          </div>
          {show === "user" && (
            <div className="fixed-wrapper" onClick={() => setShow("")}>
              <div
                className={styles["user-info"]}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles["user-info-head"]}>
                  <img
                    className={styles["user-info-img"]}
                    src={details.image_url as string}
                    alt="user"
                  />
                  <div className={styles["user-info-head__title"]}>
                    <h3>{`${details.firstName} ${details.lastName}`}</h3>
                    <Link to="/me">
                      <p>Quản lí tài khoản của bạn</p>
                    </Link>
                  </div>
                </div>
                <Link to={`user/${details.id}`}>
                  <div
                    className={styles["user-info-item"]}
                    onClick={() => {
                      setShow(show === "user" ? "" : "user");
                    }}
                  >
                    <span className={styles["user-info-icon"]}>
                      <i className="fas fa-user-circle"></i>
                    </span>
                    <span className={styles["user-info-title"]}>
                      Kênh của bạn
                    </span>
                  </div>
                </Link>
                <div className={styles["user-info-item"]}>
                  <span className={styles["user-info-icon"]}>
                    <i className="fas fa-donate"></i>
                  </span>
                  <span className={styles["user-info-title"]}>
                    Giao dịch và mua gói thành viên
                  </span>
                </div>
                <div
                  className={styles["user-info-item"]}
                  onClick={logoutHandler}
                >
                  <span className={styles["user-info-icon"]}>
                    <i className="fas fa-sign-out-alt"></i>
                  </span>
                  <span className={styles["user-info-title"]}>Đăng xuất</span>
                </div>
              </div>
            </div>
          )}
          {show === "create" && (
            <div className="fixed-wrapper" onClick={() => setShow("")}>
              <div
                className={styles["video-create-menu"]}
                onClick={(e) => e.stopPropagation()}
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
                    <span className={styles["video-create-title"]}>
                      Tải video lên
                    </span>
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
                  <span className={styles["video-create-title"]}>
                    Phát trực tiếp
                  </span>
                </div>
              </div>
            </div>
          )}
        </>
      ) : !window.localStorage.getItem("login") ? (
        <Link to="/login" className={styles["login-btn"]}>
          <div className={styles["outer"] + " " + styles["button"]}>
            <button>
              <i className="far fa-user-circle"></i> Đăng nhập
            </button>
            <span></span>
            <span></span>
          </div>
        </Link>
      ) : (
        <div>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default TopBar;
