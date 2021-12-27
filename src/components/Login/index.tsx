import React, { useContext, useState } from "react";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  useGoogleLogin,
} from "react-google-login";
import LogImg from "../../assets/img/log.svg";
import RegisImg from "../../assets/img/register.svg";
import { ToastContext } from "../../contexts/ToastContext";
import { useLogin } from "../../contexts/UserContext";
import {
  Strategy,
  useLoginMutation,
  useSignupMutation,
} from "../../generated/graphql";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { useRouter } from "../../hooks/useRouter";
import Spinner from "../Spinner";
import styles from "./Login.module.scss";

interface ILoginDataDefault {
  username: string;
  password: string;
}

interface ISignupDataDefault {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const Login = () => {
  useCheckAuth();
  // state
  const [mode, setMode] = useState<string>("");
  const [seen, setSeen] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<ILoginDataDefault>({
    password: "",
    username: "",
  });
  const [signupData, setSignupData] = useState<ISignupDataDefault>({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // user context
  const { setState: setUserState } = useLogin();
  const { notify } = useContext(ToastContext);

  // login mutation
  const [loginMutation /* {data, loading, error} */] = useLoginMutation();
  const [signupMutation] = useSignupMutation();

  // login with google
  const onSuccess = async (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    setLoading(true);
    const res_su = res as GoogleLoginResponse;
    const response = await loginMutation({
      variables: {
        socialLogin: {
          type: Strategy.Google,
          accessToken: res_su.tokenId,
        },
      },
    });

    if (response.data?.login.success) {
      setLoading(false);
      setUserState((preValues) => ({
        ...preValues,
        token: response.data?.login.token as string,
      }));
      window.localStorage.setItem("login", Date.now().toString());
      notify("success", "dang nhap thanh cong");
      router.navigate("/");
    } else {
      setLoading(false);
      notify("error", "dang nhap that bai");
    }
  };

  const onFailure = (error: any) => {
    notify("error", "dang nhap that bai");
    console.log("login failure", error);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID as string,
  });

  // login with local
  const handleLoginSubmit = async (e: React.MouseEvent) => {
    setLoading(true);
    e.preventDefault();

    const response = await loginMutation({
      variables: {
        loginInput: {
          username: loginData.username,
          password: loginData.password,
        },
      },
    });

    // check errors here

    if (response.data?.login.success) {
      setUserState((preValues) => ({
        ...preValues,
        token: response.data?.login.token as string,
      }));
      window.localStorage.setItem("login", Date.now().toString());
      notify("success", "dang nhap thanh cong");
      router.push("/");
    }
    setLoading(false);
  };

  // sign up
  const handleSignupSubmit = async (e: React.MouseEvent) => {
    setLoading(true);
    e.preventDefault();
    const response = await signupMutation({
      variables: {
        signupInput: { ...signupData },
      },
    });

    // check errors here

    if (response.data?.signup.success) {
      setMode("");
      setSignupData({
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
      });
    }
    setLoading(false);
  };

  return (
    <div className={styles.container + " " + styles[mode]}>
      <div className={styles["forms-container"]}>
        <div className={styles["signin-signup"]}>
          <form action="#" className={styles["sign-in-form"]}>
            <h2 className={styles["title"]}>Sign up</h2>
            <div className={styles["input-field"]}>
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                value={loginData.username}
                onChange={(e) =>
                  setLoginData((pre) => ({ ...pre, username: e.target.value }))
                }
              />
            </div>
            <div className={styles["input-field"]}>
              <i className="fas fa-lock"></i>
              <input
                type={seen ? "text" : "password"}
                placeholder="Password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData((pre) => ({ ...pre, password: e.target.value }))
                }
              />
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
            <div className={styles["btn-erea"]}>
              {loading && (
                <div className={styles["loading"]}>
                  <Spinner />
                </div>
              )}
              <input
                type="submit"
                value={loading ? "logining" : "login"}
                className={styles.btn}
                onClick={!loading ? handleLoginSubmit : undefined}
              />
            </div>
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
              <span
                className={styles["social-icon"]}
                onClick={!loading ? signIn : undefined}
              >
                <i className="fab fa-google"></i>
              </span>
              <span className={styles["social-icon"]}>
                <i className="fab fa-linkedin-in"></i>
              </span>
            </div>
          </form>
          <form action="#" className={styles["sign-up-form"]}>
            <h2 className={styles.title}>Sign in</h2>
            <div className={styles["input-field"]}>
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                value={signupData.username}
                onChange={(e) =>
                  setSignupData((pre) => ({ ...pre, username: e.target.value }))
                }
              />
            </div>
            <div className={styles["input-field"]}>
              <i className="fas fa-lock"></i>
              <input
                type={seen ? "text" : "password"}
                placeholder="Password"
                value={signupData.password}
                onChange={(e) =>
                  setSignupData((pre) => ({ ...pre, password: e.target.value }))
                }
              />
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
            <div className={styles["input-field-half"]}>
              <div className={styles["input-field-half-item"]}>
                <i className="fas fa-file-signature"></i>
                <input
                  type="text"
                  placeholder="First name"
                  value={signupData.firstName}
                  onChange={(e) =>
                    setSignupData((pre) => ({
                      ...pre,
                      firstName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className={styles["input-field-half-item"]}>
                <i className="fas fa-file-signature"></i>
                <input
                  type="text"
                  placeholder="Last name"
                  value={signupData.lastName}
                  onChange={(e) =>
                    setSignupData((pre) => ({
                      ...pre,
                      lastName: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className={styles["input-field"]}>
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                value={signupData.email}
                onChange={(e) =>
                  setSignupData((pre) => ({ ...pre, email: e.target.value }))
                }
              />
            </div>
            <div className={styles["btn-erea"]}>
              {loading && (
                <div className={styles["loading"]}>
                  <Spinner />
                </div>
              )}
              <input
                type="submit"
                className={styles.btn}
                value="Sign up"
                onClick={!loading ? handleSignupSubmit : undefined}
              />
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
