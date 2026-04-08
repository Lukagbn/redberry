import React, { useEffect, useState } from "react";
import styles from "./SessionType.module.scss";
import Image from "next/image";
import SessionTitle from "./SessionTitle/SessionTitle";
import TimeSlots from "./TimeSlots/TimeSlots";
import Sessions from "./Sessions/Sessions";

interface WeeklyApiResponse {
  data: WeeklySchedule[];
}

interface WeeklySchedule {
  id: 1;
  label: string;
  days: string[];
}

function SessionType({ id, basePrice }: { id: string; basePrice: string }) {
  const [schedule, setSchedule] = useState<WeeklySchedule[] | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [sessionPrice, setSessionPrice] = useState<string | "">("");
  const [clicked, setClicked] = useState<number | null>(null);
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

  useEffect(() => {
    fetchWeeklySchedule();
    if (!selectedSlot) return;
  }, [clicked, selectedSlot, sessionPrice]);
  return (
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
        onSelectPrice={(price) => {
          setSessionPrice(price);
        }}
      />
      <div className={styles.totalPrice}>
        <div className={styles.total}>
          <p>Total Price</p>
          <span>${basePrice}</span>
        </div>
        <div className={styles.priceBox}>
          <p>Base Price</p>
          <span>${basePrice}</span>
        </div>
        <div className={styles.priceBox}>
          <p>Session Type</p>
          <span>{sessionPrice}</span>
        </div>
        <button className={styles.enrollNow}>Enroll Now</button>
      </div>
    </section>
  );
}

export default SessionType;
