import { gql } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContext } from "../../contexts/ToastContext";
import { useLogin } from "../../contexts/UserContext";
import {
  Action,
  useVoteVideoMutation,
  Video as VideoType,
  VoteType,
} from "../../generated/graphql";
import { getDateFromString } from "../../utils/dateHelper";
import { getNumToString } from "../../utils/numberHelper";
import Comment from "../Comment";
import SubscribeBtn from "../User/SubscribeBtn/SubscribeBtn";
import styles from "./Video.module.scss";

interface VideoProps {
  videoData: VideoType;
}

const Video = ({ videoData: video }: VideoProps) => {
  const { cache } = useLogin();
  const [action, setAction] = useState<"like" | "dislike" | "">("");
  const [voteVideoMutation /* , { loading } */] = useVoteVideoMutation();
  // const { data: videoData, loading: queryLoading } = useVideoQuery({
  //   variables: { id: video },
  //   skip: !!!details,
  // });

  const { notify } = useContext(ToastContext);

  const handleLike = async () => {
    const newAction = action === "like" ? "" : "like";
    const response = await voteVideoMutation({
      variables: {
        action: newAction === "like" ? Action.Activate : Action.Disactivate,
        type: VoteType.Like,
        videoId: video.id,
      },
    });
    if (response.data?.voteVideo.success) {
      cache.writeFragment({
        id: `Video:${video.id}`,
        fragment: gql`
          fragment VoteType on Video {
            voteStatus
          }
        `,
        data: {
          voteStatus: newAction === "like" ? 1 : 0,
        },
      });
    } else {
      notify("error", "Something went wrong");
    }
  };

  const handleDisLike = async () => {
    const newAction = action === "dislike" ? "" : "dislike";
    const response = await voteVideoMutation({
      variables: {
        action: newAction === "dislike" ? Action.Activate : Action.Disactivate,
        type: VoteType.Dislike,
        videoId: video.id,
      },
    });
    if (response.data?.voteVideo.success) {
      cache.writeFragment({
        id: `Video:${video.id}`,
        fragment: gql`
          fragment VoteType on Video {
            voteStatus
          }
        `,
        data: {
          voteStatus: newAction === "dislike" ? -1 : 0,
        },
      });
    } else {
      notify("error", "Something went wrong");
    }
  };

  useEffect(() => {
    if (video)
      video.voteStatus === 1
        ? setAction("like")
        : video?.voteStatus === -1
        ? setAction("dislike")
        : setAction("");
  }, [video]);

  /*   const test = `This video is made to entertain and satisfy viewers.
  I don't own anything related to the background photo,
  credits go to the respective owners of the audio and the photo.
  #RADWIMPS #Nandemonaiya #なんでもないや
  Nhạc trong video này
  Tìm hiểu thêm
  Bài hát
  なんでもないや(movie ver.)
  Nghệ sĩ
  RADWIMPS
  Bên cấp phép cho YouTube
  ASCAP và 14 Hiệp hội bảo vệ quyền âm nhạc.` */

  return (
    <>
      <div className={styles["primary-video"]}>
        <iframe
          title="Drive video player"
          src={`https://drive.google.com/file/d/${video.id}/preview`}
          allow="autoplay"
          allowFullScreen
          className={styles["primary-video__d"]}
        ></iframe>
      </div>

      <div className={styles["primary-video_inf"]}>
        <h3>{video.title}</h3>
        <div className={styles["primary-video_control"]}>
          <time>Đã tải lên vào {getDateFromString(video.createdAt)}</time>
          <div className={styles["primary-video_icon"]}>
            <div
              className={
                styles["primary-video_icon-item"] +
                " " +
                styles[action] +
                " " +
                styles["like-btn"]
              }
              onClick={handleLike}
            >
              <span>
                <i className="far fa-thumbs-up"></i>
              </span>
              <span>THÍCH</span>
            </div>
            <div
              className={
                styles["primary-video_icon-item"] +
                " " +
                styles[action] +
                " " +
                styles["dislike-btn"]
              }
              onClick={handleDisLike}
            >
              <span>
                <i className="far fa-thumbs-down"></i>
              </span>
              <span>KHÔNG THÍCH</span>
            </div>
            <div className={styles["primary-video_icon-item"]}>
              <span>
                <i className="far fa-flag"></i>
              </span>
              <span>BÁO CÁO</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles["primary-video_author"]}>
        <div className={styles["primary-video_author__inf"]}>
          <Link to={`/user/${video.user.id}`}>
            <div className={styles["primary-video_author__img"]}>
              <img
                src={
                  video.user.image_url ||
                  "https://images6.alphacoders.com/311/thumbbig-311015.webp"
                }
                alt="author"
              />
            </div>
          </Link>
          <div>
            <Link to={`/user/${video.user.id}`}>
              <h4 title={video.user.fullName || ""}>{video.user.fullName}</h4>
            </Link>
            <small>
              {getNumToString(video.user.numSubscribers)} người đăng ký
            </small>
          </div>
        </div>
        <SubscribeBtn
          fullName={video.user.fullName as string}
          subscribeStatus={video.user.subscribeStatus}
          userId={video.user.id}
        />
      </div>
      <div className={styles["primary-descript"]}>
        <pre>{video.description}</pre>
      </div>

      {video.commentable ? (
        <Comment videoId={video.id} />
      ) : (
        <h2>Video này đã được tắt bình luận</h2>
      )}
    </>
  );
};

export default Video;
