import styles from "./UserVideos.module.scss";
import user_img from "../../assets/img/user.png";
import { Link } from "react-router-dom";

const UserVideos = () => {
  const dataFake = [
    {
      id: "17ZXlVzLb0toTe3dtO8q80DmVlnQz9R99",
      title: "Tokyo Ghoul",
      description: "this is description",
      userId: "1",
      commentable: true,
      thumbnailUrl: "https://images8.alphacoders.com/546/thumbbig-546902.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
      user: {
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
      thumbnailUrl: "https://images2.alphacoders.com/119/thumbbig-1192178.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
      user: {
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
      thumbnailUrl: "https://images8.alphacoders.com/533/thumbbig-533007.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
      user: {
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
      thumbnailUrl: "https://images3.alphacoders.com/135/thumbbig-135625.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
      user: {
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
      thumbnailUrl: "https://images.alphacoders.com/605/thumbbig-605799.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
      user: {
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
      thumbnailUrl: "https://images6.alphacoders.com/606/thumbbig-606263.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
      user: {
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
      thumbnailUrl: "https://images3.alphacoders.com/167/thumbbig-16729.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
      user: {
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
      thumbnailUrl: "https://images5.alphacoders.com/613/thumbbig-613925.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
      user: {
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
      thumbnailUrl: "https://images2.alphacoders.com/742/thumbbig-742320.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
      user: {
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
      thumbnailUrl: "https://images6.alphacoders.com/311/thumbbig-311015.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
      user: {
        firstName: "user",
        lastName: "mr",
        image_url: user_img,
      },
    },
  ];

  const videos = dataFake;

  return (
    <div className={styles["user-videos"]}>
      <h3>Video tải lên</h3>
      <div className={styles.layout}>
        {videos?.map((video, index) => (
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
                    {video.createdAt}
                  </time>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserVideos;
