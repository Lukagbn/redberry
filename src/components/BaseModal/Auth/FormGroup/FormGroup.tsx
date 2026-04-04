"use client";
import React, { useState, ChangeEvent } from "react";
import styles from "./FormGroup.module.scss";

interface FormGroupProps {
  label: string;
  input: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

function FormGroup({ label, input, onChange }: FormGroupProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <div className={styles.formGroup}>
      <label htmlFor={label}>{label}</label>
      {input === "password" ? (
        <div className={styles.passwordWrapper}>
          <input
            type={!passwordVisible ? "password" : "text"}
            id={label}
            onChange={onChange}
          />
          <svg
            width="21"
            height="16"
            viewBox="0 0 21 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.visible}
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            <path
              d="M0.709402 7.99842C0.630232 7.77388 0.630232 7.52689 0.709402 7.30236C1.48048 5.33404 2.78934 3.65108 4.47004 2.46683C6.15075 1.28259 8.12762 0.650391 10.15 0.650391C12.1724 0.650391 14.1493 1.28259 15.83 2.46683C17.5107 3.65108 18.8196 5.33404 19.5906 7.30236C19.6698 7.52689 19.6698 7.77388 19.5906 7.99842C18.8196 9.96674 17.5107 11.6497 15.83 12.8339C14.1493 14.0182 12.1724 14.6504 10.15 14.6504C8.12762 14.6504 6.15075 14.0182 4.47004 12.8339C2.78934 11.6497 1.48048 9.96674 0.709402 7.99842Z"
              stroke="#8A8A8A"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.1501 10.6509C11.7241 10.6509 13 9.30766 13 7.65065C13 5.99365 11.7241 4.65039 10.1501 4.65039C8.57622 4.65039 7.30029 5.99365 7.30029 7.65065C7.30029 9.30766 8.57622 10.6509 10.1501 10.6509Z"
              stroke="#8A8A8A"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ) : (
        <input type={input} id={label} onChange={onChange} />
      )}
      <span className={styles.errorMessage}></span>
    </div>
  );
}

export default FormGroup;
