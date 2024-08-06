import {
  ToastContainer as ReactToastifyToastContainer,
  toast as reactToastifyToast,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toast = {
  success: (message) => reactToastifyToast.success(message),
  error: (message) => reactToastifyToast.error(message),
  promise: (promise, options) => reactToastifyToast.promise(promise, options),
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
