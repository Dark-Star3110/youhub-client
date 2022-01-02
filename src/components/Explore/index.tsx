import styles from "./Explore.module.scss";
import fire_icon from "./../../assets/icon/fire.png";
import game_icon from "./../../assets/icon/game.png";
import music_icon from "./../../assets/icon/music.png";
import news_icon from "./../../assets/icon/news.png";
import sport_icon from "./../../assets/icon/sport.png";

import user_img from "../../assets/img/user.png"; // rac
import { Link } from "react-router-dom";
import { useState } from "react";

const Explore = () => {
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

  const [tab, setTab] = useState("Video thịnh hành");

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <div
          className={styles["menu-item"]}
          onClick={() => setTab("Video thịnh hành")}
        >
          <div className={styles["menu-item__icon"]}>
            <img src={fire_icon} alt="icon" />
          </div>
          <div className={styles["menu-item__text"]}>Thịnh hành</div>
        </div>
        <div className={styles["menu-item"]} onClick={() => setTab("Âm nhạc")}>
          <div className={styles["menu-item__icon"]}>
            <img src={music_icon} alt="icon" />
          </div>
          <div className={styles["menu-item__text"]}>Âm nhạc</div>
        </div>
        <div className={styles["menu-item"]} onClick={() => setTab("Trò chơi")}>
          <div className={styles["menu-item__icon"]}>
            <img src={game_icon} alt="icon" />
          </div>
          <div className={styles["menu-item__text"]}>Trò chơi</div>
        </div>
        <div className={styles["menu-item"]} onClick={() => setTab("Tin tức")}>
          <div className={styles["menu-item__icon"]}>
            <img src={news_icon} alt="icon" />
          </div>
          <div className={styles["menu-item__text"]}>Tin tức</div>
        </div>
        <div className={styles["menu-item"]} onClick={() => setTab("Thể thao")}>
          <div className={styles["menu-item__icon"]}>
            <img src={sport_icon} alt="icon" />
          </div>
          <div className={styles["menu-item__text"]}>Thể thao</div>
        </div>
      </div>
      <div className={styles["content"]}>
        <h3 className={styles["content-title"]}>{tab}</h3>
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

export default Explore;
