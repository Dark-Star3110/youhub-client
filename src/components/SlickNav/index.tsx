import { useContext } from "react";
import { ToastContext } from "../../contexts/ToastContext";
import GradientButton from "../GradientButton";

import styles from "./SlickNav.module.scss";

const SlickNav = () => {
  const data = [
    "tất cả",
    "danh sách kết hợp",
    "âm nhạc",
    "hoạt hình",
    "trò chơi phiêu lưu",
    "bóng đá",
    "mới tải lên gần đây",
    "đã xem",
    "đề xuất mới",
  ];
  const { notify } = useContext(ToastContext);
  return (
    <div className={styles["slick-nav"]}>
      {data.map((item, index) => {
        return (
          <div key={index} className={styles["slick-nav-item"]}>
            <GradientButton
              text={item}
              onClick={() =>
                notify(
                  "info",
                  "Mấy nút này chỉ để cho đẹp 🤗, mời bạn sang khám phá để trải nghiệm chức năng này 🙃🙃"
                )
              }
            />
          </div>
        );
      })}
    </div>
  );
};

export default SlickNav;
