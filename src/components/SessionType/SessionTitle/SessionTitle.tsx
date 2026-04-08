import React from "react";
import styles from "./SessionTitle.module.scss";

function SessionTitle({
  number,
  title,
  margin,
}: {
  number: string;
  title: string;
  margin?: string;
}) {
  return (
    <div className={styles.sessionTitle} style={{ marginTop: margin }}>
      <div className={styles.titleWrapper}>
        <div className={styles.titleNumber}>
          <span>{number}</span>
        </div>
        <h4>{title}</h4>
      </div>
      <img src={"/icons/arrowDown.svg"} alt="arrow down" />
    </div>
  );
}

export default SessionTitle;
