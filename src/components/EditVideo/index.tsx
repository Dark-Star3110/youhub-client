import { useRouter } from "../../hooks/useRouter";
import { useState } from "react";
import { useVideoQuery } from "../../generated/graphql";
import styles from "./EditVideo.module.scss";

const EditVideo = () => {
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
            value={inputValue.description}
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
          onClick={() => console.log("handleSave")}
        >
          LƯU THAY ĐỔI
        </button>
      </div>
    </div>
  );
};

export default EditVideo;
