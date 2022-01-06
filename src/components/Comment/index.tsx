import { NetworkStatus } from "@apollo/client";
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

  const {
    data,
    loading: queryLoading,
    fetchMore,
    networkStatus,
  } = useCommentsQuery({
    variables: {
      getCmtInput: { limit: 4, videoId },
    },
    notifyOnNetworkStatusChange: true,
  });

  const loadingMore = networkStatus === NetworkStatus.fetchMore;

  const [onCmtCreate] = useCreateCommentMutation();

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

  const comments = data?.comments?.paginatedComments;
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
      {!comments && (
        <div className={styles["no-comment"]}>
          <h3>Chưa có bình luận</h3>
        </div>
      )}
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
      {data?.comments?.hasMore && (
        <div
          onClick={() =>
            fetchMore({
              variables: {
                getCmtInput: {
                  videoId,
                  cursor: data.comments?.cursor,
                  limit: 4,
                },
              },
            })
          }
          className={styles["show-more"]}
        >
          Hiển thị thêm bình luận
        </div>
      )}
      {loadingMore && <Spinner />}
    </div>
  );
};

export default Comment;
