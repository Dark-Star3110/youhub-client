import { Link } from "react-router-dom";
import Slider from "react-slick";
import user_img from "../../assets/img/user.png";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import styles from "./Subscriptions.module.scss";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LOGGED_ID = "1";

const Subscriptions = () => {
  useCheckAuth();
  const settings = {
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 2,
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
  const sub_list = [
    {
      firstName: "user1",
      lastName: "mr",
      image_url: user_img,
      videos: [
        {
          id: "17ZXlVzLb0toTe3dtO8q80DmVlnQz9R99",
          title: "Tokyo Ghoul",
          description: "this is description",
          userId: "1",
          commentable: true,
          thumbnailUrl:
            "https://images8.alphacoders.com/546/thumbbig-546902.webp",
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
          thumbnailUrl:
            "https://images2.alphacoders.com/119/thumbbig-1192178.webp",
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
          thumbnailUrl:
            "https://images8.alphacoders.com/533/thumbbig-533007.webp",
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
          thumbnailUrl:
            "https://images3.alphacoders.com/135/thumbbig-135625.webp",
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
          thumbnailUrl:
            "https://images.alphacoders.com/605/thumbbig-605799.webp",
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
          thumbnailUrl:
            "https://images6.alphacoders.com/606/thumbbig-606263.webp",
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
          thumbnailUrl:
            "https://images3.alphacoders.com/167/thumbbig-16729.webp",
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
          thumbnailUrl:
            "https://images5.alphacoders.com/613/thumbbig-613925.webp",
          size: 1000,
          createdAt: "09/12/2021",
          updatedAt: "09/12/2021",
          user: {
            firstName: "user",
            lastName: "mr",
            image_url: user_img,
          },
        },
      ],
    },
    {
      firstName: "user2",
      lastName: "mr",
      image_url: user_img,
      videos: [
        {
          id: "17ZXlVzLb0toTe3dtO8q80DmVlnQz9R99",
          title: "Tokyo Ghoul",
          description: "this is description",
          userId: "1",
          commentable: true,
          thumbnailUrl:
            "https://images8.alphacoders.com/546/thumbbig-546902.webp",
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
          thumbnailUrl:
            "https://images2.alphacoders.com/119/thumbbig-1192178.webp",
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
          thumbnailUrl:
            "https://images8.alphacoders.com/533/thumbbig-533007.webp",
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
          thumbnailUrl:
            "https://images3.alphacoders.com/135/thumbbig-135625.webp",
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
          thumbnailUrl:
            "https://images.alphacoders.com/605/thumbbig-605799.webp",
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
          thumbnailUrl:
            "https://images6.alphacoders.com/606/thumbbig-606263.webp",
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
          thumbnailUrl:
            "https://images3.alphacoders.com/167/thumbbig-16729.webp",
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
          thumbnailUrl:
            "https://images5.alphacoders.com/613/thumbbig-613925.webp",
          size: 1000,
          createdAt: "09/12/2021",
          updatedAt: "09/12/2021",
          user: {
            firstName: "user",
            lastName: "mr",
            image_url: user_img,
          },
        },
      ],
    },
  ];
  return (
    <div className={styles["subcritions"]}>
      {sub_list.map((channel, index) => {
        return (
          <div key={index} className={styles["channel"]}>
            <div className={styles["channel__detail"]}>
              <img src={channel.image_url} alt="img" />
              <h2>{channel.lastName + " " + channel.firstName}</h2>
            </div>
            <div className={styles["layout"]}>
              <Slider {...settings}>
                {channel.videos.map((video, index) => {
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
                            <h4 className={styles["layout-content_descript"]}>
                              {video.description}
                            </h4>

                            <time className={styles["layout-content_time"]}>
                              {video.createdAt}
                            </time>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </Slider>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Subscriptions;
