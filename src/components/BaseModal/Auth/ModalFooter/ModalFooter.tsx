import React from "react";
import styles from "./ModalFooter.module.scss";
import Link from "next/link";

function ModalFooter({
  text,
  href,
  linkText,
  onClick,
}: {
  text: string;
  href: string;
  linkText: string;
  onClick: () => void;
}) {
  return (
    <>
      <div className={styles.referance}>
        <span className={styles.or}>or</span>
      </div>
      <div className={styles.redirect}>
        <span>
          {text}{" "}
          <Link href={href} onClick={onClick}>
            {linkText}
          </Link>
        </span>
      </div>
    </>
  );
}

export default ModalFooter;
