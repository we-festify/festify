import { flushSync } from "react-dom";

export const viewTransition = (changeDOMCallback) => {
  if (!document.startViewTransition) {
    changeDOMCallback();
    return;
  }
  document.startViewTransition(() => {
    flushSync(() => {
      changeDOMCallback();
    });
  });
};
