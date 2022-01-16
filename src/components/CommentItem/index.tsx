import { useContext, useEffect, useRef, useState } from "react";
import { ToastContext } from "../../contexts/ToastContext";
import {
  Action,
  CommentDocument,
  useCommentQuery,
  useUpdateCommentMutation,
  useVoteCommentMutation,
  VoteType,
} from "../../generated/graphql";
import styles from "./CommentItem.module.scss";
import heart from "../../assets/icon/heart.png";
import hearted from "../../assets/icon/hearted.png";
import brokenheart from "../../assets/icon/broken-heart.png";
import Spinner from "../Spinner";
import { getStringToDate } from "../../utils/dateHelper";
import { useLogin } from "../../contexts/UserContext";

interface CommentItemProps {
  id: string;
}

const CommentItem = ({ id }: CommentItemProps) => {
  const [cmtSelected, setCmtSelected] = useState("");
  const [cmtEdit, setCmtEdit] = useState("");
  const [value, setValue] = useState("");
  // ==========================
  const ref = useRef<HTMLInputElement | null>(null);
  // =========================

  const {
    state: { details },
  } = useLogin();

  const { data, loading } = useCommentQuery({
    variables: {
      id,
    },
  });
  const comment = data?.comment;

  // like comment =================================================
  const [action, setAction] = useState<"like" | "dislike" | "">("");
  const [voteCommentMutation /* , { loading } */] = useVoteCommentMutation();

  const { notify } = useContext(ToastContext);

  const handleLike = async () => {
    const newAction = action === "like" ? "" : "like";
    const response = await voteCommentMutation({
      variables: {
        action: newAction === "like" ? Action.Activate : Action.Disactivate,
        type: VoteType.Like,
        voteCommentCommentId2: id,
      },
      refetchQueries: [{ query: CommentDocument, variables: { id } }],
    });
    if (!response.data?.voteComment.success) {
      notify("error", "Something went wrong");
    }
    console.log(response.data?.voteComment);
  };

  const handleDisLike = async () => {
    const newAction = action === "dislike" ? "" : "dislike";
    const response = await voteCommentMutation({
      variables: {
        action: newAction === "dislike" ? Action.Activate : Action.Disactivate,
        type: VoteType.Dislike,
        voteCommentCommentId2: id,
      },
      refetchQueries: [{ query: CommentDocument, variables: { id } }],
    });
    if (!response.data?.voteComment.success) {
      notify("error", "Something went wrong");
    }
    console.log(response.data?.voteComment);
  };

  // edit comment ===================
  const handleShowEdit = (id: string, content: string) => {
    setCmtEdit(cmtEdit === "" ? id : "");
    setValue(content);
  };

  const [onEditCmt] = useUpdateCommentMutation();

  const handleEditCmt = async (id: string) => {
    const response = await onEditCmt({
      variables: {
        updateCommentInput: {
          content: value,
        },
        commentId: id,
      },
      refetchQueries: [{ query: CommentDocument, variables: { id } }],
    });
    if (response.data?.updateComment.success) {
      notify("success", "Chỉnh sửa bình luận thành công 😩");
      setCmtEdit("");
    }
  };

  useEffect(() => {
    console.log(ref.current);

    ref.current?.focus();
  }, []);

  useEffect(() => {
    if (comment)
      comment.voteStatus === 1
        ? setAction("like")
        : comment?.voteStatus === -1
        ? setAction("dislike")
        : setAction("");
  }, [comment]);
  return (
    <>
      {loading && <Spinner />}
      {comment && (
        <div className={styles["comment-item"]} key={comment.id}>
          <div className={styles["comment-item__img"]}>
            <img src={comment.user.image_url as string} alt="user" />
            <div className={styles["comment-item__reactIcon"]}>
              {comment.voteStatus !== 1 && comment.voteStatus !== -1 && (
                <>
                  <img src={heart} alt="icon" />
                  <span>{comment.numUsersLiked}</span>
                </>
              )}
              {comment.voteStatus === 1 && (
                <>
                  <img src={hearted} alt="icon" />
                  <span>{comment.numUsersLiked}</span>
                </>
              )}
              {comment.voteStatus === -1 && (
                <img src={brokenheart} alt="icon" />
              )}
            </div>
          </div>
          <div className={styles["comment-item__info"]}>
            <h3>
              {comment.user.lastName + " " + comment.user.firstName}{" "}
              <small>
                {getStringToDate(comment.updatedAt)}
                {comment.createdAt !== comment.updatedAt && "(đã chỉnh sửa)"}
              </small>
            </h3>
            {cmtEdit === comment.id ? (
              <>
                <input
                  value={value}
                  type="text"
                  onChange={(e) => setValue(e.target.value)}
                  ref={ref}
                />
                <div className={styles["control"]}>
                  <button
                    className={styles["cancel-btn"]}
                    onClick={() => {
                      setCmtEdit("");
                    }}
                  >
                    HỦY
                  </button>
                  <button
                    className={styles["save-btn"]}
                    onClick={() => handleEditCmt(comment.id)}
                  >
                    LƯU
                  </button>
                </div>
              </>
            ) : (
              <h4>{comment.content}</h4>
            )}
          </div>
          <div
            className={
              styles.navigation +
              " " +
              styles[comment.id === cmtSelected ? "active" : ""]
            }
            onClick={() => {
              setCmtSelected((pre) => {
                return comment.id === pre ? "" : comment.id;
              });
            }}
          >
            <span onClick={handleLike}>
              <i className="far fa-heart"></i>
            </span>

            {comment.user.id === details?.id ? (
              <span
                onClick={() => {
                  ref.current?.focus();
                  // console.log(ref.current);
                  handleShowEdit(comment.id, comment.content);
                }}
              >
                <i className="far fa-edit"></i>
              </span>
            ) : (
              <span onClick={handleDisLike}>
                <i className="fas fa-heart-broken"></i>
              </span>
            )}
            <span>
              {comment.user.id === details?.id ? (
                <i className="far fa-trash-alt"></i>
              ) : (
                <i className="far fa-comment-dots"></i>
              )}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentItem;
