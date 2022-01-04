import styles from "./NotFound.module.scss";
import notFound_img from "../../assets/img/not_found.jpg";

const NotFound = () => {
  return (
    <div className={styles.notfound}>
      <img src={notFound_img} alt="" />
    </div>
  );
};

export default NotFound;
