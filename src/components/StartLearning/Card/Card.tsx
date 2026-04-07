"use client";
import React from "react";
import styles from "./Card.module.scss";
import Button from "@/components/Buttons/Button/Button";
import Star from "@/components/Star/Star";
import Image from "next/image";
import { text } from "stream/consumers";
import { useRouter } from "next/navigation";

export interface CardProps {
  id?: number;
  title: string;
  description: string;
  image: string;
  basePrice: number;
  avgRating: number;
  instructor: CardInstructor;
}

interface CardInstructor {
  name: string;
}

function Card({
  id,
  title,
  description,
  image,
  basePrice,
  avgRating,
  instructor,
}: CardProps) {
  const router = useRouter();
  function goTo() {
    router.push(`/courses/${id}`);
  }
  return (
    <div className={styles.card}>
      <Image width={466} height={262} src={image} alt={title} />
      <div className={styles.cardHeader}>
        <p>
          Lecturer <span>{instructor.name}</span>
        </p>
        <Star rate={avgRating} />
      </div>
      <div className={styles.cardBody}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className={styles.cardFooter}>
        <p className={styles.price}>
          Starting from
          <span>${basePrice}</span>
        </p>
        <Button
          title="Details"
          width="116px"
          height="58px"
          margin="0px"
          onClick={goTo}
        />
      </div>
    </div>
  );
}

export default Card;
