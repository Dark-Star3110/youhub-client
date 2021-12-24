import styles from "./Loading.module.scss";
const Loading = () => {
  return (
    <div className={styles.loading}>
      <h2>Vui lòng chờ khi chúng tôi xử lí video của bạn</h2>
      <div className={styles.loader}>
        <div className={styles.rocket}>
          <i className={`fas fa-rocket ${styles["rocket-icon"]}`}></i>
          <i
            className={`fas fa-cloud ${styles["cloud-icon"]}`}
            style={{ "--i": 0 } as React.CSSProperties}
          ></i>
          <i
            className={`fas fa-cloud ${styles["cloud-icon"]}`}
            style={{ "--i": 1 } as React.CSSProperties}
          ></i>
          <i
            className={`fas fa-cloud ${styles["cloud-icon"]}`}
            style={{ "--i": 2 } as React.CSSProperties}
          ></i>
          <i
            className={`fas fa-cloud ${styles["cloud-icon"]}`}
            style={{ "--i": 3 } as React.CSSProperties}
          ></i>
        </div>
        <span>
          <i></i>
        </span>
      </div>
    </div>
  );
};

export default Loading;
