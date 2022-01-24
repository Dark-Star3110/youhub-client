import { ChangeEvent, useContext, useState } from "react";
import { ToastContext } from "../../contexts/ToastContext";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import styles from "./Contact.module.scss";
const Contact = () => {
  useCheckAuth();
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const { notify } = useContext(ToastContext);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue((pre) => ({ ...pre, [`${e.target.name}`]: e.target.value }));
  };

  const handleSubmit = () => {
    notify("success", "Chúng tôi đã tiếp nhận phản hồi của bạn 😑");
    // send req
    setInputValue({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className={styles.contact}>
      <div className={styles.container}>
        <h2>Liên hệ với chúng tôi</h2>
        <div className={styles["row100"]}>
          <div className={styles["col"]}>
            <div className={styles["input-box"]}>
              <input
                type="text"
                required={true}
                name="firstName"
                value={inputValue.firstName}
                onChange={handleChange}
              />
              <span className={styles["text"]}>Họ</span>
              <span className={styles["line"]}></span>
            </div>
          </div>
          <div className={styles["col"]}>
            <div className={styles["input-box"]}>
              <input
                type="text"
                required={true}
                name="lastName"
                value={inputValue.lastName}
                onChange={handleChange}
              />
              <span className={styles["text"]}>Tên</span>
              <span className={styles["line"]}></span>
            </div>
          </div>
          <div className={styles["col"]}>
            <div className={styles["input-box"]}>
              <input
                type="text"
                required={true}
                name="email"
                value={inputValue.email}
                onChange={handleChange}
              />
              <span className={styles["text"]}>Email</span>
              <span className={styles["line"]}></span>
            </div>
          </div>
          <div className={styles["col"]}>
            <div className={styles["input-box"]}>
              <input
                type="text"
                required={true}
                name="phone"
                value={inputValue.phone}
                onChange={handleChange}
              />
              <span className={styles["text"]}>Điện thoại</span>
              <span className={styles["line"]}></span>
            </div>
          </div>
        </div>
        <div className={styles["row100"]}>
          <div className={styles["col"]}>
            <div className={styles["input-box"] + " " + styles["textarea"]}>
              <textarea
                required={true}
                name="message"
                value={inputValue.message}
                onChange={handleChange}
              />
              <span className={styles["text"]}>Ý kiến phản hồi của bạn</span>
              <span className={styles["line"]}></span>
            </div>
          </div>
        </div>
        <div className={styles["row100"]}>
          <div className={styles["col"]}>
            <input type="submit" value="Gửi" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
