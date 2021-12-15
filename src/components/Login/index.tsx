import { useState } from "react";
import LogImg from "../../assets/img/log.svg";
import RegisImg from "../../assets/img/register.svg";
import styles from "./Login.module.scss";

const Login = () => {
  // state
  const [mode, setMode] = useState<string>("");
  const [seen, setSeen] = useState<boolean>(false);

  return (
    <div className={styles.container + " " + styles[mode]}>
      <div className={styles["forms-container"]}>
        <div className={styles["signin-signup"]}>
          <form action="#" className={styles["sign-in-form"]}>
            <h2 className={styles["title"]}>Sign in</h2>
            <div className={styles["input-field"]}>
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className={styles["input-field"]}>
              <i className="fas fa-lock"></i>
              <input type={seen ? "text" : "password"} placeholder="Password" />
              {seen ? (
                <i
                  className="fas fa-eye seen"
                  onClick={() => setSeen(false)}
                ></i>
              ) : (
                <i
                  className="fas fa-eye-slash"
                  onClick={() => setSeen(true)}
                ></i>
              )}
            </div>
            <input type="submit" value="Login" className={styles.btn} />
            <p className={styles["social-text"]}>
              Or Sign in with social platforms
            </p>
            <div className={styles["social-media"]}>
              <span className={styles["social-icon"]}>
                <i className="fab fa-facebook-f"></i>
              </span>
              <span className={styles["social-icon"]}>
                <i className="fab fa-twitter"></i>
              </span>
              <span className={styles["social-icon"]}>
                <i className="fab fa-google"></i>
              </span>
              <span className={styles["social-icon"]}>
                <i className="fab fa-linkedin-in"></i>
              </span>
            </div>
          </form>
          <form action="#" className={styles["sign-up-form"]}>
            <h2 className={styles.title}>Sign up</h2>
            <div className={styles["input-field"]}>
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className={styles["input-field"]}>
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" />
            </div>
            <div className={styles["input-field"]}>
              <i className="fas fa-lock"></i>
              <input type={seen ? "text" : "password"} placeholder="Password" />
              {seen ? (
                <i
                  className="fas fa-eye seen"
                  onClick={() => setSeen(false)}
                ></i>
              ) : (
                <i
                  className="fas fa-eye-slash"
                  onClick={() => setSeen(true)}
                ></i>
              )}
            </div>
            <input type="submit" className={styles.btn} value="Sign up" />
            <p className={styles["social-text"]}>
              Or Sign up with social platforms
            </p>
            <div className={styles["social-media"]}>
              <span className={styles["social-icon"]}>
                <i className="fab fa-facebook-f"></i>
              </span>
              <span className={styles["social-icon"]}>
                <i className="fab fa-twitter"></i>
              </span>
              <span className={styles["social-icon"]}>
                <i className="fab fa-google"></i>
              </span>
              <span className={styles["social-icon"]}>
                <i className="fab fa-linkedin-in"></i>
              </span>
            </div>
          </form>
        </div>
      </div>

      <div className={styles["panels-container"]}>
        <div className={styles["panel"] + " " + styles["left-panel"]}>
          <div className={styles.content}>
            <h3>Bạn chưa có tài khoản ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button
              className={styles.btn + " " + styles.transparent}
              onClick={() => setMode("sign-up-mode")}
            >
              Sign up
            </button>
          </div>
          <img src={LogImg} className={styles.image} alt="" />
        </div>
        <div className={styles["panel"] + " " + styles["right-panel"]}>
          <div className={styles.content}>
            <h3>Ok chưa ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button
              className={styles.btn + " " + styles.transparent}
              onClick={() => setMode("")}
            >
              Sign in
            </button>
          </div>
          <img src={RegisImg} className={styles.image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
