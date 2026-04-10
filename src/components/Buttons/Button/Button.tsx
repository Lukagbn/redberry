import React from "react";
import styles from "./Button.module.scss";

function Button({
  title,
  width,
  height,
  backgroundColor,
  color,
  borderColor,
  margin,
  fontSize,
  onClick,
}: {
  title: string;
  width: string;
  height: string;
  backgroundColor?: string;
  color?: string;
  borderColor?: string;
  margin?: string;
  fontSize?: string;
  onClick?: () => void;
}) {
  return (
    <button
      className={styles.button}
      style={{
        maxWidth: width,
        height: height,
        color: color,
        backgroundColor: backgroundColor,
        border: borderColor,
        marginTop: margin,
        fontSize: fontSize,
      }}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default Button;
