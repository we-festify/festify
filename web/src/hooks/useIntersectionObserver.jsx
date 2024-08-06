import { useEffect, useState } from "react";

const useIntersectionObserver = (
  containerRef,
  options = {
    once: false,
  }
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (options.once) {
            observer.disconnect();
          }
        } else {
          setIsIntersecting(false);
        }
      });
    });

    if (containerRef?.current) observer.observe(containerRef?.current);
    else {
      setIsIntersecting(true);
      observer.disconnect();
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return { isIntersecting };
};

export default useIntersectionObserver;
