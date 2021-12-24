import { useEffect, useState } from "react";
import { useRouter } from "../../hooks/useRouter";
import Comment from "../Comment";

import styles from "./Watch.module.scss";
import user_img from "../../assets/img/user.png";
import author_img from "../../assets/img/author.jpg";
import { Link } from "react-router-dom";

const Watch = () => {
  const data = [
    {
      id: "17ZXlVzLb0toTe3dtO8q80DmVlnQz9R99",
      title: "Tokyo Ghoul",
      description: "this is description",
      userId: "1",
      commentable: true,
      thumbNailUrl: "https://images8.alphacoders.com/546/thumbbig-546902.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
      author: {
        firstName: "user",
        lastName: "mr",
        image_url: user_img,
      },
    },
    {
      id: "1r27Pc7Y4p8VALLxl3MUZSvMIAIoK2CGe",
      title: "Arcane",
      description: "this is description",
      userId: "1",
      commentable: true,
      thumbNailUrl: "https://images2.alphacoders.com/119/thumbbig-1192178.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
      author: {
        firstName: "user",
        lastName: "mr",
        image_url: user_img,
      },
    },
    {
      id: "1VOhQq4iMun2ojv9CindmKnd4s4CgAwDd",
      title: "Sword Art Online",
      description: "this is description",
      userId: "1",
      commentable: true,
      thumbNailUrl: "https://images8.alphacoders.com/533/thumbbig-533007.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
      author: {
        firstName: "user",
        lastName: "mr",
        image_url: user_img,
      },
    },
    {
      id: "1HSLvuGOSUfDQWC7ZwZlFobnfzlgGfwld",
      title: "Naruto",
      description: "this is description",
      userId: "1",
      commentable: true,
      thumbNailUrl: "https://images3.alphacoders.com/135/thumbbig-135625.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
      author: {
        firstName: "user",
        lastName: "mr",
        image_url: user_img,
      },
    },
    {
      id: "1c2dBx0KCmX3aAbqRFYaJLxiwIPeOoZ73",
      title: "Dragon Ball",
      description: "this is description",
      userId: "1",
      commentable: true,
      thumbNailUrl: "https://images.alphacoders.com/605/thumbbig-605799.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
      author: {
        firstName: "user",
        lastName: "mr",
        image_url: user_img,
      },
    },
    {
      id: "12STlO4qx1tccXTTvRmdGG8cU57EJEdbK",
      title: "One Piece Stamp",
      description: "this is description",
      userId: "1",
      commentable: true,
      thumbNailUrl: "https://images6.alphacoders.com/606/thumbbig-606263.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
      author: {
        firstName: "user",
        lastName: "mr",
        image_url: user_img,
      },
    },
    {
      id: "1GoZqWSYQXk2YYQz6T4KT27QCiPrSfK2V",
      title: "Bleach EX",
      description: "this is description",
      userId: "1",
      commentable: true,
      thumbNailUrl: "https://images3.alphacoders.com/167/thumbbig-16729.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
      author: {
        firstName: "user",
        lastName: "mr",
        image_url: user_img,
      },
    },
    {
      id: "1XN64i3mSXalozFZ6lFBiDJSlgYHdZztG",
      title: "Pokemon",
      description: "this is description",
      userId: "1",
      commentable: true,
      thumbNailUrl: "https://images5.alphacoders.com/613/thumbbig-613925.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
      author: {
        firstName: "user",
        lastName: "mr",
        image_url: user_img,
      },
    },
    {
      id: "1Ot-lfQvZtOFrBv78hTmLT8SrMR3qflEs",
      title: "Your Name",
      description: "this is description",
      userId: "1",
      commentable: true,
      thumbNailUrl: "https://images2.alphacoders.com/742/thumbbig-742320.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
      author: {
        firstName: "user",
        lastName: "mr",
        image_url: user_img,
      },
    },
    {
      id: "1D2Jya5U-kcuRjJSPJSfi4ZMJm1AQSyAx",
      title: "Fairy Tail",
      description: "this is description",
      userId: "1",
      commentable: true,
      thumbNailUrl: "https://images6.alphacoders.com/311/thumbbig-311015.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
      author: {
        firstName: "user",
        lastName: "mr",
        image_url: user_img,
      },
    },
  ];
  // state
  const [videoId, setVideoId] = useState("");
  const [action, setAction] = useState("");

  // location
  const router = useRouter();

  // effect
  useEffect(() => {
    const { slug } = router.query;
    // console.log(slug);
    setVideoId(slug as string);
  }, [router.query]);

  const handleLike = () => {
    const newAction = action === "like" ? "" : "like";
    setAction(newAction);
  };

  const handleDisLike = () => {
    const newAction = action === "dislike" ? "" : "dislike";
    setAction(newAction);
  };

  return (
    <div className={styles.watch}>
      <div className={styles["primary"]}>
        <iframe
          title="Drive video player"
          src={`https://drive.google.com/file/d/${videoId}/preview`}
          allow="autoplay"
          className={styles["primary-video"]}
        ></iframe>
        <div className={styles["primary-video_inf"]}>
          <h3>This is Current video of Title</h3>
          <div className={styles["primary-video_control"]}>
            <time>Đã tải lên vào 24 thg 12,2021</time>
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
              <img src={author_img} alt="author" />
            </div>
            <div>
              <h4>Author Name</h4>
              <small>69N người đăng ký</small>
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
        <Comment />
      </div>
      <div className={styles["secondary"]}>
        {data.map((video) => (
          <Link to={`/watch/${video.id}`} key={video.id}>
            <div className={styles["secondary-item"]}>
              <div className={styles["secondary-item_img"]}>
                <img src={video.thumbNailUrl} alt="video" />
              </div>
              <div className={styles["secondary-item_content"]}>
                <h3>
                  {video.title} - {video.description}
                </h3>
                <h4>{video.author.lastName + " " + video.author.firstName}</h4>
                <h4>{video.createdAt}</h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Watch;
