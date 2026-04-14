"use client";
import React, { useEffect, useState } from "react";
import Left from "../Buttons/ArrowButtons/Left/Left";
import Right from "../Buttons/ArrowButtons/Right/Right";
import styles from "./Carousel.module.scss";
import Button from "../Buttons/Button/Button";
import layout from "@/app/layout.module.scss";
import CarouselDots from "./CarouselDots/CarouselDots";

const CAROUSEL_CONTENT = [
  {
    header: "Start learning something new today",
    text: "Explore a wide range of expert-led courses in design, development, business, and more. Find the skills you need to grow your career and learn at your own pace.",
    img: "/carousel1.webp",
    alt: "carousel img",
    button: "Browse Courses",
  },
  {
    header: "Pick up where you left off",
    text: "Your learning journey is already in progress. Continue your enrolled courses, track your progress, and stay on track toward completing your goals.",
    img: "/carousel2.webp",
    alt: "carousel img",
    button: "Start Learning",
  },
  {
    header: "Learn together, grow faster",
    text: "",
    img: "/carousel3.webp",
    alt: "carousel img",
    button: "Learn More",
  },
];

function Carousel() {
  const [index, setIndex] = useState<number | 0>(0);
  const next = () => {
    if (index >= CAROUSEL_CONTENT.length - 1) return;
    setIndex(index + 1);
  };
  const prev = () => {
    if (index === 0) return;
    setIndex(index - 1);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex === CAROUSEL_CONTENT.length - 1 ? 0 : prevIndex + 1,
      );
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const currentItem = CAROUSEL_CONTENT[index];

  return (
    <section
      style={{
        backgroundImage: `url(${currentItem.img})`,
        height: "420px",
      }}
      className={`${styles.carousel} ${layout.container}`}
    >
      <div
        className={styles.textWrapper}
        style={index === 2 ? { height: "203px" } : { height: "232px" }}
      >
        <h2 className={styles.carouseHeader}>{currentItem.header}</h2>
        <p className={styles.carouselText}>{currentItem.text}</p>
        <Button
          margin={index === 2 ? "auto" : "38px"}
          title={currentItem.button}
          width="206px"
          height="64px"
        />
      </div>
      <CarouselDots
        index={index}
        length={CAROUSEL_CONTENT.length}
        setIndex={setIndex}
      />
      <div className={styles.btnWrapper}>
        <Left color={index === 0 ? "#C1BCBC" : "white"} onClick={prev} />
        <Right
          color={index === CAROUSEL_CONTENT.length - 1 ? "#C1BCBC" : "white"}
          onClick={next}
        />
      </div>
    </section>
  );
}

export default Carousel;
