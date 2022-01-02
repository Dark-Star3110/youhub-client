import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GradientButton from "../GradientButton";

import styles from "./SlickNav.module.scss";

const SlickNav = () => {
  const data = [
    "tat ca",
    "danh sach ket hop",
    "am nhac",
    "hoat hinh",
    "tro choi phieu luu",
    "bong da",
    "moi tai len gan day",
    "da xem",
    "de xuat moi",
  ];
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };
  return (
    <div className={styles["slick-nav"]}>
      <Slider {...settings}>
        {data.map((item, index) => {
          return (
            <div key={index} className={styles["slick-nav-item"]}>
              <GradientButton text={item} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default SlickNav;
