"use client";
import React, { useEffect, useState } from "react";
import Card from "./Card/Card";
import { EnrolledCourse, EnrolledCourseApi } from "../SessionType/SessionType";
import layout from "@/app/layout.module.scss";
import styles from "./ContinueLearning.module.scss";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { openModal } from "@/lib/slices/modalSlice";

const DEFAULT_COURSES: EnrolledCourse[] = Array(3).fill({
  id: 1,
  totalPrice: "299.00",
  progress: 65,
  completedAt: null,
  course: {
    id: 1,
    title: "Advanced React & TypeScript Development",
    description: "",
    image: "/courseImg.webp",
    basePrice: "299.00",
    durationWeeks: 8,
    isFeatured: true,
    avgRating: 4.9,
    category: { id: 1, name: "Development" },
    topic: { id: 2, name: "React" },
    instructor: { id: 1, name: "Marilyn Mango", avatar: "" },
  },
  schedule: {
    weeklySchedule: { id: 1, label: "Monday - Wednesday" },
    timeSlot: { id: 1, label: "Morning (9:00 AM - 11:00 AM)" },
    sessionType: { id: 1, name: "online", priceModifier: "0.00" },
    location: null,
  },
});

function ContinueLearning() {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user);
  const [cards, setCards] = useState<EnrolledCourse[] | null>(null);
  const displayCards = userData ? cards : DEFAULT_COURSES;
  async function fetchEnrolled() {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch(
        "https://api.redclass.redberryinternship.ge/api/enrollments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const result: EnrolledCourseApi = await res.json();
      const slicedResult = result.data.slice(0, 4);
      setCards(slicedResult);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchEnrolled();
  }, []);
  if (cards?.length === 0) return;
  return (
    <div className={`${styles.continiue} ${layout.container}`}>
      <h2>Continue Learning</h2>
      <div className={styles.pickWhereLeft}>
        <p>Pick up where you left</p>
        <span
          onClick={() => {
            if (userData) {
              dispatch(openModal("enrolled"));
            } else {
              dispatch(openModal("login"));
            }
          }}
        >
          see all
        </span>
      </div>
      <Card cards={displayCards} isLoggedIn={!!userData} />
    </div>
  );
}

export default ContinueLearning;
