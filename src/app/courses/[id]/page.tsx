"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import layout from "@/app/layout.module.scss";
import styles from "./page.module.scss";
import Star from "@/components/Star/Star";
import SessionType from "@/components/SessionType/SessionType";
import CourseIcons from "@/components/Icons/CourseIcons";

interface CourseApiResponse {
  data: CourseProps;
}
interface CourseProps {
  id: 1;
  title: string;
  description: string;
  image: string;
  basePrice: string;
  durationWeeks: number;
  isFeatured: boolean;
  reviews: {
    userId: number;
    rating: number;
  }[];
  isRated: boolean;
  category: {
    id: number;
    name: string;
  };
  topic: {
    id: number;
    name: string;
  };
  instructor: {
    id: number;
    name: string;
    avatar: string;
  };
  enrollment: boolean | null;
}

function page() {
  const { id } = useParams();
  const [course, setCourse] = useState<CourseProps | null>(null);
  const icon = course?.category.name;
  async function fetchCourse() {
    try {
      const res = await fetch(
        `https://api.redclass.redberryinternship.ge/api/courses/${id}`,
      );
      const result: CourseApiResponse = await res.json();
      setCourse(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCourse();
  }, []);
  if (!course) return <div>loading...</div>;
  return (
    <section className={`${styles.courseContainer} ${layout.container}`}>
      <div className={styles.courseDetails}>
        <h2>{course.title}</h2>
        <img className={styles.image} src={course.image} alt={course.title} />
        <div className={styles.duration}>
          <div className={styles.calendar}>
            <img src="/icons/calendar.svg" alt="calendar" />
            <span>{course.durationWeeks} Weeks</span>
          </div>
          <div className={styles.courseRating}>
            <Star
              rate={Number(
                (course.reviews.length > 0
                  ? course.reviews.reduce(
                      (total, star) => total + star.rating,
                      0,
                    ) / course.reviews.length
                  : 0
                ).toFixed(1),
              )}
            />
            <div className={styles.courseName}>
              {icon && <CourseIcons icon={icon} />}
              <span>{course.category.name}</span>
            </div>
          </div>
        </div>
        <div className={styles.mentor}>
          <img src={course.instructor.avatar} alt={course.instructor.name} />
          <span>{course.instructor.name}</span>
        </div>
        <div className={styles.courseDescription}>
          <h3>Course Description</h3>
          <p>{course.description}</p>
        </div>
      </div>
      <SessionType id={id as string} basePrice={course.basePrice} />
    </section>
  );
}

export default page;
