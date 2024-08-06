import styles from "./Skeleton.module.css";

const Skeleton = ({
  variant,
  width,
  height,
  borderRadius,
  animation = "pulse",
  flex,
  className,
  style,
  children,
  ...props
}) => {
  return (
    <div
      className={styles.skeleton + " " + styles[animation] + " " + className}
      style={{
        width: variant === "circle" ? Math.max(width, height) : width,
        height: variant === "circle" ? Math.max(width, height) : height,
        borderRadius: variant === "circle" ? "50%" : borderRadius,
        flex: flex,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Skeleton;
