import { ChangeEvent, useContext, useState } from "react";
import { useLogin } from "../../contexts/UserContext";
import Spinner from "../Spinner";
import styles from "./Me.module.scss";
import banner_icon from "../../assets/img/banner_icon.png";
import { ToastContext } from "../../contexts/ToastContext";
import MeVideos from "../MeVideos";
import axios from "axios";
import { useUpdateUserInfoMutation } from "../../generated/graphql";
import { gql } from "@apollo/client";
import { useRouter } from "../../hooks/useRouter";

const Me = () => {
  const router = useRouter();
  // context
  const {
    state: { details, token },
    setState: setUserContext,
    cache,
  } = useLogin();
  const [updateUserInfoMutation] = useUpdateUserInfoMutation();
  const { notify } = useContext(ToastContext);

  // state
  const [isChange, setIsChange] = useState(false);
  const [tab, setTab] = useState("videos");
  const [pgStyle, setPgStyle] = useState({
    left: 0,
    width: "85px",
  });
  const [fileAvatar, setFileAvatar] = useState<File>();
  const [fileBanner, setFileBanner] = useState<File>();
  const [img1, setImg1] = useState<string>("");
  const [img2, setImg2] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    channelDecscription: details?.channelDecscription as string,
  });

  const handleClick = (e: React.MouseEvent) => {
    const left = (e.target as HTMLSpanElement).offsetLeft;
    const width = (e.target as HTMLSpanElement).offsetWidth + "px";
    setPgStyle({ left, width });
    const newTab = (e.target as HTMLSpanElement).id;
    setTab(newTab);
  };
  // avatar
  const handleChooseImg1 = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.indexOf("image/") === -1) {
        notify("warning", "định dạng file không hợp lệ");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        setImg1(result as string);
      };
      reader.readAsDataURL(files[0]);

      setFileAvatar(file);
      setIsChange(true);
    }
  };
  // banner
  const handleChooseImg2 = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.indexOf("image/") === -1) {
        notify("warning", "định dạng file không hợp lệ");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        setImg2(result as string);
      };
      reader.readAsDataURL(files[0]);

      setFileBanner(file);
      setIsChange(true);
    }
  };

  const handleUpload = async () => {
    if (!fileAvatar && !fileBanner) return;
    setLoading(true);
    const formData = new FormData();
    if (fileAvatar) formData.append("fileAvatar", fileAvatar);
    if (fileBanner) formData.append("fileBanner", fileBanner);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_ENDPOINT}/user/update`,
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status !== 200) {
        notify("error", "có lỗi xảy ra vui lòng thử lại!");
        return;
      }
      cache.writeFragment({
        id: `User:${details?.id}`,
        fragment: gql`
          fragment avatarUpdate on User {
            image_url
            banner_url
          }
        `,
        data: {
          image_url: res.data.avatarUrl
            ? res.data.avatarUrl
            : details?.image_url,
          banner_url: res.data.bannerUrl
            ? res.data.bannerUrl
            : details?.banner_url,
        },
      });
      setUserContext((prev) => ({
        ...prev,
        details: undefined,
      }));
      setLoading(false);
      setIsChange(false);
      setFileAvatar(undefined);
      setFileBanner(undefined);
      notify("success", "Cập nhật thành công");
    } catch (error) {
      notify("error", "Có lỗi xảy ra vui lòng thử lại!");
    }
  };

  // update Info
  const handleUpdateInfo = async () => {
    const response = await updateUserInfoMutation({
      variables: {
        updateInput: {
          ...inputValue,
        },
      },
    });

    if (response.data?.updateInfo.success) {
      notify("success", "Cập nhật thông tin thành công 😒");
      cache.writeFragment({
        id: `User:${details?.id}`,
        fragment: gql`
          fragment UserInfoUpdate on User {
            firstName
            lastName
            channelDecscription
          }
        `,
        data: {
          firstName: inputValue.firstName,
          lastName: inputValue.lastName,
          channelDecscription: inputValue.channelDecscription,
        },
      });
      router.navigate("/");
    } else {
      notify("error", "Có lỗi xảy ra vui lòng thử lại! 😪");
    }
  };

  return (
    <div className={styles.me}>
      {details ? (
        <>
          <div className={styles.primary}>
            <div className={styles["user-img"]}>
              <img src={details.image_url as string} alt="user" />
            </div>
            <h4>Kênh của bạn</h4>
            <small>{details.firstName + " " + details.lastName}</small>
          </div>
          <div className={styles.secondary}>
            <div className={styles["secondary-head"]}>
              <h2>Tùy chỉnh kênh</h2>
              <div className={styles.menu}>
                <span
                  className={
                    styles["menu-item"] +
                    " " +
                    styles[`${tab === "videos" ? "active" : ""}`]
                  }
                  id="videos"
                  onClick={handleClick}
                >
                  Videos
                </span>
                <span
                  className={
                    styles["menu-item"] +
                    " " +
                    styles[`${tab === "images" ? "active" : ""}`]
                  }
                  id="images"
                  onClick={handleClick}
                >
                  Xây dựng thương hiệu
                </span>
                <span
                  className={
                    styles["menu-item"] +
                    " " +
                    styles[`${tab === "info" ? "active" : ""}`]
                  }
                  id="info"
                  onClick={handleClick}
                >
                  Thông tin cơ bản
                </span>
                <span className={styles["menu-proges"]} style={pgStyle}></span>
              </div>
              <div className={styles["btns"]}>
                <button
                  className={
                    styles["cancel-btn"] +
                    " " +
                    styles[`${isChange ? "active" : ""}`]
                  }
                  disabled={isChange ? false : true}
                  onClick={() => {
                    setIsChange(false);
                    setImg1("");
                    setImg2("");
                    setFileAvatar(undefined);
                    setInputValue({
                      firstName: details?.firstName,
                      lastName: details?.lastName,
                      channelDecscription: "",
                    });
                  }}
                >
                  HỦY
                </button>
                <button
                  className={
                    styles["save-btn"] +
                    " " +
                    styles[`${isChange ? "active" : ""}`]
                  }
                  disabled={isChange ? false : true}
                  onClick={handleUpdateInfo}
                >
                  {loading && (
                    <div className={styles["loading"]}>
                      <Spinner />
                    </div>
                  )}
                  <span>{!loading ? "LƯU THAY ĐỔI" : "ĐANG LƯU"}</span>
                </button>
              </div>
            </div>
            {tab === "videos" && (
              <div className={styles["content"]}>
                <MeVideos userId={details.id} />
              </div>
            )}

            {tab === "images" && (
              <div className={styles["content"]}>
                <div className={styles["content-item"]}>
                  <h4>Ảnh</h4>
                  <small>
                    Ảnh hồ sơ sẽ xuất hiện cùng với kênh của bạn trên YouHub tại
                    những vị trí như bên cạnh bình luận và video của bạn
                  </small>
                  <div className={styles["content-item__img"]}>
                    <div className={styles["img"]}>
                      <div className={styles["avatar"]}>
                        {img1 ? (
                          <img src={img1} alt="file" />
                        ) : (
                          <img src={details.image_url as string} alt="user" />
                        )}
                      </div>
                    </div>
                    <div className={styles["text"]}>
                      <small>
                        Bạn nên dùng ảnh có độ phân giải tối thiểu 98 x 98 pixel
                        và có kích thước tối đa 4 MB. Hãy dùng tệp PNG hoặc JPG
                        (không dùng ảnh động)
                      </small>
                      <div className={styles.control}>
                        <label htmlFor="img_url">
                          <h3>THAY ĐỔI</h3>
                        </label>
                        <input
                          type="file"
                          onChange={handleChooseImg1}
                          id="img_url"
                          hidden
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles["content-item"]}>
                  <h4>Ảnh bìa</h4>
                  <small>
                    Hình ảnh này sẽ xuất hiện ở phần đầu kênh của bạn
                  </small>
                  <div className={styles["content-item__img"]}>
                    <div className={styles["img"]}>
                      <div className={styles["banner"]}>
                        {img2 ? (
                          <img src={img2} alt="file" />
                        ) : (
                          <img
                            src={(details.banner_url as string) || banner_icon}
                            alt="user"
                          />
                        )}
                      </div>
                    </div>
                    <div className={styles["text"]}>
                      <small>
                        Để hình ảnh đạt chất lượng cao nhất trên mọi thiết bị,
                        hãy dùng ảnh có độ phân giải tối thiểu 2048 x 1152 pixel
                        và có kích thước tối đa 6 MB.
                      </small>
                      <div className={styles.control}>
                        <label htmlFor="banner_url">
                          <h3>TẢI LÊN</h3>
                        </label>
                        <input
                          type="file"
                          id="banner_url"
                          onChange={handleChooseImg2}
                          hidden
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {tab === "info" && (
              <div className={styles.content}>
                <h4>Tên và nội dung mô tả kênh</h4>
                <small>
                  Chọn tên kênh thể hiện cá tính và nội dung của bạn.
                </small>
                <div className={styles.form}>
                  <div
                    className={styles["form-item"] + " " + styles["form-half"]}
                  >
                    <div className={styles["form-item__half"]}>
                      <input
                        type="text"
                        id="firstName"
                        className={styles["form-input"]}
                        value={inputValue.firstName}
                        onChange={(e) => {
                          setIsChange(true);
                          setInputValue((pre) => ({
                            ...pre,
                            firstName: e.target.value,
                          }));
                        }}
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="firstName"
                        className={styles["form-label"]}
                      >
                        Họ
                      </label>
                    </div>
                    <div className={styles["form-item__half"]}>
                      <input
                        type="text"
                        id="lastName"
                        className={styles["form-input"]}
                        value={inputValue.lastName}
                        onChange={(e) => {
                          setIsChange(true);
                          setInputValue((pre) => ({
                            ...pre,
                            lastName: e.target.value,
                          }));
                        }}
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="lastName"
                        className={styles["form-label"]}
                      >
                        Tên
                      </label>
                    </div>
                  </div>
                  <div className={styles["form-item"]}>
                    <textarea
                      id="desciption"
                      className={styles["form-input"] + " " + styles["desp"]}
                      value={inputValue.channelDecscription ?? ""}
                      onChange={(e) => {
                        setIsChange(true);
                        setInputValue((pre) => ({
                          ...pre,
                          channelDecscription: e.target.value,
                        }));
                      }}
                      placeholder=" "
                    />
                    <label
                      htmlFor="desciption"
                      className={styles["form-label"]}
                    >
                      Mô tả{" "}
                      <small>
                        Giới thiệu với người xem về kênh của bạn. Nội dụng mô tả
                        sẽ xuất hiện trong phần giới thiệu kênh
                      </small>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Me;
