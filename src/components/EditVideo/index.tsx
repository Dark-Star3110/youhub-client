import { useRouter } from "../../hooks/useRouter";
import { useContext, useState } from "react";
import { useUpdateVideoMutation, useVideoQuery } from "../../generated/graphql";
import styles from "./EditVideo.module.scss";
import { ToastContext } from "../../contexts/ToastContext";
import { useLogin } from "../../contexts/UserContext";
import { gql } from "@apollo/client";

const EditVideo = () => {
  const { cache } = useLogin();

  const router = useRouter();
  const videoId = router.query.slug as string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, loading } = useVideoQuery({
    variables: {
      id: videoId,
    },
  });

  const [isChange, setIsChange] = useState(false);
  const [inputValue, setInputValue] = useState({
    title: data?.video?.title,
    description: data?.video?.description,
  });

  // update video
  const { notify } = useContext(ToastContext);
  const [updateVideoMutation] = useUpdateVideoMutation();

  const updateVideo = async () => {
    const response = await updateVideoMutation({
      variables: {
        videoId,
        updateVideoInput: inputValue,
      },
    });
    if (response.data?.updateVideo.success) {
      notify("success", "Chỉnh sửa video thành công 😑");
      cache.writeFragment({
        id: `Video:${videoId}`,
        fragment: gql`
          fragment VideoUpdate on Video {
            content
            updatedAt
          }
        `,
        data: {
          content: inputValue,
          updatedAt: new Date().toString(),
        },
      });
      router.navigate("/");
    } else {
      notify("error", "Có lỗi xảy ra vui lòng thử lại! 😥");
    }
  };

  return (
    <div className={styles.content}>
      <h3>Tiêu đề và nội dung mô tả Video</h3>
      <small>Chọn tiêu đề thể hiện cá tính và nội dung video của bạn.</small>
      <div className={styles.form}>
        <div className={styles["form-item"]}>
          <input
            type="text"
            id="name"
            className={styles["form-input"]}
            value={inputValue.title}
            onChange={(e) => {
              setIsChange(true);
              setInputValue((pre) => ({
                ...pre,
                title: e.target.value,
              }));
            }}
            placeholder=" "
            required
          />
          <label htmlFor="name" className={styles["form-label"]}>
            Tiêu đề
          </label>
        </div>
        <div className={styles["form-item"]}>
          <textarea
            id="desciption"
            className={styles["form-input"] + " " + styles["desp"]}
            value={inputValue.description ?? ""}
            onChange={(e) => {
              setIsChange(true);
              setInputValue((pre) => ({
                ...pre,
                description: e.target.value,
              }));
            }}
            placeholder=" "
          />
          <label htmlFor="desciption" className={styles["form-label"]}>
            Mô tả{" "}
            <small>
              Giới thiệu với người xem về video của bạn. Nội dụng mô tả sẽ xuất
              hiện dưới video của bạn
            </small>
          </label>
        </div>
      </div>
      <div className={styles["btns"]}>
        <button
          className={
            styles["cancel-btn"] + " " + styles[`${isChange ? "active" : ""}`]
          }
          disabled={isChange ? false : true}
          onClick={() => {
            setIsChange(false);
            setInputValue({
              title: data?.video?.title,
              description: data?.video?.description,
            });
          }}
        >
          HỦY
        </button>
        <button
          className={
            styles["save-btn"] + " " + styles[`${isChange ? "active" : ""}`]
          }
          disabled={isChange ? false : true}
          onClick={updateVideo}
        >
          LƯU THAY ĐỔI
        </button>
      </div>
    </div>
  );
};

export default EditVideo;
