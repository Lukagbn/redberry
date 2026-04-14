import React from "react";
import styles from "./CarouselDots.module.scss";

interface DotsProps {
  index: number;
  length: number;
  setIndex: (newIndex: number) => void;
}

function CarouselDots({ index, length, setIndex }: DotsProps) {
  return (
    <div className={styles.dotContainer}>
      {Array.from({ length }).map((_, i) => (
        <div
          key={i}
          onClick={() => setIndex(i)}
          className={
            i === index ? `${styles.dot} ${styles.dotActive}` : `${styles.dot}`
          }
        ></div>
      ))}
    </div>
  );
}

export default CarouselDots;
