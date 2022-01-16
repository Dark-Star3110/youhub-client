import { gql } from "@apollo/client";
import clsx from "clsx";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContext } from "../../../contexts/ToastContext";
import { useLogin } from "../../../contexts/UserContext";
import {
  Action,
  useOnNotifyMutation,
  useSubscribeMutation,
} from "../../../generated/graphql";
import { useRouter } from "../../../hooks/useRouter";
import Modal from "../../Modal";
import styles from "./SubscribeBtn.module.scss";

interface SubscribeBtnProps {
  userId: string;
  subscribeStatus: {
    status: boolean;
    notification: boolean;
  };
  fullName?: string;
  numSubscribers: number;
}

const SubscribeBtn = ({
  userId,
  subscribeStatus,
  fullName,
  numSubscribers,
}: SubscribeBtnProps) => {
  const {
    state: { details },
    cache,
  } = useLogin();
  const router = useRouter();
  const { notify } = useContext(ToastContext);
  const [subscribeMutation] = useSubscribeMutation();
  const [setNotification] = useOnNotifyMutation();

  const [wantUnSub, setWantUnSub] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleSubscribeClick = async () => {
    if (!details) {
      router.push("/login");
      return;
    }
    const response = await subscribeMutation({
      variables: {
        chanelId: userId,
        action: Action.Activate,
      },
    });

    if (!response.data?.subscribe.success)
      notify("error", "Có lỗi xảy ra. Vui lòng thử lại!");
    else {
      notify("success", "Đã đăng ký kênh");
      cache.writeFragment({
        id: `User:${userId}`,
        fragment: gql`
          fragment UserUnSub on User {
            numSubscribers
            subscribeStatus {
              status
              notification
            }
          }
        `,
        data: {
          numSubscribers: numSubscribers + 1,
          subscribeStatus: {
            status: true,
            notification: false,
          },
        },
      });
    }
  };

  const handleUnsubscribeClick = async () => {
    const response = await subscribeMutation({
      variables: {
        chanelId: userId,
        action: Action.Disactivate,
      },
    });

    if (!response.data?.subscribe.success)
      notify("error", "Có lỗi xảy ra. Vui lòng thử lại!");
    else {
      notify("success", "Đã huỷ đăng ký kênh");
      cache.writeFragment({
        id: `User:${userId}`,
        fragment: gql`
          fragment UserUnSub on User {
            numSubscribers
            subscribeStatus {
              status
            }
          }
        `,
        data: {
          numSubscribers: numSubscribers - 1,
          subscribeStatus: {
            status: false,
          },
        },
      });
    }
    setWantUnSub(false);
    setShowMenu(false);
  };

  const handleOnNotification = async () => {
    if (!subscribeStatus.notification) {
      const response = await setNotification({
        variables: {
          chanelId: userId,
          action: Action.Activate,
        },
      });

      if (!response.data?.onNotification.success) {
        notify("error", "Có lỗi xảy ra. Vui lòng thử lại!");
      } else {
        setShowMenu(false);
        notify("success", "Đã bật thông báo");
        cache.writeFragment({
          id: `User:${userId}`,
          fragment: gql`
            fragment UserUnSub on User {
              subscribeStatus {
                notification
              }
            }
          `,
          data: {
            subscribeStatus: {
              notification: true,
            },
          },
        });
      }
    }
  };

  const handleOffNotification = async () => {
    if (subscribeStatus.notification) {
      const response = await setNotification({
        variables: {
          chanelId: userId,
          action: Action.Disactivate,
        },
      });

      if (!response.data?.onNotification.success) {
        notify("error", "Có lỗi xảy ra. Vui lòng thử lại!");
      } else {
        setShowMenu(false);
        notify("success", "Đã tắt thông báo");
        cache.writeFragment({
          id: `User:${userId}`,
          fragment: gql`
            fragment UserUnSub on User {
              subscribeStatus {
                notification
              }
            }
          `,
          data: {
            subscribeStatus: {
              notification: false,
            },
          },
        });
      }
    }
  };

  return (
    <div className={styles.btn}>
      {details?.id === userId ? (
        <Link to="/me">
          <button className={styles["edit-btn"]}>CHỈNH SỬA</button>
        </Link>
      ) : !subscribeStatus.status ? (
        <button className={styles["scr-btn"]} onClick={handleSubscribeClick}>
          ĐĂNG KÝ
        </button>
      ) : (
        <div className={styles["subscribed-area"]}>
          <button
            className={styles["subscribed-btn"]}
            onClick={() => setWantUnSub(true)}
          >
            ĐÃ ĐĂNG KÝ
          </button>
          {showMenu && (
            <div
              className="fixed-wrapper"
              onClick={() => setShowMenu(false)}
            ></div>
          )}
          <div
            className={styles["notify-icon"]}
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <div className={styles["icon"]}>
              {subscribeStatus.notification ? (
                <i className="far fa-bell fa-lg"></i>
              ) : (
                <i className="far fa-bell-slash fa-lg"></i>
              )}
            </div>
            {showMenu && (
              <>
                <div
                  className={styles["notify-menu"]}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    className={clsx(
                      styles["notify-on"],
                      styles["notify-menu-item"],
                      subscribeStatus.notification
                        ? styles["activate"]
                        : undefined
                    )}
                    onClick={handleOnNotification}
                  >
                    <i className="far fa-bell fa-lg"></i>
                    <span>Tất cả</span>
                  </div>
                  <div
                    className={clsx(
                      styles["notify-off"],
                      styles["notify-menu-item"],
                      !subscribeStatus.notification
                        ? styles["activate"]
                        : undefined
                    )}
                    onClick={handleOffNotification}
                  >
                    <i className="far fa-bell-slash fa-lg"></i>
                    <span>Không nhận thông báo</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {wantUnSub && (
        <Modal
          title="Hủy theo dõi?"
          handleText="Hủy đăng ký"
          failureHandler={() => setWantUnSub(false)}
          successHandler={handleUnsubscribeClick}
        >
          Bạn chắc chắn muốn hủy đăng ký {fullName}?
        </Modal>
      )}
    </div>
  );
};

export default SubscribeBtn;
