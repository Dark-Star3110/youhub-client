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
      notify("success", "????ng nh???p th??nh c??ng????");
      checkPass ? router.navigate(-1) : router.navigate(1);
    } else {
      notify("error", "C?? l???i x???y ra, vui l??ng th??? l???i!????");
    }
    setLoading(false);
  };

  const onFailure = (error: any) => {
    notify("error", "????ng nh???p th???t b???i");
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
      notify("success", "????ng nh???p th??nh c??ng????");
      checkPass ? router.navigate(-1) : router.navigate(1);
    } else if (response.data?.login.code === 401) {
      notify(
        "error",
        "T??i kho???n ho???c m???t kh???u kh??ng ch??nh x??c, vui l??ng th??? l???i????"
      );
    } else {
      notify("error", "C?? l???i x???y ra, vui l??ng th??? l???i!????");
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
      notify("success", "????ng k?? th??nh c??ng");
      setMode("");
      setSignupData({
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
      });
    } else {
      notify("error", "C?? l???i x???y ra, vui l??ng th??? l???i! ????");
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
            <h2 className={styles["title"]}>????ng nh???p</h2>
            <div className={styles["input-field"]}>
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="T??i kho???n"
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
                placeholder="M???t kh???u"
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
                value={loading ? "logining" : "????ng nh???p"}
                className={styles.btn}
                onClick={!loading ? handleLoginSubmit : undefined}
              />
            </div>
            <Link to="/forgot" className={styles["social-text"]}>
              Qu??n m???t kh???u?
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
            <h2 className={styles.title}>????ng k??</h2>
            <div className={styles["input-field"]}>
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="T??i kho???n"
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
                placeholder="M???t kh???u"
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
                  placeholder="H???"
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
                  placeholder="T??n"
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
                value="????ng k??"
                onClick={!loading ? handleSignupSubmit : undefined}
              />
            </div>
          </form>
        </div>
      </div>

      <div className={styles["panels-container"]}>
        <div className={styles["panel"] + " " + styles["left-panel"]}>
          <div className={styles.content}>
            <h3>B???n ch??a c?? t??i kho???n ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button
              className={styles.btn + " " + styles.transparent}
              onClick={() => setMode("sign-up-mode")}
            >
              ????ng k??
            </button>
          </div>
          <img src={LogImg} className={styles.image} alt="" />
        </div>
        <div className={styles["panel"] + " " + styles["right-panel"]}>
          <div className={styles.content}>
            <h3>Ok ch??a ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button
              className={styles.btn + " " + styles.transparent}
              onClick={() => setMode("")}
            >
              ????ng nh???p
            </button>
          </div>
          <img src={RegisImg} className={styles.image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
