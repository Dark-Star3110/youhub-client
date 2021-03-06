import axios from "axios";
import Loading from "../Loading";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { ToastContext } from "../../contexts/ToastContext";
import { useLogin } from "../../contexts/UserContext";
import { useCreateVideoMutation } from "../../generated/graphql";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { useRouter } from "../../hooks/useRouter";
import styles from "./Create.module.scss";

const categories = {
  music: "9e53165f-f37b-ec11-8359-405bd82e7629",
  game: "a153165f-f37b-ec11-8359-405bd82e7629",
  news: "a053165f-f37b-ec11-8359-405bd82e7629",
  sport: "9f53165f-f37b-ec11-8359-405bd82e7629",
  other: "a253165f-f37b-ec11-8359-405bd82e7629",
};

const Create = () => {
  useCheckAuth();
  const {
    state: { token, details },
    socket,
  } = useLogin();
  const [fileVideo, setFileVideo] = useState<File>();
  const [fileImg, setFileImg] = useState<File>();
  const [img, setImg] = useState<string>("");
  const [percent, setPercent] = useState(0);
  const [inputValue, setInputValue] = useState({
    title: "",
    description: "",
  });
  const [categoriesChoose, setCategoriesChoose] = useState<string[]>([]);
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
        if (!inputValue.description) {
          notify("warning", "Vui lòng nhập mô tả");
          return;
        }

        const res = await axios.post(
          `${process.env.REACT_APP_ENDPOINT}/video/upload`,
          formData,
          {
            onUploadProgress: (progressEvent) => {
              let newPercent = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              setPercent(newPercent);
            },
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

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
              categoriesId: categoriesChoose,
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
        console.log(res_graph.data?.createVideo);
        if (res_graph.data?.createVideo.video) {
          setLoading(false);
          notify("success", "đăng video thành công");
          socket.emit(
            "upload-video",
            details?.id,
            res_graph.data?.createVideo.video.id
          );
          setTimeout(() => router.push("/"), 1000);
        } else {
          notify("error", "có lỗi xảy ra vui lòng thử lại!");
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
        notify("error", "có lỗi xảy ra vui lòng thử lại!");
        setLoading(false);
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

  const handleChooseCategory = (id: string) => {
    if (categoriesChoose.includes(id)) {
      setCategoriesChoose((prev) => prev.filter((state) => state !== id));
    } else {
      setCategoriesChoose((prev) => [...prev, id]);
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
            <div className={styles.category}>
              <ul>
                <li>Chọn thể loại</li>
                <li>
                  <label>
                    Âm nhạc
                    <input
                      type="checkbox"
                      name=""
                      checked={categoriesChoose.includes(categories.music)}
                      onChange={() => handleChooseCategory(categories.music)}
                    />
                    <span className={styles.check}></span>
                  </label>
                </li>
                <li>
                  <label>
                    Trò chơi
                    <input
                      type="checkbox"
                      name=""
                      checked={categoriesChoose.includes(categories.game)}
                      onChange={() => handleChooseCategory(categories.game)}
                    />
                    <span className={styles.check}></span>
                  </label>
                </li>
                <li>
                  <label>
                    Tin tức
                    <input
                      type="checkbox"
                      name=""
                      checked={categoriesChoose.includes(categories.news)}
                      onChange={() => handleChooseCategory(categories.news)}
                    />
                    <span className={styles.check}></span>
                  </label>
                </li>
                <li>
                  <label>
                    Thể thao
                    <input
                      type="checkbox"
                      name=""
                      checked={categoriesChoose.includes(categories.sport)}
                      onChange={() => handleChooseCategory(categories.sport)}
                    />
                    <span className={styles.check}></span>
                  </label>
                </li>
                <li>
                  <label>
                    Mục khác
                    <input
                      type="checkbox"
                      name=""
                      checked={categoriesChoose.includes(categories.other)}
                      onChange={() => handleChooseCategory(categories.other)}
                    />
                    <span className={styles.check}></span>
                  </label>
                </li>
              </ul>
            </div>
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
