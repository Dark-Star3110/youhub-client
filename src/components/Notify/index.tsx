import { gql, Reference } from "@apollo/client";
import { Link } from "react-router-dom";
import { useLogin } from "../../contexts/UserContext";
import { useNotificationsQuery } from "../../generated/graphql";
import { useRouter } from "../../hooks/useRouter";
import { getStringToDate } from "../../utils/dateHelper";
import Spinner from "../Spinner";
import styles from "./Notify.module.scss";

const Notify: React.FC<{
  onChange: React.Dispatch<React.SetStateAction<number>>;
}> = ({ onChange }) => {
  const {
    state: { details },
    socket,
    cache,
  } = useLogin();

  const router = useRouter();
  const { data, loading } = useNotificationsQuery({
    variables: {
      limit: 10,
    },
    skip: !details,
  });

  if (!data?.notifications)
    if (loading)
      return (
        <div className={styles["noti-menu"]}>
          <Spinner />
        </div>
      );
    else
      return (
        <div className={styles["noti-menu"] + " " + styles["noti-none"]}>
          <h2>Không có thông báo</h2>
        </div>
      );

  return (
    <div className={styles["noti-menu"]}>
      <div className={styles["noti-top"]}>
        <h3>Thông báo</h3>
        <span
          onClick={() => {
            socket.emit("read-all-notify", details?.id);
            onChange(0);
            cache.modify({
              fields: {
                notifications(existing) {
                  existing.paginatedNotification?.forEach((noti: Reference) => {
                    cache.writeFragment({
                      id: noti.__ref,
                      fragment: gql`
                        fragment notificationInfo on Notification {
                          readed
                        }
                      `,
                      data: { readed: true },
                    });
                  });
                  return existing;
                },
              },
            });
          }}
        >
          Đọc tất cả
        </span>
      </div>
      {data.notifications.paginatedNotification.map((noti) => (
        <Link
          to={
            noti.type === "SUBSCRIBE"
              ? `user/${noti.from}`
              : noti.type !== "OTHER"
              ? `watch/${noti.videoId}`
              : router.location.pathname
          }
          key={noti._id}
        >
          <div
            className={styles["noti-item"]}
            onClick={() => {
              if (!noti.readed) {
                socket.emit("read-notify", details?.id, noti._id);
                onChange((prev) => prev - 1);
                cache.writeFragment({
                  id: `Notification:${noti._id}`,
                  fragment: gql`
                    fragment notificationInfo on Notification {
                      readed
                    }
                  `,
                  data: { readed: true },
                });
              }
            }}
          >
            {!noti.readed && (
              <div className={styles["noti-item__status"]}></div>
            )}
            <div className={styles["noti-item__authorImg"]}>
              <img src={noti.avatar_url as string} alt="user" />
            </div>
            <div className={styles["noti-item__content"]}>
              <h4>{noti.content}</h4>
              <small>{getStringToDate(noti.createdAt)}</small>
            </div>
            {noti.type !== "SUBSCRIBE" && noti.type !== "OTHER" && (
              <div className={styles["noti-item__videoImg"]}>
                <img src={noti.thumnail as string} alt="video-" />
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Notify;
