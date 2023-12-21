import React from "react";
import {
  ToastContainer as ReactToastifyToastContainer,
  toast as reactToastifyToast,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toast = {
  success: (message) =>
    reactToastifyToast.success(message, {
      theme: "dark",
    }),
  error: (message) =>
    reactToastifyToast.error(message, {
      theme: "dark",
    }),
};

const ToastProvider = ({ children }) => {
  return (
    <>
      {children}
      <ReactToastifyToastContainer />
    </>
  );
};

export default ToastProvider;
