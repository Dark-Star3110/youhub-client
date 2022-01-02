import { gql } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { ToastContext } from "../../contexts/ToastContext";
import { useLogin } from "../../contexts/UserContext";
import {
  Action,
  useVideoQuery,
  useVoteVideoMutation,
  VoteType,
} from "../../generated/graphql";
import { getDateFromString } from "../../utils/dateHelper";
import { getNumToString } from "../../utils/numberHelper";
import Spinner from "../Spinner";
import styles from "./Video.module.scss";

interface VideoProps {
  videoId: string;
}

const Video = ({ videoId }: VideoProps) => {
  const {
    cache,
    state: { details },
  } = useLogin();
  const [action, setAction] = useState<"like" | "dislike" | "">("");
  const [voteVideoMutation /* , { loading } */] = useVoteVideoMutation();
  const { data: videoData, loading: queryLoading } = useVideoQuery({
    variables: { id: videoId },
    skip: !!!details,
  });

  const { notify } = useContext(ToastContext);

  const handleLike = async () => {
    const newAction = action === "like" ? "" : "like";
    const response = await voteVideoMutation({
      variables: {
        action: newAction === "like" ? Action.Activate : Action.Disactivate,
        type: VoteType.Like,
        videoId,
      },
    });
    if (response.data?.voteVideo.success) {
      cache.writeFragment({
        id: `Video:${videoId}`,
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
        videoId,
      },
    });
    if (response.data?.voteVideo.success) {
      cache.writeFragment({
        id: `Video:${videoId}`,
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
    if (videoData?.video)
      videoData?.video?.voteStatus === 1
        ? setAction("like")
        : videoData?.video?.voteStatus === -1
        ? setAction("dislike")
        : setAction("");
  }, [videoData?.video]);

  if (queryLoading && !videoData?.video && !details)
    return (
      <h1>
        <Spinner />
      </h1>
    );

  return (
    <>
      <iframe
        title="Drive video player"
        src={`https://drive.google.com/file/d/${videoId}/preview`}
        allow="autoplay"
        className={styles["primary-video"]}
        allowFullScreen
      ></iframe>
      <div className={styles["primary-video_inf"]}>
        <h3>{videoData?.video?.title}</h3>
        <div className={styles["primary-video_control"]}>
          <time>
            Đã tải lên vào {getDateFromString(videoData?.video?.createdAt)}
          </time>
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
          <div className={styles["primary-video_author__img"]}>
            <img
              src={
                videoData?.video?.user.image_url ||
                "https://images6.alphacoders.com/311/thumbbig-311015.webp"
              }
              alt="author"
            />
          </div>
          <div>
            <h4>{videoData?.video?.user.fullName}</h4>
            <small>
              {getNumToString(videoData?.video?.user.numSubscribers)} người đăng
              ký
            </small>
          </div>
        </div>
        <div className={styles.btn}>
          <button className={styles["scr-btn"]}>ĐĂNG KÝ</button>
        </div>
      </div>
      <div className={styles["primary-descript"]}>
        <pre>
          {`This video is made to entertain and satisfy viewers.
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
ASCAP và 14 Hiệp hội bảo vệ quyền âm nhạc.`}
        </pre>
      </div>
    </>
  );
};

export default Video;
