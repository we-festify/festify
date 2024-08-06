import { createContext, useContext, useEffect, useRef, useState } from "react";
import styles from "./Grid.module.css";

const gridContext = createContext();

const useGrid = () => useContext(gridContext);

const Grid = ({ children, columns }) => {
  const gridRef = useRef(null);
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = containerRef.current.clientWidth;
      setWidth(containerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const value = {
    columns,
    width,
  };

  return (
    <gridContext.Provider value={value}>
      <div ref={containerRef} className={styles.container}>
        <div
          ref={gridRef}
          className={styles.grid}
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          }}
        >
          {children}
        </div>
      </div>
    </gridContext.Provider>
  );
};

export const GridItem = ({ children, sm, md, lg }) => {
  // sm - < 600px
  // md - < 900px
  // lg - > 800px
  const { width, columns: maxColumns } = useGrid();
  const itemRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const columns =
        width < 600
          ? sm || md || lg || maxColumns
          : width < 900
          ? md || lg || sm || maxColumns
          : lg || md || sm || maxColumns;
      itemRef.current.style.gridColumnEnd = `span ${columns}`;
    };
    handleResize();
  }, [width, sm, md, lg, maxColumns]);

  return (
    <div
      ref={itemRef}
      className={styles.item}
      style={{
        gridColumnEnd: `span ${lg}`,
      }}
    >
      {children}
    </div>
  );
};

export default Grid;
