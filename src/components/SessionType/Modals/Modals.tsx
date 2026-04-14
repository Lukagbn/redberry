import React, { useEffect, useState } from "react";
import styles from "./Modals.module.scss";
import { useAppDispatch } from "@/lib/hooks";
import { openModal } from "@/lib/slices/modalSlice";
import { EnrolledCourse } from "../SessionType";
import StarRate from "@/components/Icons/StarRate";

export type ModalType =
  | "completeProfile"
  | "success"
  | "enrolled"
  | "warning"
  | "none";

function Modals({
  type,
  courseTitle,
  onClose,
  conflictCourse,
  onSendData,
  courseId,
}: {
  type: ModalType;
  courseTitle?: string;
  onClose: () => void;
  conflictCourse?: EnrolledCourse | null;
  onSendData: (data: boolean) => void;
  courseId: number;
}) {
  const dispatch = useAppDispatch();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const sendMessage = () => {
    onSendData(true);
  };
  async function handleRate(rating: number, courseId: number) {
    const token = localStorage.getItem("token");
    try {
      await fetch(
        `https://api.redclass.redberryinternship.ge/api/courses/${courseId}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ rating }),
        },
      );
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (type !== "none") {
      document.documentElement.classList.add("noScroll");
    } else {
      document.documentElement.classList.remove("noScroll");
    }
    return () => {
      document.documentElement.classList.remove("noScroll");
    };
  }, [type]);
  if (type === "none") return null;
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {type === "completeProfile" && (
          <div className={styles.wrapper}>
            <img
              className={styles.profile}
              src="/icons/user.svg"
              alt="profile"
            />
            <h2>Complete your profile to continue</h2>
            <p>
              You need to complete your profile before enrolling in this course.
            </p>
            <div className={styles.btnContainer}>
              <button
                className={styles.complete}
                onClick={() => {
                  dispatch(openModal("profile"));
                  onClose();
                }}
              >
                complete profile
              </button>
              <button className={styles.close} onClick={onClose}>
                close
              </button>
            </div>
          </div>
        )}
        {type === "success" && (
          <div className={styles.wrapper}>
            <img
              className={styles.profile}
              src="/icons/success.svg"
              alt="success"
            />
            <h2>Congratulations!</h2>
            <p>
              You've completed “
              <span className={styles.title}>{courseTitle}</span>” Course!
            </p>
            <div>
              <div className={styles.starRating}>
                <p>Rate your experience</p>
                <div className={styles.starWrapper}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarRate
                      key={i}
                      hovered={
                        hoveredIndex !== null
                          ? i <= hoveredIndex
                          : selectedIndex !== null && i <= selectedIndex
                      }
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => {
                        setSelectedIndex(i);
                        handleRate(i + 1, courseId);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <button className={styles.done} onClick={onClose}>
              Done
            </button>
          </div>
        )}
        {type === "enrolled" && (
          <div className={styles.wrapper}>
            <img
              className={styles.profile}
              src="/icons/enrolled.svg"
              alt="success"
            />
            <h2>Enrollment Confirmed!</h2>
            <p>
              You've successfully enrolled to the “
              <span className={styles.title}>{courseTitle}</span>” Course!
            </p>
            <button className={styles.done} onClick={onClose}>
              Done
            </button>
          </div>
        )}
        {type === "warning" && (
          <div className={styles.wrapper}>
            <img
              className={styles.profile}
              src="/icons/important.svg"
              alt="warning"
            />
            <h2>Schedule Conflict</h2>
            <p>
              You are already enrolled in “
              <span className={styles.title}>
                {conflictCourse?.course.title}
              </span>
              ” with the same schedule:{" "}
              {conflictCourse?.schedule.weeklySchedule.label}{" "}
              {conflictCourse?.schedule.timeSlot.label}
            </p>
            <div className={styles.warningBtnWrapper}>
              <button className={styles.continue} onClick={sendMessage}>
                Continue Anyway
              </button>
              <button className={styles.close} onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modals;
