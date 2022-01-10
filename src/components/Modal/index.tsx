import React from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
  title: string;
  children?: React.ReactNode;
  handleText: string;
  failureHandler: (...args: any) => any;
  successHandler: (...args: any) => any;
}

const Modal = (props: ModalProps) => {
  return (
    <div className={styles.modal} onClick={props.failureHandler}>
      <div
        className={styles["modal-container"]}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles["modal-content"]}>
          <div>
            <header>{props.title}</header>
          </div>
          {props.children && (
            <div className={styles["modal-content__child"]}>
              <div>{props.children}</div>
            </div>
          )}
        </div>
        <div className={styles["modal-action"]}>
          <span onClick={props.failureHandler}>Hủy</span>
          <span className={styles["text-type"]} onClick={props.successHandler}>
            {props.handleText}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Modal;
