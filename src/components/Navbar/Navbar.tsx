"use client";
import React, { useEffect, useState } from "react";
import layout from "@/app/layout.module.scss";
import Logo from "../Icons/Logo/Logo";
import Image from "next/image";
import styles from "./Navbar.module.scss";
import User from "../Icons/User/User";
import { auth } from "@/utils/auth";
import Button from "../Buttons/Button/Button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { openModal } from "@/lib/slices/modalSlice";
import { useRouter } from "next/navigation";
import EnrolledCoursesModal from "../CoursesContent/EnrolledCoursesModal/EnrolledCoursesModal";
import Book from "../Icons/Book";
import Stars from "../Icons/Stars";

function Navbar() {
  auth();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userData = useAppSelector((state) => state.user);
  const enrolled = useAppSelector((modal) => modal.modal.activeModal);
  const loggedIn = !!userData;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const NAV_LIST = [
    { title: "browse courses", action: "/courses" },
    {
      title: "enrolled courses",
      modal: "enrolledCourses",
    },
  ];
  const visibleNavItems = loggedIn
    ? NAV_LIST
    : NAV_LIST.filter((item) => item.title === "browse courses");

  function handleNavClick(item: { action?: string; modal?: string }) {
    if (item.modal) {
      dispatch(openModal("enrolled"));
    } else if (item.action) {
      router.push(item.action);
    }
  }

  return (
    <>
      <header className={`${styles.header} ${layout.container}`}>
        <h1 className={styles.visuallyHidden}>Redberry</h1>
        <Logo width="60px" height="60px" iconWidth="29px" />
        <div
          className={styles.navList}
          style={
            loggedIn
              ? { gap: "38px", maxWidth: "547px", width: "100%" }
              : { gap: "0px", maxWidth: "496px", width: "100%" }
          }
        >
          {visibleNavItems.map((list, index) => (
            <div
              key={list.title}
              className={styles.list}
              style={loggedIn ? { maxWidth: "100%" } : { maxWidth: "240px" }}
              onClick={() => handleNavClick(list)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {list.title === "browse courses" ? (
                <Stars hovered={hoveredIndex === index} />
              ) : (
                <Book hovered={hoveredIndex === index} />
              )}
              <p>{list.title}</p>
            </div>
          ))}
          {loggedIn ? (
            <User
              src={userData.avatar ?? ""}
              profileComplete={userData?.profileComplete ?? null}
            />
          ) : (
            <div className={styles.authBtnWrapper}>
              <Button
                title="log in"
                margin="0px"
                height="60px"
                width="114px"
                color="#4F46E5"
                backgroundColor="transparent"
                borderColor="2px solid #958FEF"
                onClick={() => dispatch(openModal("login"))}
              />
              <Button
                title="sign up"
                margin="0px"
                height="60px"
                width="125px"
                onClick={() => dispatch(openModal("register"))}
              />
            </div>
          )}
        </div>
      </header>
      <hr className={styles.hr} />
      {enrolled === "enrolled" && <EnrolledCoursesModal />}
    </>
  );
}

export default Navbar;
