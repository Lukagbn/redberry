import React from "react";
import styles from "./Button.module.scss";

function Button({
  title,
  width,
  height,
  margin,
}: {
  title: string;
  width: string;
  height: string;
  margin?: string;
}) {
  return (
    <div
      className={styles.button}
      style={{ maxWidth: width, height: height, marginTop: margin }}
    >
      {title}
    </div>
  );
}

export default Button;
