import { useEffect, useRef, useState } from "react";
import styles from "./Image.module.css";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { Blurhash } from "react-blurhash";

const Image = ({
  src,
  lazy = true,
  blurHash,
  className,
  animate = true,
  ...props
}) => {
  const containerRef = useRef();
  // for lazy loading images
  const { isIntersecting: hasIntersected } = useIntersectionObserver(
    containerRef,
    {
      once: true,
    }
  );
  // for placeholder
  const [hasImageLoaded, setHasImageLoaded] = useState(false);
  const [hasImageErrored, setHasImageErrored] = useState(false);

  useEffect(() => {
    if (hasIntersected) {
      if (!blurHash) {
        setHasImageLoaded(true);
      }
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        setHasImageLoaded(true);
      };
      img.onerror = () => {
        setHasImageErrored(true);
      };
    }
  }, [hasIntersected, src]);

  if (hasImageErrored) {
    return <div className={styles.error}>Error loading image.</div>;
  }

  return (
    <>
      {lazy ? (
        hasIntersected ? (
          hasImageLoaded || !blurHash ? (
            <img
              src={src}
              {...props}
              className={`${className} ${styles[animate ? "animate" : ""]}`}
            />
          ) : (
            <Blurhash
              hash={blurHash}
              style={{ height: "100%", width: "100%" }}
              punch={1}
              className={styles[animate ? "animate-blur" : ""]}
            />
          )
        ) : (
          <div ref={containerRef} className={styles.container} />
        )
      ) : (
        <img src={src} {...props} />
      )}
    </>
  );
};

export default Image;
