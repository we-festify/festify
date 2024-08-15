import {
  ToastContainer as ReactToastifyToastContainer,
  toast as reactToastifyToast,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toast = {
  success: (message) => reactToastifyToast.success(message),
  error: (message) => reactToastifyToast.error(message),
  warning: (message) => reactToastifyToast.warning(message),
  info: (message) => reactToastifyToast.info(message),
  promise: (promise, { loading, success, error }) => {
    return reactToastifyToast.promise(promise, {
      loading: loading || "Loading...",
      success: success || "Success!",
      error: error || "Error!",
    });
  },
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
