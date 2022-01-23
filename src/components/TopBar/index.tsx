import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExtraNavContext } from "../../contexts/ExtraNavContext";
import { NavContext } from "../../contexts/NavContext";
import { ToastContext } from "../../contexts/ToastContext";
import { useLogin } from "../../contexts/UserContext";
import {
  useLogoutMutation,
  useNotificationLazyQuery,
} from "../../generated/graphql";
import { useRouter } from "../../hooks/useRouter";
import Notify from "../Notify";
import Spinner from "../Spinner";
//use micro
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import styles from "./TopBar.module.scss";

interface TopBarProps {
  type: string;
}

const TopBar = ({ type }: TopBarProps) => {
  // let notiInfo;
  // voice search
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  // state
  const [show, setShow] = useState<"" | "create" | "user" | "noti">("");
  const [searchInput, setSearchInput] = useState("");
  const [numNoti, setNumNoti] = useState<number>(0);

  const router = useRouter();
  // context
  const { toggleNav } = useContext(NavContext);
  const { toggleExtraNav } = useContext(ExtraNavContext);
  const { notify } = useContext(ToastContext);
  const {
    state: { details },
    setState: setUserContext,
    cache,
    socket,
  } = useLogin();

  const [notiQuery] = useNotificationLazyQuery();

  const [logoutMutation] = useLogoutMutation();

  const logoutHandler = async () => {
    const response = await logoutMutation();
    if (response.data?.logout) {
      setUserContext((preValues) => ({
        ...preValues,
        details: undefined,
        token: undefined,
      }));
      await cache.reset();
      window.localStorage.setItem("logout", Date.now().toString());
      window.localStorage.removeItem("login");
      router.push("/");
    } else {
      notify("error", "Có lỗi xảy ra, vui lòng thử lại!😌");
    }
    // check error here
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    if (details?.id) {
      socket.emit("get-num-noti", details.id);
    }
  }, [socket, details?.id]);

  useEffect(() => {
    socket.once("return-num-noti", (numNoti: number) => {
      setNumNoti(numNoti);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("notify", async (notiId: string) => {
      const response = await notiQuery({
        variables: { id: notiId },
      });
      console.log(response);
      if (!response.data || !response.data.notification) return;
      else {
        cache.modify({
          fields: {
            notifications(existing) {
              const refNoti = `Notification:${response.data?.notification?._id}`;
              if (!existing)
                return {
                  totalCount: 1,
                  cursor: 1,
                  hasMore: false,
                  paginatedNotification: [{ __ref: refNoti }],
                };
              else
                return {
                  ...existing,
                  totalCount: existing.totalCount + 1,
                  paginatedNotification: [
                    { __ref: refNoti },
                    ...existing.paginatedNotification,
                  ],
                };
            },
          },
        });
        setNumNoti((prev) => prev + 1);
      }
    });
  }, [socket, notiQuery, cache]);

  // voice search
  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      notify("error", "Trình duyệt bạn sử dụng không hỗ trợ chức năng này");
    }
    if (listening) {
      setSearchInput(transcript);
    }
    if (!listening && transcript !== "") {
      notify("success", "nghe rồi con điz 🤡");
      SpeechRecognition.stopListening();
    }
  }, [browserSupportsSpeechRecognition, listening, transcript, notify]);

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
        <span
          className={styles.voice}
          onClick={async () => await SpeechRecognition.startListening()}
        >
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
              <i
                className={
                  styles["user-item"] +
                  " " +
                  styles[`${show === "create" ? "bold" : ""}`] +
                  " fas fa-video"
                }
              ></i>
            </div>
            <div>
              <i className={styles["user-item"] + " fas fa-th"}></i>
            </div>
            <div
              className={styles["noti-btn"]}
              onClick={() => {
                setShow(show === "noti" ? "" : "noti");
                // socket.emit("read-notify", details.id);
              }}
            >
              <i
                className={
                  styles["user-item"] +
                  " " +
                  styles[`${show === "noti" ? "bold" : ""}`] +
                  " far fa-bell"
                }
              ></i>
              {numNoti > 0 && (
                <div className={styles["noti-num"]}>{numNoti}</div>
              )}
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
                  <div
                    className={styles["user-info-head__title"]}
                    onClick={() => {
                      setShow("");
                    }}
                  >
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
                <Link to="/donate">
                  <div
                    className={styles["user-info-item"]}
                    onClick={() => {
                      setShow(show === "user" ? "" : "user");
                    }}
                  >
                    <span className={styles["user-info-icon"]}>
                      <i className="fas fa-donate"></i>
                    </span>
                    <span className={styles["user-info-title"]}>
                      Giao dịch và mua gói thành viên
                    </span>
                  </div>
                </Link>
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
                    notify(
                      "warning",
                      "Vì đã hết hạn deadline nên chức năng này sẽ được phát triển trong tương lai 😭"
                    );
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
          {show === "noti" && (
            <div className="fixed-wrapper" onClick={() => setShow("")}>
              <Notify onChange={setNumNoti} />
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
