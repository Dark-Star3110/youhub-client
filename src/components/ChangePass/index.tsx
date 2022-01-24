import styles from "./ChangePass.module.scss";
import bg from "../../assets/img/forgot_bg.png";
import { useRouter } from "../../hooks/useRouter";
import { useChangePasswordMutation } from "../../generated/graphql";
import { useState } from "react";

const ChangePass = () => {
  const router = useRouter();
  const token = router.query.token;
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");

  const [changePass] = useChangePasswordMutation();

  if (!token) {
    router.navigate("/nham");
  }

  const handleChangePasswordSubmit = async () => {
    if (newPassword !== confirmNewPassword) {
      setError("Nhập sai");
      return;
    }
    const response = await changePass({
      variables: {
        token: token as string,
        newPassword,
      },
    });
    if (response.data?.changePassword) return router.navigate("/login");
    else setError("Có lỗi xảy ra. Vui lòng thử lại😒");
  };
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
        {error && <div className={styles["alert-error"]}>{error}</div>}
        <h2>Mật khẩu mới</h2>
        <div className={styles["alert-success"]}>Nhập mật khẩu mới của bạn</div>
        <input
          type="password"
          placeholder="Nhập mật khẩu mới"
          className={styles["form-input"]}
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setError("");
          }}
        />
        <input
          type="password"
          placeholder="Xác nhận mật khẩu"
          className={styles["form-input"]}
          value={confirmNewPassword}
          onChange={(e) => {
            setConfirmNewPassword(e.target.value);
            setError("");
          }}
        />
        <input
          type="submit"
          value="Thay đổi"
          className={styles["submit-btn"]}
          onClick={handleChangePasswordSubmit}
        />
      </div>
    </div>
  );
};

export default ChangePass;
