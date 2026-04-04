import React from "react";
import layout from "@/app/layout.module.scss";
import Logo from "../Icons/Logo/Logo";
import Image from "next/image";
import styles from "./Navbar.module.scss";
import User from "../Icons/User/User";

function Navbar() {
  const NAV_LIST = [
    { img: "/icons/stars.svg", title: "browse courses" },
    { img: "/icons/book.svg", title: "enrolled courses" },
  ];
  return (
    <>
      <header className={`${styles.header} ${layout.container}`}>
        <h1 className={styles.visuallyHidden}>Redberry</h1>
        <Logo width="60px" height="60px" iconWidth="29px" />
        <div className={styles.navList}>
          {NAV_LIST.map((list) => (
            <div key={list.title} className={styles.list}>
              <Image width={26} height={26} alt={list.title} src={list.img} />
              <p>{list.title}</p>
            </div>
          ))}
          <User />
        </div>
      </header>
      <hr className={styles.hr} />
    </>
  );
}

export default Navbar;
