import { useLogin } from "../../contexts/UserContext";
import styles from "./Comment.module.scss";
import user_img from "../../assets/img/user.png";
import { useState } from "react";

const Comment = () => {
  const comments = [
    {
      id: "123",
      content: "Thích đứa cùng lớp mà k dám nói sợ nó chê mình xấu :((",
      createdAt: "24/12/2021",
      user: {
        firstName: "user",
        lastName: "mr",
        image_url:
          "https://yt3.ggpht.com/ytc/AKedOLTcstpVUE2ht97_Hy1DL9J_07seBxbYjgN3Ckvy_g=s88-c-k-c0x00ffffff-no-rj",
      },
    },
    {
      id: "124",
      content:
        "không thể tồn tại tình bạn thân giữa nam và nữ, mối quan hệ được kéo dài vì có một trong 2 người tồn tại tình yêu",
      createdAt: "24/12/2021",
      user: {
        firstName: "user",
        lastName: "mr",
        image_url:
          "https://yt3.ggpht.com/kcNwG6e0hIQ6QY4Q1Z_lqLYpjLUy4KiV-AjzsaR9c7H3ak69lbI_2q6BuS4oZuL_-Dp5VCH-edo=s88-c-k-c0x00ffffff-no-rj",
      },
    },
    {
      id: "125",
      content:
        "Đối với cô ấy tôi luôn là một người bạn tốt chứ không phải một người đặc biệt trong tim .... :v",
      createdAt: "24/12/2021",
      user: {
        firstName: "user",
        lastName: "mr",
        image_url:
          "https://yt3.ggpht.com/ytc/AKedOLQoSaygx6nSEkrr4fbfpnbM1qqrc-rJ68I3vj9MYw=s88-c-k-c0x00ffffff-no-rj",
      },
    },
    {
      id: "126",
      content:
        "khoảng cách từ tình bạn thân đến tình yêu mong manh lắm! Vội vàng nói lời yêu để rồi ôm nỗi buồn riêng một mình ta",
      createdAt: "24/12/2021",
      user: {
        firstName: "user",
        lastName: "mr",
        image_url:
          "https://yt3.ggpht.com/B4Otkp4t4-YtpqyG3H2801wQVA2Hqq64mRB0-ZvCthmVj8wHA3xj3JY4_brLlG3uZe9EA4vk0lk=s88-c-k-c0x00ffffff-no-rj",
      },
    },
  ];

  const [show, setShow] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const {
    state: { details },
  } = useLogin();

  return (
    <div className={styles.Comment}>
      <h3>69 bình luận</h3>
      <div className={styles["comment-item"]}>
        <div className={styles["comment-item__img"]}>
          <img
            src={details ? (details.image_url as string) : user_img}
            alt="user"
          />
        </div>
        <div className={styles["comment-input"]}>
          <input
            type="text"
            className={styles["comment-input_control"]}
            placeholder="Bình luận công khai..."
            onFocus={() => setShow(true)}
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
          />
          {show && (
            <div className={styles["comment-btn"]}>
              <button
                className={styles["cancel-btn"]}
                onClick={() => setShow(false)}
              >
                HỦY
              </button>
              <button
                className={
                  styles["save-btn"] +
                  " " +
                  styles[`${commentValue === "" ? "" : "active"}`]
                }
                disabled={commentValue === "" ? true : false}
                onClick={() => console.log("handeComment")}
              >
                BÌNH LUẬN
              </button>
            </div>
          )}
        </div>
      </div>
      {comments.map((comment) => (
        <div className={styles["comment-item"]} key={comment.id}>
          <div className={styles["comment-item__img"]}>
            <img src={comment.user.image_url} alt="user" />
          </div>
          <div>
            <h3>
              {comment.user.lastName + " " + comment.user.firstName}{" "}
              <small>{comment.createdAt}</small>
            </h3>
            <h4>{comment.content}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
