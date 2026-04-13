import React, { useEffect, useState } from "react";
import styles from "./SessionType.module.scss";
import Image from "next/image";
import SessionTitle from "./SessionTitle/SessionTitle";
import TimeSlots from "./TimeSlots/TimeSlots";
import Sessions from "./Sessions/Sessions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { openModal } from "@/lib/slices/modalSlice";
import Calendar from "../Icons/Calendar";
import SessionIcons from "../Icons/SessionIcons";
import Clock from "../Icons/Clock";
import Modals, { ModalType } from "./Modals/Modals";
import Marker from "../Icons/Marker";

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
export interface EnrolledCourse {
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
  const [conflictCourse, setConflictCourse] = useState<EnrolledCourse | null>(
    null,
  );
  const [continiue, setContiniue] = useState<boolean | false>(false);
  const allFieldsSelected =
    clicked !== null && selectedSlot !== null && courseScheduleId !== null;

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
  async function handleEnroll(isForced = false) {
    const token = localStorage.getItem("token");

    if (userData?.profileComplete === false) {
      setModalType("completeProfile");
      return;
    }
    if (!isForced) {
      const conflict = enrolledCourse?.find(
        (enrolled) => enrolled.schedule.timeSlot.id === selectedSlot,
      );

      if (conflict) {
        setModalType("warning");
        setConflictCourse(conflict ?? null);
        return;
      }
    }
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
            force: isForced,
          }),
        },
      );
      if (res.ok) {
        await fetchEnrolled();
        setModalType("enrolled");
      }
    } catch (error) {
      console.log(error);
    }
  }
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
      setEnrolledCourse(result.data);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
  async function finishCourse() {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch(
        `https://api.redclass.redberryinternship.ge/api/enrollments/${course?.id}/complete`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.ok) {
        await fetchEnrolled();
        setModalType("success");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function handleDelete() {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch(
        `https://api.redclass.redberryinternship.ge/api/enrollments/${course?.id}`,
        {
          method: "Delete",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.ok) {
        await fetchEnrolled();
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (!enrolledCourse) return;
    const foundCourse = enrolledCourse.find(
      (course) => course.course.id === Number(id),
    );
    if (
      enrolledCourse?.filter(
        (schedule) => schedule.schedule.timeSlot === course?.schedule.timeSlot,
      )
    ) {
      console.log("error");
    }
    setCourse(foundCourse ?? null);
  }, [id, enrolledCourse]);
  useEffect(() => {
    fetchWeeklySchedule();
    fetchEnrolled();
  }, []);

  useEffect(() => {
    if (clicked) fetchWeeklySchedule();
  }, [clicked]);
  useEffect(() => {
    if (continiue === true) {
      handleEnroll(true);
      setContiniue(false);
    }
  }, [continiue]);
  if (!schedule) {
    return <div>loading...</div>;
  }
  return (
    <>
      <Modals
        type={modalType}
        onClose={() => setModalType("none")}
        courseTitle={course?.course.title}
        conflictCourse={conflictCourse}
        onSendData={(data: boolean) => setContiniue(data)}
      />
      {course ? (
        <section className={styles.sessionTypeContainer}>
          <div className={styles.courseInfo}>
            {course?.progress === 100 ? (
              <span className={styles.completed}>Completed</span>
            ) : (
              <span className={styles.enrolled}>Enrolled</span>
            )}
            <div className={styles.infoBox}>
              <Calendar />
              <p>{course?.schedule.weeklySchedule.label}</p>
            </div>
            <div className={styles.infoBox}>
              <Clock />
              <p>{course?.schedule.timeSlot.label}</p>
            </div>
            <div className={styles.infoBox}>
              <SessionIcons session={course.schedule.sessionType.name} />
              <p>{course?.schedule.sessionType.name}</p>
            </div>
            {course?.schedule.sessionType.name !== "online" && (
              <div className={styles.infoBox}>
                <Marker />
                <p>{course?.schedule.location}</p>
              </div>
            )}
            <div className={styles.progressBarContainer}>
              <div className={styles.progressBarWrapper}>
                <p>{course?.progress}% complete</p>
                <div className={styles.progressBar}>
                  <span style={{ width: `${course?.progress}%` }}></span>
                </div>
              </div>
              {course?.progress !== 100 ? (
                <button onClick={finishCourse}>
                  Complete Course <img src="/icons/marker.svg" alt="marker" />
                </button>
              ) : (
                <button onClick={handleDelete}>
                  retake course <img src="/icons/retake.svg" alt="retake" />
                </button>
              )}
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
                !allFieldsSelected
                  ? `${styles.enrollNow} ${styles.enrollNowDisabled}`
                  : `${styles.enrollNow}`
              }
              disabled={!!userData && !allFieldsSelected}
              onClick={() => {
                if (!userData) {
                  dispatch(openModal("login"));
                  return;
                }
                handleEnroll();
              }}
            >
              Enroll Now
            </button>
          </div>
          {!userData && (
            <div className={styles.warning}>
              <div className={styles.message}>
                <div className={styles.title}>
                  <img src={"/icons/important.svg"} />
                  <span>Authentication Required</span>
                </div>
                <p>
                  You need sign in to your profile before enrolling in this
                  course.
                </p>
              </div>
              <button onClick={() => dispatch(openModal("login"))}>
                Sign Up <img src="/icons/right.svg" alt="arrow" />
              </button>
            </div>
          )}
          {userData?.profileComplete === false && (
            <div className={styles.warning}>
              <div className={styles.message}>
                <div className={styles.title}>
                  <img src={"/icons/important.svg"} />
                  <span>Complete Your Profile</span>
                </div>
                <p>
                  You need to fill in your profile details before enrolling in
                  this course.
                </p>
              </div>
              <button
                onClick={() => dispatch(openModal("profile"))}
                style={{ maxWidth: "110px" }}
              >
                Complete <img src="/icons/right.svg" alt="arrow" />
              </button>
            </div>
          )}
        </section>
      )}
    </>
  );
}

export default SessionType;
