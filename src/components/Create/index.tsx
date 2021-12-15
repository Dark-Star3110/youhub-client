import styles from "./Create.module.scss";
import createImg from "../../assets/img/create.jpg";

const Create = () => {
  return (
    <div className={styles["create-page"]}>
      <h3>Create</h3>
      <div className={styles["create-content"]}>
        <div className={styles["create-img"]}>
          <img src={createImg} alt="" />
        </div>
        <h4>không có nội dung</h4>
        <button className={styles.btn}>Tải video lên</button>
      </div>
    </div>
  );
};

export default Create;
