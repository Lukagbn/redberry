"use client";
import React, { useState } from "react";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const next = () => {
    if (currentIndex >= CAROUSEL_CONTENT.length - 1) return;
    setCurrentIndex(currentIndex + 1);
  };
  const prev = () => {
    if (currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
  };
  return (
    <section className={`${styles.carousel} ${layout.container}`}>
      <div
        className={styles.carouselWrapper}
        key={CAROUSEL_CONTENT[currentIndex].header}
      >
        <div
          className={styles.carouselTop}
          style={currentIndex === 2 ? { height: "203px" } : {}}
        >
          <h2>{CAROUSEL_CONTENT[currentIndex].header}</h2>
          {currentIndex !== CAROUSEL_CONTENT.length - 1 ? (
            <p>{CAROUSEL_CONTENT[currentIndex].text}</p>
          ) : null}
          <Button
            title={CAROUSEL_CONTENT[currentIndex].button}
            width="206px"
            height="64px"
            margin={currentIndex === 2 ? "auto" : ""}
          />
        </div>
        <img
          src={CAROUSEL_CONTENT[currentIndex].img}
          alt={CAROUSEL_CONTENT[currentIndex].alt}
        />
        <CarouselDots index={currentIndex} length={CAROUSEL_CONTENT.length} />
        <div className={styles.btnWrapper}>
          <Left
            color={currentIndex === 0 ? "#C1BCBC" : "white"}
            onClick={prev}
          />
          <Right
            color={
              currentIndex === CAROUSEL_CONTENT.length - 1 ? "#C1BCBC" : "white"
            }
            onClick={next}
          />
        </div>
      </div>
    </section>
  );
}

export default Carousel;
