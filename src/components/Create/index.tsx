import axios from "axios";
import { ChangeEvent, useContext, useState } from "react";
import { ToastContext } from "../../contexts/ToastContext";
import styles from "./Create.module.scss";

const serverPort = "http://localhost:8000/video/upload";

const Create = () => {
  const [file, setFile] = useState<File>();
  const [img, setImg] = useState<string>("");
  const [percent, setPercent] = useState(0);

  const { notify } = useContext(ToastContext);

  const handleCreateVideo = async (e: React.MouseEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
      try {
        const res = await axios.post(serverPort, formData, {
          onUploadProgress: (progressEvent) => {
            let newPercent = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setPercent(newPercent);
          },
        });
      } catch (e) {
        notify("error", "có lỗi xảy ra vui lòng thử lại!");
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      if (percent === 100) {
        setPercent(0);
      }
      const file = files[0];
      if (file.type !== "video/mp4") {
        notify("warning", "định dạng file không hợp lệ");
        return;
      }
      setFile(file);
    }
  };

  const handleChooseImg = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        setImg(result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <div className={styles.Create}>
      <div className={styles["wrapper"]}>
        <header>Tạo video của bạn</header>
        <label className={styles["file-label"]}>
          <input
            type="file"
            className={styles["file-input"]}
            hidden
            onChange={handleChange}
          />
          <i className="fas fa-cloud-upload-alt"></i>
          <p>Chọn file để tải lên</p>
        </label>
        {file && percent !== 100 && (
          <section className={styles["progress-area"]}>
            <li className={styles["row"]}>
              <i className="fas fa-file-video"></i>
              <div className={styles["content"]}>
                <div className={styles["details"]}>
                  <span
                    className={styles["name"]}
                  >{`${file?.name} ~ uploading`}</span>
                  <span className={styles["percent"]}>{`${percent}%`}</span>
                </div>
                <div className={styles["progress-bar"]}>
                  <div
                    className={styles["progress"]}
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
              </div>
            </li>
          </section>
        )}
        {percent === 100 && (
          <section className={styles["upload-area"]}>
            <li className={styles["row"]}>
              <i className="fas fa-file-video"></i>
              <div className={styles["content"]}>
                <div className={styles["details"]}>
                  <span
                    className={styles["name"]}
                  >{`${file?.name} ~ uploaded`}</span>
                  <span className={styles["size"]}>{`${
                    file ? file.size / 100 : 0
                  } bytes`}</span>{" "}
                  {}
                </div>
              </div>
              <i className="fas fa-check"></i>
            </li>
          </section>
        )}
        {file && (
          <form className={styles["form-field"]}>
            <div className={styles["form-item"]}>
              <input
                type="text"
                id="name"
                className={styles["form-input"]}
                placeholder=" "
                required
              />
              <label htmlFor="name" className={styles["form-label"]}>
                Tiêu đề <small>(bắt buộc)</small>
              </label>
            </div>
            <div className={styles["form-item"]}>
              <input
                type="text"
                id="desciption"
                className={styles["form-input"]}
                placeholder=" "
              />
              <label htmlFor="desciption" className={styles["form-label"]}>
                Mô tả{" "}
                <small>
                  (giúp người xem nắm được thông tin về video của bạn)
                </small>
              </label>
            </div>
            <div className={styles["form-item"]}>
              <input
                type="file"
                id="image"
                className={styles["form-input"]}
                placeholder=" "
                hidden
                onChange={handleChooseImg}
              />
              <label htmlFor="image" className={styles["form-label-file"]}>
                <i className="fas fa-file-image"></i>
                <p>Hình thu nhỏ</p>
                {img && <img src={img} alt="file" />}
              </label>
            </div>
            <input
              type="submit"
              value="Đăng video"
              onClick={handleCreateVideo}
              className={styles["submit-btn"]}
            />
            <input
              type="submit"
              value="Hủy tác vụ"
              onClick={() => {
                setFile(undefined);
                setImg("");
              }}
              className={styles["submit-btn"]}
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default Create;
