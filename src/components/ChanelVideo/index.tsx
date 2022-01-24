/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router-dom";
import { useUserVideosQuery } from "../../generated/graphql";
import { getDateFromString } from "../../utils/dateHelper";
import Spinner from "../Spinner";
import styles from "./ChanelVideo.module.scss";
import Slider from "react-slick";

const ChanelVideo: React.FC<{ userId: string }> = ({ userId }) => {
  const { data, loading, fetchMore, networkStatus } = useUserVideosQuery({
    variables: {
      userId,
      limit: 4,
    },
  });

  const settings = {
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    speed: 500,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading && !data?.videoUser?.paginatedVideos)
    return (
      <h1>
        <Spinner />
      </h1>
    );

  if (!loading && !data?.videoUser?.paginatedVideos)
    return <h2>Không có video</h2>;

  const videos = data?.videoUser?.paginatedVideos;

  return (
    <Slider {...settings}>
      {videos?.map((video, index) => {
        return (
          <Link to={`/watch/${video.id}`} key={index}>
            <div className={styles["layout-item"]}>
              <div className={styles["layout-img-container"]}>
                <img
                  src={
                    video.thumbnailUrl ||
                    "https://images6.alphacoders.com/311/thumbbig-311015.webp"
                  }
                  alt="img"
                  className={styles["layout-img"]}
                />
                <h2>Xem ngay</h2>
              </div>
              <div className={styles["layout-content"]}>
                <div className={styles["layout-content_inf"]}>
                  <h3 className={styles["layout-content_title"]}>
                    {video.title}
                  </h3>
                  <time className={styles["layout-content_time"]}>
                    {getDateFromString(video.createdAt)}
                  </time>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </Slider>
  );
};

export default ChanelVideo;
