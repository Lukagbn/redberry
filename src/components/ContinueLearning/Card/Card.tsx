import { EnrolledCourse } from "@/components/SessionType/SessionType";
import React from "react";
import styles from "./Card.module.scss";
import Star from "@/components/Star/Star";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { openModal } from "@/lib/slices/modalSlice";
import Lock from "@/components/Icons/Lock";

function Card({
  cards,
  isLoggedIn,
}: {
  cards: EnrolledCourse[] | null;
  isLoggedIn: boolean;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return (
    <div className={styles.cardWrapper}>
      {cards?.map((card, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.cardInner}>
            <img src={card.course.image} alt="course" />
            <div className={styles.textWrapper}>
              <div className={styles.rating}>
                <p>
                  Lecturer<span>{card.course.instructor.name}</span>
                </p>
                <Star rate={card.course.avgRating} />
              </div>
              <h3>{card.course.title}</h3>
            </div>
          </div>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBarWrapper}>
              <p>{card?.progress}% complete</p>
              <div className={styles.progressBar}>
                <span style={{ width: `${card?.progress}%` }}></span>
              </div>
            </div>
            <button onClick={() => router.push(`/courses/${card.course.id}`)}>
              view
            </button>
          </div>
        </div>
      ))}
      {!isLoggedIn && (
        <div className={styles.overlay}>
          <div className={styles.signIn}>
            <div className={styles.lockBg}>
              <Lock />
            </div>
            <p>Sign in to track your learning progress</p>
            <button onClick={() => dispatch(openModal("login"))}>Log in</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
