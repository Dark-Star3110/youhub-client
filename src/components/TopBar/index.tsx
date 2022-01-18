import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { NavContext } from "../../contexts/NavContext";

//use micro
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";
import styles from "./TopBar.module.scss";
import { useLogin } from "../../contexts/UserContext";
import { useLogoutMutation, useVideosQuery } from "../../generated/graphql";
import { useRouter } from "../../hooks/useRouter";
import { ExtraNavContext } from "../../contexts/ExtraNavContext";
import Spinner from "../Spinner";
import { Reference } from "@apollo/client/cache";
import { gql, NetworkStatus } from "@apollo/client";
import { getStringToDate } from "../../utils/dateHelper";

interface TopBarProps {
  type: string;
}
const limit = 12;

const TopBar = ({ type }: TopBarProps) => {
  // let notiInfo;
  // state
  const [show, setShow] = useState<"" | "create" | "user" | "noti">("");
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

  // noti 👀 ======================================================
  // lay tam video home 😃
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, loading, fetchMore, networkStatus } = useVideosQuery({
    variables: {
      limit,
    },
    notifyOnNetworkStatusChange: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadingMore = networkStatus === NetworkStatus.fetchMore;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadMore = () => {
    fetchMore({ variables: { cursor: data?.videos?.cursor } });
  };

  const handleScroll = useCallback(() => {
    let condition: number = 0;
    if (document.documentElement.scrollHeight < 1500) condition = 0.38;
    else if (document.documentElement.scrollHeight < 2500) condition = 0.66;
    else if (document.documentElement.scrollHeight < 3500) condition = 0.8;
    else condition = 0.9;
    if (
      window.scrollY / document.documentElement.scrollHeight >= condition &&
      data?.videos?.hasMore
    ) {
      if (!loading) {
        fetchMore({ variables: { cursor: data?.videos?.cursor } });
      }
    }
  }, [data?.videos?.cursor, fetchMore, data?.videos?.hasMore, loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const videos = data?.videos?.paginatedVideos;

  if (loading && !data?.videos)
    return (
      <h1>
        <Spinner />
      </h1>
    );

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
              <div className={styles["noti-menu"]}>
                <h3>Thông báo</h3>
                {videos?.map((video) => (
                  <Link to={`watch/${video.id}`} key={video.id}>
                    <div
                      className={styles["noti-item"]}
                      onClick={() => console.log("click")}
                    >
                      <div className={styles["noti-item__status"]}></div>
                      <div className={styles["noti-item__authorImg"]}>
                        <img
                          src={video.user.image_url as string}
                          alt={video.user.fullName as string}
                        />
                      </div>
                      <div className={styles["noti-item__content"]}>
                        <h4>
                          {video.user.fullName} đã vừa tải lên: {video.title}{" "}
                        </h4>
                        <small>{getStringToDate(video.createdAt)}</small>
                      </div>
                      <div className={styles["noti-item__videoImg"]}>
                        <img
                          src={video.thumbnailUrl as string}
                          alt={video.title}
                        />
                      </div>
                    </div>
                  </Link>
                ))}
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
