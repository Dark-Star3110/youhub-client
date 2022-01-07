import styles from "./Forgot.module.scss";
import bg from "../../assets/img/forgot_bg.png";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Link } from "react-router-dom";
import { useForgotPasswordMutation } from "../../generated/graphql";
import { useContext, useState } from "react";
import { ToastContext } from "../../contexts/ToastContext";
const Forgot = () => {
  const [email, setEmail] = useState("");
  const [complete, setComplete] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();

  const { notify } = useContext(ToastContext);

  const handleSubmit = async () => {
    const response = await forgotPassword({
      variables: { email },
    });
    if (response.data?.forgotPassword) {
      setComplete(true);
    } else {
      notify("error", "Có lỗi xảy ra. Vui lòng thử lại");
    }
  };

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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="submit"
          value="Tiếp tục"
          className={styles["submit-btn"]}
          onClick={handleSubmit}
        />
      </div>
      {complete && (
        <div className={styles["form"]}>
          <div className={styles["alert-success"]}>
            Chúng tôi đã xác nhận yêu cầu của bạn. Vui lòng kiểm tra email của
            bạn
          </div>
          <Link to="/">
            <input
              type="submit"
              value="Về trang chủ"
              className={styles["submit-btn"]}
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Forgot;
