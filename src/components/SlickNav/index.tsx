// import Slider from "react-slick";
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

  const list = data.map((item, index) => {
    return (
      <div key={index} className={styles["slick-nav-item"]}>
        <GradientButton text={item} />
      </div>
    );
  });
  return <div className={styles["slick-nav"]}>{list}</div>;
};

export default SlickNav;
