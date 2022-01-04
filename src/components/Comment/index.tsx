import { useCallback, useEffect, useState } from "react";
import user_img from "../../assets/img/user.png";
import { useLogin } from "../../contexts/UserContext";
import {
  CommentDocument,
  CommentQuery,
  useCommentsQuery,
  useCreateCommentMutation,
} from "../../generated/graphql";
import { getStringToDate } from "../../utils/dateHelper";
import { getNumToString } from "../../utils/numberHelper";
import Spinner from "../Spinner";
import styles from "./Comment.module.scss";

interface CommentProps {
  videoId: string;
}

const Comment = ({ videoId }: CommentProps) => {
  const [refresh, setRefresh] = useState(false);
  const [show, setShow] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const {
    state: { details },
    socket,
    cache,
  } = useLogin();

  const { data, loading: queryLoading } = useCommentsQuery({
    variables: {
      getCmtInput: { limit: 4, videoId },
    },
    notifyOnNetworkStatusChange: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [onCmtCreate, { loading: createLoading }] = useCreateCommentMutation();

  useEffect(() => {
    socket.on("message", (comment) => {
      cache.writeQuery<CommentQuery>({
        query: CommentDocument,
        data: { comment },
      });
      cache.modify({
        fields: {
          comments(existing) {
            const cmtRef = cache.identify(comment);
            const newComments = existing.totalCount
              ? {
                  ...existing,
                  totalCount: existing.totalCount + 1,
                  paginatedComments: [
                    { __ref: cmtRef },
                    ...existing.paginatedComments,
                  ],
                }
              : {
                  totalCount: 1,
                  hasMore: false,
                  cursor: comment.createdAt,
                  paginatedComments: [{ __ref: cmtRef }],
                };
            return newComments;
          },
        },
        optimistic: true,
        broadcast: true,
      });
    });
    return () => {
      socket.off("message");
    };
  }, [socket, cache]);

  // refresh time update comment
  const refreshHandler = useCallback(() => {
    setRefresh((prev) => !prev);
  }, []);
  useEffect(() => {
    setTimeout(refreshHandler, 1000 * 61 * 2);
  }, [refresh, refreshHandler]);

  const handleCreateComment = async () => {
    const response = await onCmtCreate({
      variables: {
        videoId,
        createCommentInput: {
          content: commentValue,
        },
      },
    });
    if (response.data?.createComment.comment) {
      setCommentValue("");
      socket.emit("comment", response.data.createComment.comment, videoId);
    }
  };

  const commentsFake = [
    {
      id: "123",
      content: "Thích đứa cùng lớp mà k dám nói sợ nó chê mình xấu :((",
      createdAt: "24/12/2021",
      updatedAt: "24/12/2021",
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
      updatedAt: "24/12/2021",
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
      updatedAt: "24/12/2021",
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
      updatedAt: "24/12/2021",
      user: {
        firstName: "user",
        lastName: "mr",
        image_url:
          "https://yt3.ggpht.com/B4Otkp4t4-YtpqyG3H2801wQVA2Hqq64mRB0-ZvCthmVj8wHA3xj3JY4_brLlG3uZe9EA4vk0lk=s88-c-k-c0x00ffffff-no-rj",
      },
    },
  ];

  if (queryLoading) return <Spinner />;
  const comments = data?.comments?.paginatedComments || commentsFake;
  return (
    <div className={styles.Comment}>
      <h3>{getNumToString(data?.comments?.totalCount)} bình luận</h3>
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
                onClick={() => {
                  setShow(false);
                  setCommentValue("");
                }}
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
                onClick={handleCreateComment}
              >
                BÌNH LUẬN
              </button>
            </div>
          )}
        </div>
      </div>
      {comments?.map((comment) => (
        <div className={styles["comment-item"]} key={comment.id}>
          <div className={styles["comment-item__img"]}>
            <img src={comment.user.image_url as string} alt="user" />
          </div>
          <div>
            <h3>
              {comment.user.lastName + " " + comment.user.firstName}{" "}
              <small>
                {getStringToDate(comment.updatedAt)}
                {comment.createdAt !== comment.updatedAt && "(đã chỉnh sửa)"}
              </small>
            </h3>
            <h4>{comment.content}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
