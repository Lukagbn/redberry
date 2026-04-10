"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import layout from "@/app/layout.module.scss";

function page() {
  const [cards, setCards] = useState(null);
  async function fetchCards() {
    try {
      const res = await fetch(
        "https://api.redclass.redberryinternship.ge/api/courses?sort=newest&page=1",
      );
      const result = await res.json();
      console.log("API Result:", result);
      setCards(result);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchCards();
  }, []);
  return (
    <section className={`${styles.section} ${layout.container}`}>
      <aside className={styles.aside}>
        <div className={styles.asideTitle}>
          <h2>Filters</h2>
          <span>Clear All Filters X</span>
        </div>
        <div className={styles.asideFilter}>
          <p>categories</p>
          <div className={styles.category}>
            <span>
              <img src={"/icons/development.svg"} alt="development" />
              Development
            </span>
            <span>
              <img src={"/icons/design.svg"} alt="design" />
              Design
            </span>
            <span>
              <img src={"/icons/business.svg"} alt="business" />
              Business
            </span>
            <span>
              <img src={"/icons/data.svg"} alt="data" />
              Data Science
            </span>
            <span>
              <img src={"/icons/marketing.svg"} alt="marketing" />
              Marketing
            </span>
          </div>
        </div>
        <div className={styles.asideFilter}>
          <p>Topics</p>
          <div className={styles.topics}>
            <span>React</span>
            <span>Typescript</span>
            <span>Phyton</span>
            <span>UX/UI</span>
            <span>Figma</span>
            <span>JavaScript</span>
            <span>Node.js</span>
            <span>Machine Learning</span>
            <span>Seo</span>
            <span>Analytics</span>
          </div>
        </div>
        <div className={styles.asideFilter}>
          <p>Instructor</p>
          <div className={styles.instructor}>
            <span>
              <img src={"/marilyn.webp"} />
              Marilyn Mango
            </span>
            <span>
              <img src={"/ryan.webp"} />
              Ryan Dorwart
            </span>
            <span>
              <img src={"/roger.webp"} />
              Roger Calzoni
            </span>
            <span>
              <img src={"/zain.webp"} />
              Zain Philips
            </span>
          </div>
        </div>
        <hr />
        <p className={styles.filetersActive}>0 Filters Active</p>
      </aside>
    </section>
  );
}

export default page;
