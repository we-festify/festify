import styles from "./Modal.module.css";

const Modal = ({ title, children, close }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {close && (
          <button className={styles.close} onClick={close}>
            &times;
          </button>
        )}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Modal;
