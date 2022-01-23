import { gql } from "@apollo/client";
import React, { useContext } from "react";
import { ToastContext } from "../../contexts/ToastContext";
import { useLogin } from "../../contexts/UserContext";
import { Action, useWatchLaterMutation } from "../../generated/graphql";
import styles from "./VideoMenuSelect.module.scss";

const VideoMenuSelect: React.FC<{ videoId: string; status: boolean }> = ({
  videoId,
  status,
}) => {
  const {
    state: { details },
    cache,
  } = useLogin();

  const { notify } = useContext(ToastContext);

  const [onWatchLater] = useWatchLaterMutation();

  const handleWatchLater = async () => {
    const response = await onWatchLater({
      variables: {
        action: status ? Action.Disactivate : Action.Activate,
        videoId,
      },
    });
    if (response.data?.watchLater.success) {
      notify("success", "Đã thêm vào danh sách xem sau");
      cache.writeFragment({
        id: `Video:${videoId}`,
        fragment: gql`
          fragment VideoUpdate on Video {
            watchLaterStatus
          }
        `,
        data: {
          watchLaterStatus: status ? false : true,
        },
      });
    } else {
      notify("error", "Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  return (
    <div className={styles["videos-control__menu"]}>
      <div className={styles["menu-item"]} onClick={handleWatchLater}>
        <span className={styles["menu-icon"]}>
          <i className="far fa-clock"></i>
        </span>
        <span className={styles["menu-title"]}>
          {status ? "Bỏ xem sau" : "Xem sau"}
        </span>
      </div>

      {details?.role === "ADMIN" && (
        <div className={styles["menu-item"]}>
          <span className={styles["menu-icon"]}>
            <i className="fas fa-trash-alt"></i>
          </span>
          <span className={styles["menu-title"]}>Xóa</span>
        </div>
      )}
    </div>
  );
};

export default VideoMenuSelect;
