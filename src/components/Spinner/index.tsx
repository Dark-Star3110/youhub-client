import styles from "./Spinner.module.scss";
import clsx from "clsx";

const Spinner = () => {
  return (
    <div className={styles["sk-fading-circle"]}>
      <div className={clsx(styles["sk-circle1"], styles["sk-circle"])}></div>
      <div className={clsx(styles["sk-circle2"], styles["sk-circle"])}></div>
      <div className={clsx(styles["sk-circle3"], styles["sk-circle"])}></div>
      <div className={clsx(styles["sk-circle4"], styles["sk-circle"])}></div>
      <div className={clsx(styles["sk-circle5"], styles["sk-circle"])}></div>
      <div className={clsx(styles["sk-circle6"], styles["sk-circle"])}></div>
      <div className={clsx(styles["sk-circle7"], styles["sk-circle"])}></div>
      <div className={clsx(styles["sk-circle8"], styles["sk-circle"])}></div>
      <div className={clsx(styles["sk-circle9"], styles["sk-circle"])}></div>
      <div className={clsx(styles["sk-circle10"], styles["sk-circle"])}></div>
      <div className={clsx(styles["sk-circle11"], styles["sk-circle"])}></div>
      <div className={clsx(styles["sk-circle12"], styles["sk-circle"])}></div>
    </div>
  );
};

export default Spinner;
