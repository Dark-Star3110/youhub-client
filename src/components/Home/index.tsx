import SlickNav from "../SlickNav";
import styles from "./Home.module.scss";


const Home = () => {
  const data = [
    {
      id: "123",
      title: "this is title",
      description: "this is description",
      userId: "1",
      commentable: true,
      thumbNailUrl: "https://images8.alphacoders.com/546/thumbbig-546902.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
    },
    {
      id: "124",
      title: "this is title",
      description: "this is description",
      userId: "1",
      commentable: true,
      thumbNailUrl: "https://images2.alphacoders.com/119/thumbbig-1192178.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
    },
    {
      id: "125",
      title: "this is title",
      description: "this is description",
      userId: "1",
      commentable: true,
      thumbNailUrl: "https://images8.alphacoders.com/533/thumbbig-533007.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
    },
    {
      id: "126",
      title: "this is title",
      description: "this is description",
      userId: "1",
      commentable: true,
      thumbNailUrl: "https://images3.alphacoders.com/135/thumbbig-135625.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
    },
    {
      id: "127",
      title: "this is title",
      description: "this is description",
      userId: "1",
      commentable: true,
      thumbNailUrl: "https://images.alphacoders.com/605/thumbbig-605799.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
    },
    {
      id: "128",
      title: "this is title",
      description: "this is description",
      userId: "1",
      commentable: true,
      thumbNailUrl: "https://images6.alphacoders.com/606/thumbbig-606263.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
    },
    {
      id: "129",
      title: "this is title",
      description: "this is description",
      userId: "1",
      commentable: true,
      thumbNailUrl: "https://images3.alphacoders.com/167/thumbbig-16729.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
    },
    {
      id: "130",
      title: "this is title",
      description: "this is description",
      userId: "1",
      commentable: true,
      thumbNailUrl: "https://images5.alphacoders.com/613/thumbbig-613925.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
    },
    {
      id: "131",
      title: "this is title",
      description: "this is description",
      userId: "1",
      commentable: true,
      thumbNailUrl: "https://images2.alphacoders.com/742/thumbbig-742320.webp",
      size: 1000,
      createdAt: "09/12/2021",
      updatedAt: "09/12/2021",
    },
    {
      id: "132",
      title: "this is title",
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
        {data.map((video) => (
          <div key={video.id} className={styles["layout-item"]}>
            <img
              src={video.thumbNailUrl}
              alt="img"
              className={styles["layout-img"]}
            />
            <div className={styles["layout-content"]}>
              <h3 className={styles["layout-content_title"]}>{video.title}</h3>
              <h4 className={styles["layout-content_descript"]}>
                {video.description}
              </h4>
              <time className={styles["layout-content_time"]}>
                {video.createdAt}
              </time>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
