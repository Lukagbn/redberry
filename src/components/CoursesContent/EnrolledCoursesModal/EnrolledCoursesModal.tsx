"use client";
import React, { useEffect, useState } from "react";
import styles from "./EnrolledCoursesModal.module.scss";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { closeModal } from "@/lib/slices/modalSlice";
import Star from "@/components/Star/Star";
import Link from "next/link";
import Clock from "@/components/Icons/Clock";
import Calendar from "@/components/Icons/Calendar";
import Marker from "@/components/Icons/Marker";
import InPerson from "@/components/Icons/InPerson";
import Hybrid from "@/components/Icons/Hybrid";
import Online from "@/components/Icons/Online";
import { useRouter } from "next/navigation";

interface EnrolledCourseApi {
  data: EnrolledCourse[];
}
interface EnrolledCourse {
  id: number;
  quantity: number;
  totalPrice: number;
  progress: number;
  completedAt: string;
  course: {
    id: number;
    title: string;
    description: string;
    image: string;
    basePrice: number;
    durationWeeks: number;
    isFeatured: boolean;
    avgRating: number;
    reviewCount: number;
    category: {
      id: number;
      name: string;
      icon: string;
    };
    topic: {
      id: number;
      name: string;
      categoryId: number;
    };
    instructor: {
      id: number;
      name: string;
      avatar: string;
    };
  };
  schedule: {
    weeklySchedule: {
      id: number;
      label: string;
      days: string[];
    };
    timeSlot: {
      id: number;
      label: string;
      startTime: string;
      endTime: string;
    };
    sessionType: {
      id: number;
      courseScheduleId: number;
      name: string;
      priceModifier: number;
      availableSeats: number;
      location: string;
    };
    location: string;
  };
}

function EnrolledCoursesModal() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [enrolled, setEnrolled] = useState<EnrolledCourse[] | null>(null);
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
      setEnrolled(result.data);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
  function checkSession(session: string) {
    switch (session.toLocaleLowerCase()) {
      case "in_person":
        return <InPerson className={styles.svg} />;
      case "hybrid":
        return <Hybrid className={styles.svg} />;
      case "online":
        return <Online className={styles.svg} />;
      default:
        return <Online className={styles.svg} />;
    }
  }
  useEffect(() => {
    fetchEnrolled();
  }, []);
  useEffect(() => {
    document.documentElement.classList.add("noScroll");
    return () => {
      document.documentElement.classList.remove("noScroll");
    };
  }, []);
  return (
    <div className={styles.overlay} onClick={() => dispatch(closeModal())}>
      <dialog
        className={styles.dialog}
        onClick={(e) => e.stopPropagation()}
        open
      >
        <div className={styles.enrolledTitle}>
          <h3>Enrolled Courses</h3>
          <p>
            Total Enrollments <span>{enrolled?.length}</span>
          </p>
        </div>
        <div className={styles.cardsWrapper}>
          {enrolled?.map((course) => {
            return (
              <div
                className={styles.card}
                key={course.course.title}
                onClick={() => {
                  router.push(`/courses/${course.course.id}`);
                  dispatch(closeModal());
                }}
              >
                <div className={styles.cardInner}>
                  <img src={course.course.image} alt={course.course.title} />
                  <div className={styles.cardText}>
                    <div className={styles.rating}>
                      <p>
                        Instructor <span>{course.course.instructor.name}</span>
                      </p>
                      <Star rate={course.course.avgRating} />
                    </div>
                    <h4>{course.course.title}</h4>
                    <p>
                      <Calendar className={styles.svg} />
                      {course.schedule.weeklySchedule.label}
                    </p>
                    <p>
                      <Clock className={styles.svg} />
                      {course.schedule.timeSlot.label}
                    </p>
                    <p>
                      {checkSession(course.schedule.sessionType.name)}
                      {course.schedule.sessionType.name}
                    </p>
                    {course.schedule.location && (
                      <p>
                        <Marker className={styles.svg} />
                        {course.schedule.location}
                      </p>
                    )}
                  </div>
                </div>
                <div className={styles.cardFooter}>
                  <div className={styles.progressBarContainer}>
                    <div className={styles.progressBarWrapper}>
                      <p>{course?.progress}% complete</p>
                      <div className={styles.progressBar}>
                        <span style={{ width: `${course?.progress}%` }}></span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => router.push(`/courses/${course.course.id}`)}
                  >
                    View
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </dialog>
    </div>
  );
}

export default EnrolledCoursesModal;
