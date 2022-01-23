import { Reference } from "@apollo/client";
import React, { useContext, useState } from "react";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  useGoogleLogin,
} from "react-google-login";
import { Link } from "react-router-dom";
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
  const { loading: authLoading } = useCheckAuth();

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
  const {
    setState: setUserState,
    state: { checkPass },
    cache,
  } = useLogin();
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
      onCompleted: () => {
        cache.modify({
          fields: {
            videos(existing) {
              existing.paginatedVideos.forEach((video: Reference) => {
                cache.evict({ id: video.__ref });
              });
            },
          },
        });
        cache.evict({ fieldName: "videos" });
      },
    });

    if (response.data?.login.success) {
      setUserState((preValues) => ({
        ...preValues,
        token: response.data?.login.token as string,
      }));
      window.localStorage.setItem("login", Date.now().toString());
      notify("success", "Đăng nhập thành công👌");
      checkPass ? router.navigate(-1) : router.navigate(1);
    } else {
      notify("error", "Có lỗi xảy ra, vui lòng thử lại!😍");
    }
    setLoading(false);
  };

  const onFailure = (error: any) => {
    notify("error", "Đăng nhập thất bại");
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
      onCompleted: () => {
        cache.modify({
          fields: {
            videos(existing) {
              existing.paginatedVideos.forEach((video: Reference) => {
                cache.evict({ id: video.__ref });
              });
            },
          },
        });
        cache.evict({ fieldName: "videos" });
      },
    });

    if (response.data?.login.success) {
      setUserState((preValues) => ({
        ...preValues,
        token: response.data?.login.token as string,
      }));
      window.localStorage.setItem("login", Date.now().toString());
      notify("success", "Đăng nhập thành công👌");
      checkPass ? router.navigate(-1) : router.navigate(1);
    } else if (response.data?.login.code === 401) {
      notify(
        "error",
        "Tài khoản hoặc mật khẩu không chính xác, vui lòng thử lại😒"
      );
    } else {
      notify("error", "Có lỗi xảy ra, vui lòng thử lại!😂");
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

  if (authLoading || (!authLoading && window.localStorage.getItem("login")))
    return (
      <h1>
        <Spinner />
      </h1>
    );

  return (
    <div className={styles.container + " " + styles[mode]}>
      <div className={styles["forms-container"]}>
        <div className={styles["signin-signup"]}>
          <form action="#" className={styles["sign-in-form"]}>
            <h2 className={styles["title"]}>Đăng nhập</h2>
            <div className={styles["input-field"]}>
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Tài khoản"
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
                placeholder="Mật khẩu"
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
                value={loading ? "logining" : "đăng nhập"}
                className={styles.btn}
                onClick={!loading ? handleLoginSubmit : undefined}
              />
            </div>
            <Link to="/forgot" className={styles["social-text"]}>
              Quên mật khẩu?
            </Link>
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
            <h2 className={styles.title}>Đăng ký</h2>
            <div className={styles["input-field"]}>
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Tài khoản"
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
                placeholder="Mật khẩu"
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
                  placeholder="Họ"
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
                  placeholder="Tên"
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
                value="Đăng ký"
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
              Đăng ký
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
              Đăng nhập
            </button>
          </div>
          <img src={RegisImg} className={styles.image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
