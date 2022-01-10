import { Link } from "react-router-dom";
import userNotFound from "../../../assets/img/user-not-found.png";
import styles from "./UserNotFound.module.scss";

const UserNotFound = () => {
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["item"]}>
        <img src={userNotFound} alt="userNotFound" />
      </div>
      <div className={styles["item"]}>
        <h2>Người dùng này hiện không tồn tại trên hệ thống</h2>
      </div>
      <div className={styles["item"]}>
        <Link to="/">
          <button>Quay về trang chủ</button>
        </Link>
      </div>
    </div>
  );
};

export default UserNotFound;
