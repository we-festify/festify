import React, { useEffect, useRef } from "react";
import styles from "./useModal.module.css";
import { viewTransition } from "../../utils/view_transition";

const useModal = (Component, props = {}) => {
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

  // useEffect(() => {
  //   const handleOutsideClick = (e) => {
  //     if (e.target === modalRef.current) {
  //       close();
  //     }
  //   };
  //   if (modalRef.current) {
  //     modalRef.current.addEventListener("click", handleOutsideClick);
  //   }
  //   return () => {
  //     if (modalRef.current) {
  //       modalRef.current.removeEventListener("click", handleOutsideClick);
  //     }
  //   };
  // }, []);

  return [
    () => (
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

export default useModal;
