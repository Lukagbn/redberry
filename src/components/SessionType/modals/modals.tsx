import React from "react";
import styles from "./modals.module.scss";
import { useAppDispatch } from "@/lib/hooks";
import { openModal } from "@/lib/slices/modalSlice";

export type ModalType = "completeProfile" | "success" | "none";

function Modals({ type, onClose }: { type: ModalType; onClose: () => void }) {
  const dispatch = useAppDispatch();
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
              You've completed “Advanced React & TypeScript Development” Course!
            </p>
            <button className={styles.done} onClick={onClose}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modals;
