import React, { useEffect, useState } from "react";
import styles from "./SessionType.module.scss";
import Image from "next/image";
import SessionTitle from "./SessionTitle/SessionTitle";
import TimeSlots from "./TimeSlots/TimeSlots";
import Sessions from "./Sessions/Sessions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ModalType } from "./modals/modals";
import Modals from "./modals/modals";
import { openModal } from "@/lib/slices/modalSlice";

interface WeeklyApiResponse {
  data: WeeklySchedule[];
}

interface WeeklySchedule {
  id: 1;
  label: string;
  days: string[];
}

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

const sessionIcons: Record<string, string> = {
  online: "/icons/online.svg",
  offline: "/icons/calendar.svg",
  hybrid: "/icons/hybrid.svg",
};

function SessionType({ id, basePrice }: { id: string; basePrice: string }) {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user);
  const [schedule, setSchedule] = useState<WeeklySchedule[] | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [sessionPrice, setSessionPrice] = useState<string | "">("");
  const [courseScheduleId, setCourseScheduleId] = useState<number | null>(null);
  const [clicked, setClicked] = useState<number | null>(null);
  const [modalType, setModalType] = useState<ModalType>("none");
  const [enrolledCourse, setEnrolledCourse] = useState<EnrolledCourse[] | null>(
    null,
  );
  const [course, setCourse] = useState<EnrolledCourse | null>(null);
  const sessionName = course?.schedule.sessionType.name?.toLowerCase();

  async function fetchWeeklySchedule() {
    try {
      const res = await fetch(
        `https://api.redclass.redberryinternship.ge/api/courses/${id}/weekly-schedules`,
      );
      const result: WeeklyApiResponse = await res.json();
      setSchedule(result.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleEnroll() {
    const token = localStorage.getItem("token");
    if (userData?.profileComplete === false) {
      setModalType("completeProfile");
      return;
    } else {
      try {
        const res = await fetch(
          "https://api.redclass.redberryinternship.ge/api/enrollments",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              courseId: Number(id),
              courseScheduleId: courseScheduleId,
              force: true,
            }),
          },
        );
        setModalType("success");
      } catch (error) {
        console.log(error);
      }
    }
  }
  async function fetchEnrolled() {
    const token = localStorage.getItem("token");
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
      setEnrolledCourse(result.data);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchWeeklySchedule();
    fetchEnrolled();
    if (!selectedSlot) return;
  }, [clicked, selectedSlot, sessionPrice, enrolledCourse]);
  useEffect(() => {
    if (enrolledCourse) {
      const foundCourse = enrolledCourse.find(
        (course) => course.course.id === Number(id),
      );
      setCourse(foundCourse ?? null);
    }
  }, [id, enrolledCourse]);
  return (
    <>
      <Modals type={modalType} onClose={() => setModalType("none")} />
      {course ? (
        <section className={styles.sessionTypeContainer}>
          <div className={styles.courseInfo}>
            {course?.progress === 100 ? (
              <span className={styles.completed}>Completed</span>
            ) : (
              <span className={styles.enrolled}>Enrolled</span>
            )}
            <div className={styles.infoBox}>
              <img src="/icons/calendar.svg" alt="calendar" />
              <p>{course?.schedule.weeklySchedule.label}</p>
            </div>
            <div className={styles.infoBox}>
              <img src="/icons/clock.svg" alt="clock" />
              <p>{course?.schedule.timeSlot.label}</p>
            </div>
            <div className={styles.infoBox}>
              <img
                src={
                  (course?.schedule.sessionType.name &&
                    sessionIcons[
                      course?.schedule.sessionType.name?.toLowerCase()
                    ]) ||
                  "/icons/calendar.svg"
                }
                alt="session"
              />
              <p>{course?.schedule.sessionType.name}</p>
            </div>
            <div className={styles.infoBox}>
              <img src="/icons/location.svg" alt="location" />
              <p>{course?.schedule.location}</p>
            </div>
            <div className={styles.progressBarContainer}>
              <div className={styles.progressBarWrapper}>
                <p>{course?.progress}% complete</p>
                <div className={styles.progressBar}>
                  <span style={{ width: `${course?.progress}%` }}></span>
                </div>
              </div>
              <button onClick={() => console.log(course)}>
                Complete Course
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className={styles.sessionTypeContainer}>
          <SessionTitle title="Select Weekly Schedule" number="1" />
          <div className={styles.sessionCardContainer}>
            {schedule?.map((schedule) => {
              const weekend = schedule.label === "Weekend Only";
              return (
                <div
                  className={
                    clicked === schedule.id
                      ? `${styles.sessionCard} ${styles.sessionCardActive}`
                      : `${styles.sessionCard}`
                  }
                  key={schedule.id}
                  onClick={() => {
                    setClicked(schedule.id);
                  }}
                >
                  <h5>
                    {weekend
                      ? schedule.label.slice(0, 7)
                      : schedule.days
                          .map(
                            (day) =>
                              day.slice(0, 3).charAt(0).toUpperCase() +
                              day.slice(0, 3).slice(1).toLowerCase(),
                          )
                          .join(" - ")}
                  </h5>
                </div>
              );
            })}
          </div>
          <SessionTitle title="Time Slots" number="2" margin="32px" />
          <TimeSlots
            id={id as string}
            alreadyClicked={clicked ?? null}
            onSlotClick={(slotId) => setSelectedSlot(slotId)}
          />
          <SessionTitle title="Session Type" number="3" margin="32px" />
          <Sessions
            id={id as string}
            alreadyClicked={clicked ?? null}
            selectedSlot={selectedSlot ?? null}
            onSelectPrice={(price, scheduleId) => {
              setSessionPrice(price);
              setCourseScheduleId(scheduleId);
            }}
          />
          <div className={styles.totalPrice}>
            <div className={styles.total}>
              <p>Total Price</p>
              <span>
                $
                {!Number(sessionPrice)
                  ? Number(basePrice)
                  : Number(sessionPrice) + Number(basePrice)}
              </span>
            </div>
            <div className={styles.priceBox}>
              <p>Base Price</p>
              <span>${basePrice}</span>
            </div>
            <div className={styles.priceBox}>
              <p>Session Type</p>
              <span>+ ${sessionPrice}</span>
            </div>
            <button
              className={
                !userData
                  ? `${styles.enrollNow} ${styles.enrollNowDisabled}`
                  : `${styles.enrollNow}`
              }
              onClick={() => {
                if (!userData) {
                  dispatch(openModal("login"));
                }
                handleEnroll();
              }}
            >
              Enroll Now
            </button>
          </div>
        </section>
      )}
    </>
  );
}

export default SessionType;
