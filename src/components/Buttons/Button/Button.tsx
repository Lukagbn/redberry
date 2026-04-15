import React, { useState } from "react";
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
  hoverBackground,
  hoverColor,
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
  hoverBackground?: string;
  hoverColor?: string;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState<boolean | false>(false);
  return (
    <button
      className={styles.button}
      style={{
        maxWidth: width,
        height: height,
        color: hovered ? hoverColor : color,
        backgroundColor: hovered ? hoverBackground : backgroundColor,
        border: hovered ? "none" : borderColor,
        marginTop: margin,
        fontSize: fontSize,
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {title}
    </button>
  );
}

export default Button;
