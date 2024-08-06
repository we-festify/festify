import { useRef } from "react";
import styles from "./usePopup.module.css";
import { viewTransition } from "../../utils/view_transition";

const usePopup = (Component) => {
  const modalRef = useRef();

  const open = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const close = () => {
    viewTransition(() => {
      if (modalRef.current) {
        modalRef.current.close();
      }
    });
  };

  return [
    (props) => (
      <dialog ref={modalRef} className={styles.dialog}>
        <Component {...props} close={close} />
      </dialog>
    ),
    {
      open,
      close,
    },
  ];
};

export default usePopup;
