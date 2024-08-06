import { useEffect, useState } from "react";
import styles from "./ImagePreview.module.css";
import { Blurhash } from "react-blurhash";
import { encode } from "blurhash";

const ImagePreview = ({ src, blurHash = true, onHashChange }) => {
  const [hash, setHash] = useState(null);
  const [error, setError] = useState(null);

  const loadImage = (src) =>
    new Promise((resolve) => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = src;
      image.onload = () => resolve(image);
      image.onerror = (err) => setError(err);
    });

  const getImageData = async (src) => {
    const image = await loadImage(src);
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext("2d");
    const aspectRatio = image.width / image.height;
    context.drawImage(image, 0, 0, 100, Math.floor(100 / aspectRatio));
    return context.getImageData(0, 0, 100, Math.floor(100 / aspectRatio));
  };

  const encodeImage = async (src) => {
    const imageData = await getImageData(src);
    const aspectRatio = imageData.width / imageData.height;
    const hash = encode(
      imageData.data,
      100,
      Math.floor(100 / aspectRatio),
      9,
      9
    );
    return hash;
  };

  const encodeImagePromise = async (src) => {
    const hash = await encodeImage(src);
    return hash;
  };

  useEffect(() => {
    if (src) {
      console.log("hashing");
      try {
        encodeImagePromise(src).then((h) => {
          setHash(h);
          if (typeof onHashChange === "function") onHashChange(h);
          console.log("hashed");
        });
      } catch (err) {
        setError(err);
      }
    }
  }, [src]);

  if (!src) return null;

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        {src && <img src={src} alt="preview" />}
      </div>
      {blurHash && hash && (
        <Blurhash
          hash={hash}
          style={{
            height: "100%",
            width: "100px",
            borderRadius: "0.5rem",
            overflow: "hidden",
          }}
          punch={1}
          className={styles.blur}
        />
      )}
      {error && (
        <div className={styles.error}>
          {error?.message || "Something went wrong while blurring image..."}
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
