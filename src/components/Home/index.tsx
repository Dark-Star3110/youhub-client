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
      thumbNailUrl:
        "https://cdna.artstation.com/p/assets/images/images/043/281/710/large/yuumei-wenqing-yan-kiki-s-plant-delivery-2-post.jpg?1636826023",
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
      thumbNailUrl:
        "https://cdna.artstation.com/p/assets/images/images/043/281/710/large/yuumei-wenqing-yan-kiki-s-plant-delivery-2-post.jpg?1636826023",
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
      thumbNailUrl:
        "https://cdna.artstation.com/p/assets/images/images/043/281/710/large/yuumei-wenqing-yan-kiki-s-plant-delivery-2-post.jpg?1636826023",
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
      thumbNailUrl:
        "https://cdna.artstation.com/p/assets/images/images/043/281/710/large/yuumei-wenqing-yan-kiki-s-plant-delivery-2-post.jpg?1636826023",
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
      thumbNailUrl:
        "https://cdna.artstation.com/p/assets/images/images/043/281/710/large/yuumei-wenqing-yan-kiki-s-plant-delivery-2-post.jpg?1636826023",
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
      thumbNailUrl:
        "https://cdna.artstation.com/p/assets/images/images/043/281/710/large/yuumei-wenqing-yan-kiki-s-plant-delivery-2-post.jpg?1636826023",
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
      thumbNailUrl:
        "https://cdna.artstation.com/p/assets/images/images/043/281/710/large/yuumei-wenqing-yan-kiki-s-plant-delivery-2-post.jpg?1636826023",
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
      thumbNailUrl:
        "https://cdna.artstation.com/p/assets/images/images/043/281/710/large/yuumei-wenqing-yan-kiki-s-plant-delivery-2-post.jpg?1636826023",
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
      thumbNailUrl:
        "https://cdna.artstation.com/p/assets/images/images/043/281/710/large/yuumei-wenqing-yan-kiki-s-plant-delivery-2-post.jpg?1636826023",
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
      thumbNailUrl:
        "https://cdna.artstation.com/p/assets/images/images/043/281/710/large/yuumei-wenqing-yan-kiki-s-plant-delivery-2-post.jpg?1636826023",
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
