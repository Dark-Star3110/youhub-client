import { ChangeEvent, useContext, useState } from "react";
import { useLogin } from "../../contexts/UserContext";
import Spinner from "../Spinner";
import styles from "./Me.module.scss";
import banner_icon from "../../assets/img/banner_icon.png";
import { ToastContext } from "../../contexts/ToastContext";
import MeVideos from "../MeVideos";

const Me = () => {
  // context
  const {
    state: { details },
  } = useLogin();
  const { notify } = useContext(ToastContext);

  // state
  const [isChange, setIsChange] = useState(false);
  const [tab, setTab] = useState("videos");
  const [pgStyle, setPgStyle] = useState({
    left: 0,
    width: "85px",
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fileImg, setFileImg] = useState<File>();
  const [img1, setImg1] = useState<string>("");
  const [img2, setImg2] = useState<string>("");
  const [inputValue, setInputValue] = useState({
    name: details?.fullName as string,
    chanelDescription: details?.channelDecscription as string,
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
    if (files) {
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

      setFileImg(file);
      setIsChange(true);
    }
  };
  // banner
  const handleChooseImg2 = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
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

      setFileImg(file);
      setIsChange(true);
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
                    setFileImg(undefined);
                    setInputValue({
                      name: details?.fullName as string,
                      chanelDescription: "",
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
                  onClick={() => console.log("handleSave")}
                >
                  LƯU THAY ĐỔI
                </button>
              </div>
            </div>
            {tab === "videos" && (
              <div className={styles["content"]}>
                <MeVideos />
              </div>
            )}

            {tab === "images" && (
              <div className={styles["content"]}>
                <div className={styles["content-item"]}>
                  <h4>Ảnh</h4>
                  <small>
                    Ảnh hồ sơ sẽ xuất hiện cùng với kênh của bạn trên YouTube
                    tại những vị trí như bên cạnh bình luận và video của bạn
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
                            src={(details.banner_id as string) || banner_icon}
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
            )}
            {tab === "info" && (
              <div className={styles.content}>
                <h4>Tên và nội dung mô tả kênh</h4>
                <small>
                  Chọn tên kênh thể hiện cá tính và nội dung của bạn.
                </small>
                <div className={styles.form}>
                  <div className={styles["form-item"]}>
                    <input
                      type="text"
                      id="name"
                      className={styles["form-input"]}
                      value={inputValue.name}
                      onChange={(e) => {
                        setIsChange(true);
                        setInputValue((pre) => ({
                          ...pre,
                          name: e.target.value,
                        }));
                      }}
                      placeholder=" "
                      required
                    />
                    <label htmlFor="name" className={styles["form-label"]}>
                      Tên
                    </label>
                  </div>
                  <div className={styles["form-item"]}>
                    <textarea
                      id="desciption"
                      className={styles["form-input"] + " " + styles["desp"]}
                      value={inputValue.chanelDescription}
                      onChange={(e) => {
                        setIsChange(true);
                        setInputValue((pre) => ({
                          ...pre,
                          chanelDescription: e.target.value,
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
