import { useState } from "react";
import styles from "./AvatarInput.module.css";
import {
  faces,
  faceColors,
  clothColors,
  clothes,
  encodeAvatarCode,
  backgroundColors,
} from "../../../components/Avatar/Avatar";
import Button from "../../Button";
import Modal from "../../../components/Modal/Modal";

const AvatarInputModalContent = ({ onChange, close }) => {
  const [page, setPage] = useState(0);
  const [faceIndex, setFaceIndex] = useState(0);
  const [clothIndex, setClothIndex] = useState(0);
  const [faceColorIndex, setFaceColorIndex] = useState(0);
  const [clothColorIndex, setClothColorIndex] = useState(0);
  const [backgroundColorIndex, setBackgroundColorIndex] = useState(0);

  const navigateToNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const navigateToPrevPage = () => {
    setPage((prev) => prev - 1);
  };

  const handleSave = () => {
    const avatarCode = encodeAvatarCode({
      faceIndex,
      clothIndex,
      faceColorIndex,
      clothColorIndex,
      backgroundColorIndex,
    });
    onChange({ avatarCode });
    close();
  };

  return (
    <Modal title="Change Avatar" close={close}>
      <div className={styles.body}>
        {page === 0 && (
          <>
            <h3 className={styles.subtitle}>Select your skin tone</h3>
            <div className={styles.colors}>
              {faceColors.map((color, index) => (
                <div
                  key={index}
                  className={
                    styles.color +
                    " " +
                    (index === faceColorIndex && styles.selected)
                  }
                  style={{ backgroundColor: color }}
                  onClick={() => setFaceColorIndex(index)}
                />
              ))}
            </div>
            <div className={styles.actions}>
              <Button variant="secondary" onClick={navigateToNextPage}>
                Next
              </Button>
            </div>
          </>
        )}
        {page === 1 && (
          <>
            <h3 className={styles.subtitle}>Select your face</h3>
            <div className={styles.faces}>
              {faces.map((Face, index) => (
                <div
                  key={index}
                  className={
                    styles.face + " " + (index === faceIndex && styles.selected)
                  }
                  style={{
                    "--face-fill": faceColors[faceColorIndex] || faceColors[0],
                  }}
                  onClick={() => setFaceIndex(index)}
                >
                  <Face />
                </div>
              ))}
            </div>
            <div className={styles.actions}>
              <Button variant="outline-secondary" onClick={navigateToPrevPage}>
                Previous
              </Button>
              <Button variant="secondary" onClick={navigateToNextPage}>
                Next
              </Button>
            </div>
          </>
        )}
        {page === 2 && (
          <>
            <h3 className={styles.subtitle}>Select your body color</h3>
            <div className={styles.colors}>
              {clothColors.map((color, index) => (
                <div
                  key={index}
                  className={
                    styles.color +
                    " " +
                    (index === clothColorIndex && styles.selected)
                  }
                  style={{ backgroundColor: color }}
                  onClick={() => setClothColorIndex(index)}
                />
              ))}
            </div>
            <div className={styles.actions}>
              <Button variant="outline-secondary" onClick={navigateToPrevPage}>
                Previous
              </Button>
              <Button variant="secondary" onClick={navigateToNextPage}>
                Next
              </Button>
            </div>
          </>
        )}
        {page === 3 && (
          <>
            <h3 className={styles.subtitle}>Select your body</h3>
            <div className={styles.clothes}>
              {clothes.map((Cloth, index) => (
                <div
                  key={index}
                  className={
                    styles.cloth +
                    " " +
                    (index === clothIndex && styles.selected)
                  }
                  style={{
                    "--cloth-fill":
                      clothColors[clothColorIndex] || clothColors[0],
                  }}
                  onClick={() => setClothIndex(index)}
                >
                  <Cloth />
                </div>
              ))}
            </div>
            <div className={styles.actions}>
              <Button variant="outline-secondary" onClick={navigateToPrevPage}>
                Previous
              </Button>
              <Button variant="secondary" onClick={navigateToNextPage}>
                Next
              </Button>
            </div>
          </>
        )}
        {page === 4 && (
          <>
            <h3 className={styles.subtitle}>Select your background color</h3>
            <div className={styles.colors}>
              {backgroundColors.map((color, index) => (
                <div
                  key={index}
                  className={
                    styles.color +
                    " " +
                    (index === backgroundColorIndex && styles.selected)
                  }
                  style={{ backgroundColor: color }}
                  onClick={() => setBackgroundColorIndex(index)}
                />
              ))}
            </div>
            <div className={styles.actions}>
              <Button variant="outline-secondary" onClick={navigateToPrevPage}>
                Previous
              </Button>
              <Button variant="secondary" onClick={handleSave}>
                Save
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default AvatarInputModalContent;
