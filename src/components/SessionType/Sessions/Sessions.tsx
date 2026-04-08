import React, { useEffect, useState } from "react";
import styles from "./Sessions.module.scss";

interface Sessions {
  availableSeats: number;
  courseScheduleId: number;
  id: number;
  location: string;
  name: string;
  priceModifier: string;
}
interface SessionApi {
  data: Sessions[];
}

const images: Record<string, string> = {
  online: "/icons/online.svg",
  hybrid: "/icons/hybrid.svg",
  in_person: "/icons/person.svg",
};

function getImage(name: string): string {
  const key = Object.keys(images).find((k) => name.toLowerCase().includes(k));
  return key ? images[key] : "#";
}

function Sessions({
  id,
  alreadyClicked,
  selectedSlot,
  onSelectPrice,
}: {
  id: string;
  alreadyClicked: number | null;
  selectedSlot: number | null;
  onSelectPrice: (price: string) => void;
}) {
  const [sessions, setSessions] = useState<Sessions[] | null>(null);
  const [clicked, setClicked] = useState<number | null>(null);
  async function fetchSessionType() {
    try {
      const res = await fetch(
        `https://api.redclass.redberryinternship.ge/api/courses/${id}/session-types?weekly_schedule_id=${alreadyClicked ?? null}&time_slot_id=${selectedSlot}`,
      );
      const result: SessionApi = await res.json();
      setSessions(result.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (!selectedSlot) return;
    fetchSessionType();
  }, [alreadyClicked, selectedSlot]);
  return (
    <div className={styles.cardContainer}>
      {sessions?.map((session) => {
        const price =
          session.priceModifier === "0.00"
            ? "Included"
            : "+ $" + session.priceModifier;
        const location = session.location ?? "Google Meet";
        const seats =
          session.availableSeats < 5
            ? `Only ${session.availableSeats} Seats Remaining`
            : `${session.availableSeats} Seats Available`;
        return (
          <div key={session.id} className={styles.card}>
            <div
              className={`
    ${styles.cardWrapper}
    ${session.availableSeats === 0 ? styles.cardWrapperBlocked : ""}
    ${clicked === session.id && session.availableSeats !== 0 ? styles.cardWrapperActive : ""}`}
              onClick={() => {
                if (session.availableSeats === 0) return;
                setClicked(session.id);
                onSelectPrice(
                  session.priceModifier === "0.00"
                    ? "Included"
                    : "+ $" + session.priceModifier,
                );
              }}
            >
              <img src={getImage(session.name)} alt={session.name} />
              <p className={styles.name}>{session.name}</p>
              <p className={styles.location}>{location}</p>
              <p className={styles.price}>{price}</p>
            </div>
            <span
              className={
                session.availableSeats === 0
                  ? `${styles.availableSeats} ${styles.availableSeatsBlocked}`
                  : `${styles.availableSeats}`
              }
            >
              {seats}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default Sessions;
