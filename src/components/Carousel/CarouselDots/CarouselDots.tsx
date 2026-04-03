import React from "react";
import styles from "./CarouselDots.module.scss";

function CarouselDots({ index, length }: { index: number; length: number }) {
  return (
    <div className={styles.dotContainer}>
      {Array.from({ length }).map((_, i) => (
        <div
          className={
            i === index ? `${styles.dot} ${styles.dotActive}` : `${styles.dot}`
          }
          key={i}
        ></div>
      ))}
    </div>
  );
}

export default CarouselDots;
