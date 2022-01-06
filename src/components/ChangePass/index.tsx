import styles from "./ChangePass.module.scss";
import bg from "../../assets/img/forgot_bg.png";

const ChangePass = () => {
  return (
    <div
      className={styles["change-pass"]}
      style={{
        background: `url(${bg}) no-repeat bottom center`,
        backgroundSize: "cover",
      }}
    >
      <div className={styles["overlayer"]}></div>
      <div className={styles["form"]}>
        <h2>Mật khẩu mới</h2>
        <div className={styles["alert-success"]}>Nhập mật khẩu mới của bạn</div>
        <input
          type="text"
          placeholder="Nhập mật khẩu mới"
          className={styles["form-input"]}
        />
        <input
          type="text"
          placeholder="Xác nhận mật khẩu"
          className={styles["form-input"]}
        />
        <input
          type="submit"
          value="Thay đổi"
          className={styles["submit-btn"]}
        />
      </div>
    </div>
  );
};

export default ChangePass;
