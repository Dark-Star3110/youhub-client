import styles from "./Forgot.module.scss";
import bg from "../../assets/img/forgot_bg.png";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Link } from "react-router-dom";
const Forgot = () => {
  return (
    <div
      className={styles["forgot"]}
      style={{
        background: `url(${bg}) no-repeat bottom center`,
        backgroundSize: "cover",
      }}
    >
      <div className={styles["overlayer"]}></div>
      <div className={styles["form"]}>
        <h2>Quên mật khẩu</h2>
        <h4>Nhập email của bạn</h4>
        <input
          type="text"
          placeholder="Nhập địa chỉ email"
          className={styles["form-input"]}
        />
        <input
          type="submit"
          value="Tiếp tục"
          className={styles["submit-btn"]}
        />
      </div>
      {/* <div className={styles["form"]}>
        <div className={styles["alert-success"]}>
          Chúng tôi đã xác nhận yêu cầu của bạn. Vui lòng kiểm tra email của bạn
        </div>
        <Link to="/">
          <input
            type="submit"
            value="Về trang chủ"
            className={styles["submit-btn"]}
          />
        </Link>
      </div> */}
    </div>
  );
};

export default Forgot;
