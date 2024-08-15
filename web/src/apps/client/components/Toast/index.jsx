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
  warning: (message) =>
    reactToastifyToast.warning(message, {
      theme: "dark",
    }),
  info: (message) =>
    reactToastifyToast.info(message, {
      theme: "dark",
    }),
  promise: (promise, { loading, success, error }) =>
    reactToastifyToast.promise(
      promise,
      {
        loading,
        success,
        error,
      },
      {
        theme: "dark",
      }
    ),
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
