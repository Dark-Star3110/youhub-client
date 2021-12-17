import { Link } from "react-router-dom";
import SlickNav from "../SlickNav";
import styles from "./Home.module.scss";

const Home = () => {
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
    },
  ];

  return (
    <div className={styles.home}>
      <SlickNav />
      <div className={styles.layout}>
        {data.map((video, index) => (
          <Link to={`/watch/${video.id}`} key={index}>
            <div className={styles["layout-item"]}>
              <img
                src={video.thumbNailUrl}
                alt="img"
                className={styles["layout-img"]}
              />
              <div className={styles["layout-content"]}>
                <h3 className={styles["layout-content_title"]}>
                  {video.title}
                </h3>
                <h4 className={styles["layout-content_descript"]}>
                  {video.description}
                </h4>
                <time className={styles["layout-content_time"]}>
                  {video.createdAt}
                </time>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
