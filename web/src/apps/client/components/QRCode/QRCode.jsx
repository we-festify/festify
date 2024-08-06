import { useEffect, useRef } from "react";
import styles from "./QRCode.module.css";
import QRCodeStyling from "qr-code-styling";
import logo from "./../../../../assets/images/core/logo.png";

const QRCode = ({ data, height, width }) => {
  const containerRef = useRef(null);
  const qrCode = new QRCodeStyling({
    width: width || 250,
    height: height || 250,
    data: data,
    margin: 0,
    image: logo,
    qrOptions: {
      typeNumber: "0",
      mode: "Byte",
      errorCorrectionLevel: "Q",
    },
    imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 0 },
    dotsOptions: {
      type: "dots",
      gradient: {
        type: "linear",
        rotation: 0,
        colorStops: [
          { offset: 0, color: "#5f19eb" },
          { offset: 1, color: "#d0358c" },
        ],
      },
    },
    backgroundOptions: { color: "transparent" },
    cornersSquareOptions: {
      type: "extra-rounded",
      gradient: {
        type: "linear",
        rotation: 0,
        colorStops: [
          { offset: 0, color: "#d0358c" },
          { offset: 1, color: "#5f19eb" },
        ],
      },
    },
    cornersDotOptions: {
      type: "none",
      gradient: {
        type: "linear",
        rotation: 0,
        colorStops: [
          { offset: 0, color: "#5f19eb" },
          { offset: 1, color: "#d0358c" },
        ],
      },
    },
  });

  useEffect(() => {
    if (containerRef.current) {
      qrCode.append(containerRef.current);
    }
    return () => {
      if (containerRef?.current) containerRef.current.innerHTML = "";
    };
  }, []);

  useEffect(() => {
    qrCode.update({
      data: data,
    });
  }, [data]);

  return <div ref={containerRef} className={styles.container}></div>;
};

export default QRCode;
