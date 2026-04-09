"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";

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
    <section>
      <aside className={styles.aside}>
        <div className={styles.asideTitle}>
          <h2>Filters</h2>
          <span>Clear All Filters X</span>
        </div>
        <div className={styles.asideFilter}>
          <p>categories</p>
          <div className={styles.category}>
            <span>Development</span>
            <span>Design</span>
            <span>Business</span>
            <span>Data Science</span>
            <span>Marketing</span>
          </div>
        </div>
        <div className={styles.asideFilter}>
          <p>Topics</p>
          <div>
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
          <div>
            <span>Marilyn Mango</span>
            <span>Ryan Dorwart</span>
            <span>Roger Calzoni</span>
            <span>Zain Philips</span>
          </div>
        </div>
        <hr />
        <p>Filters Active</p>
      </aside>
    </section>
  );
}

export default page;
