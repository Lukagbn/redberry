import React, { useEffect, useState } from "react";
import styles from "./TimeSlots.module.scss";
import DayTime from "@/components/Icons/DayTime";

export interface TimeSlot {
  endTime: string;
  id: number;
  label: string;
  startTime: string;
}
interface TimeSlotApiResponse {
  data: TimeSlot[];
}

function TimeSlots({
  id,
  alreadyClicked,
  onSlotClick,
}: {
  id: string;
  alreadyClicked: number | null;
  onSlotClick: (id: number) => void;
}) {
  const [clicked, setClicked] = useState<number | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[] | null>(null);
  async function fetchTimeSlots() {
    try {
      const res = await fetch(
        `https://api.redclass.redberryinternship.ge/api/courses/${id}/time-slots?weekly_schedule_id=${alreadyClicked ?? null}`,
      );
      const result: TimeSlotApiResponse = await res.json();
      setTimeSlots(result.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (!alreadyClicked) return;
    fetchTimeSlots();
  }, [alreadyClicked]);
  return (
    <div className={styles.timeSlotsContainer}>
      {timeSlots?.map((item) => {
        let fullTime = item.label.split(" ");
        let day = fullTime[0];
        let time = fullTime.slice(1, fullTime.length).join(" ");
        return (
          <div
            key={item.id}
            onClick={() => {
              setClicked(item.id);
              onSlotClick(item.id);
            }}
            className={
              clicked === item.id
                ? `${styles.slot} ${styles.slotActive}`
                : `${styles.slot}`
            }
          >
            <DayTime dayTime={item.label} />
            <div>
              <p className={styles.day}>{day}</p>
              <p className={styles.time}>{time}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TimeSlots;
