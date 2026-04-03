"use client";
import React, { useEffect, useState } from "react";
import layout from "@/app/layout.module.scss";
import styles from "./StartLearning.module.scss";
import Card, { CardProps } from "./Card/Card";

interface CardsApiResponse {
  data: CardProps[];
}

function StartLearning() {
  const [cards, setCards] = useState<CardProps[] | null>(null);
  async function fetchCards() {
    try {
      const res = await fetch(
        "https://api.redclass.redberryinternship.ge/api/courses/featured",
      );
      const result: CardsApiResponse = await res.json();
      setCards(result.data);
    } catch (error) {}
  }
  useEffect(() => {
    fetchCards();
  }, []);
  if (!cards) return <div>Loading...</div>;
  return (
    <section className={`${styles.startLearning} ${layout.container}`}>
      <h2>Start Learning Today</h2>
      <p>Choose from our most popular courses and begin your journey</p>
      <div className={styles.cardContainer}>
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            description={card.description}
            image={card.image}
            basePrice={Number(Number(card.basePrice).toFixed(0))}
            avgRating={card.avgRating}
            instructor={card.instructor}
          />
        ))}
      </div>
    </section>
  );
}

export default StartLearning;
