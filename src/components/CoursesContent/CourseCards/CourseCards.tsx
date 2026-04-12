import React from "react";
import styles from "./CourseCards.module.scss";
import { Course } from "../CoursesContent";
import Star from "../../Star/Star";
import Button from "../../Buttons/Button/Button";
import { useRouter } from "next/navigation";

const CATEGORY_ICONS: Record<string, string>[] = [
  { img: "/icons/development.svg", icon: "development" },
  { img: "/icons/design.svg", icon: "design" },
  { img: "/icons/business.svg", icon: "business" },
  { img: "/icons/data.svg", icon: "data-science" },
  { img: "/icons/marketing.svg", icon: "marketing" },
];

function CourseCards({ card }: { card: Course[] | null }) {
  const router = useRouter();
  return (
    <div className={styles.cardsWrapper}>
      {card?.map((card) => {
        const icon = CATEGORY_ICONS.find(
          (icon) => icon.icon === card.category.icon,
        );
        return (
          <div
            className={styles.card}
            key={card.id}
            onClick={() => router.push(`/courses/${card.id}`)}
          >
            <img src={card.image} alt={card.title} />
            <div className={styles.cardBody}>
              <div className={styles.duration}>
                <span>
                  {card.instructor.name} | {card.durationWeeks} Weeks
                </span>
                <Star rate={card.avgRating} />
              </div>
              <h3>{card.title}</h3>
              <p className={styles.category}>
                <img src={icon?.img} alt="icon" />
                {card.category.name}
              </p>
              <div className={styles.priceContainer}>
                <div className={styles.price}>
                  <p>Starting from</p>
                  <span>${card.basePrice}</span>
                </div>
                <Button
                  onClick={() => router.push(`/courses/${card.id}`)}
                  title="Details"
                  width="103px"
                  height="43px"
                  margin="0px"
                  fontSize="16px"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CourseCards;
