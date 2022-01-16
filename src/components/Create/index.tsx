import axios from "axios";
import Loading from "../Loading";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { ToastContext } from "../../contexts/ToastContext";
import { useLogin } from "../../contexts/UserContext";
import { useCreateVideoMutation } from "../../generated/graphql";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { useRouter } from "../../hooks/useRouter";
import styles from "./Create.module.scss";

const serverPort = "http://localhost:8000/video/upload";

const Create = () => {
  useCheckAuth();
  const {
    state: { token },
  } = useLogin();
  const [fileVideo, setFileVideo] = useState<File>();
  const [fileImg, setFileImg] = useState<File>();
  const [img, setImg] = useState<string>("");
  const [percent, setPercent] = useState(0);
  const [inputValue, setInputValue] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { notify } = useContext(ToastContext);

  const [createVideoMutation] = useCreateVideoMutation();

  // effect
  useEffect(() => {
    if (percent === 100) {
      setTimeout(() => setLoading(true), 1000);
    }
  }, [percent]);

  const handleCreateVideo = async (e: React.MouseEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (fileVideo) {
      if (fileImg) formData.append("file", fileImg);
      formData.append("file", fileVideo);
      try {
        if (!inputValue.title) {
          notify("warning", "Vui lòng nhập tiêu đề");
          return;
        }

        const res = await axios.post(serverPort, formData, {
          onUploadProgress: (progressEvent) => {
            let newPercent = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setPercent(newPercent);
          },
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        if (res.status !== 200) {
          setLoading(false);
          notify("error", "có lỗi xảy ra vui lòng thử lại!");
          return;
        }

        const res_graph = await createVideoMutation({
          variables: {
            createVideoInput: {
              id: res.data.videoId as string,
              size: res.data.size as string,
              thumbnailUrl: res.data.imgId,
              commentable: true,
              ...inputValue,
            },
          },

          update(cache, { data }) {
            cache.modify({
              fields: {
                videos(existing) {
                  if (data?.createVideo.success && data.createVideo.video) {
                    const refVideo = cache.identify(data.createVideo.video);
                    const newVideos = {
                      ...existing,
                      totalCount: existing.totalCount + 1,
                      paginatedVideos: [
                        { __ref: refVideo },
                        ...existing.paginatedVideos,
                      ],
                    };
                    return newVideos;
                  }
                },
              },
            });
          },
        });

        if (res_graph.data?.createVideo.video) {
          setLoading(false);
          notify("success", "đăng video thành công");
          setTimeout(() => router.push("/"), 1000);
        } else {
          setLoading(false);
          notify("error", "có lỗi xảy ra vui lòng thử lại!");
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
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
      if (file.type.indexOf("video/") === -1) {
        notify("warning", "định dạng file không hợp lệ");
        return;
      }
      setFileVideo(file);
    }
  };

  const handleChooseImg = (e: ChangeEvent<HTMLInputElement>) => {
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
        setImg(result as string);
      };
      reader.readAsDataURL(files[0]);

      setFileImg(file);
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
            required
            onChange={handleChange}
          />
          <i className="fas fa-cloud-upload-alt"></i>
          <p>Chọn file để tải lên</p>
        </label>
        {fileVideo && percent !== 100 && (
          <section className={styles["progress-area"]}>
            <li className={styles["row"]}>
              <i className="fas fa-file-video"></i>
              <div className={styles["content"]}>
                <div className={styles["details"]}>
                  <span
                    className={styles["name"]}
                  >{`${fileVideo?.name} ~ uploading`}</span>
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
                  >{`${fileVideo?.name} ~ uploaded`}</span>
                  <span className={styles["size"]}>{`${
                    fileVideo ? fileVideo.size / 100 : 0
                  } bytes`}</span>{" "}
                  {}
                </div>
              </div>
              <i className="fas fa-check"></i>
            </li>
          </section>
        )}
        {fileVideo && (
          <form className={styles["form-field"]}>
            <div className={styles["form-item"]}>
              <input
                type="text"
                id="name"
                className={styles["form-input"]}
                value={inputValue.title}
                onChange={(e) =>
                  setInputValue((pre) => ({ ...pre, title: e.target.value }))
                }
                placeholder=" "
                required
              />
              <label htmlFor="name" className={styles["form-label"]}>
                Tiêu đề <small>(bắt buộc)</small>
              </label>
            </div>
            <div className={styles["form-item"]}>
              <textarea
                id="desciption"
                className={styles["form-input"] + " " + styles["desp"]}
                value={inputValue.description ?? ""}
                onChange={(e) =>
                  setInputValue((pre) => ({
                    ...pre,
                    description: e.target.value,
                  }))
                }
                placeholder=" "
              />
              <label
                htmlFor="desciption"
                className={styles["form-label"] + " " + styles["desp"]}
              >
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
                setFileVideo(undefined);
                setImg("");
                setInputValue({
                  title: "",
                  description: "",
                });
              }}
              className={styles["submit-btn"]}
            />
          </form>
        )}
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default Create;
