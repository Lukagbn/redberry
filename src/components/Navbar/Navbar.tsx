"use client";
import React, { useEffect, useState } from "react";
import layout from "@/app/layout.module.scss";
import Logo from "../Icons/Logo/Logo";
import Image from "next/image";
import styles from "./Navbar.module.scss";
import User from "../Icons/User/User";
import { checkUser } from "@/utils/auth";
import { usePathname } from "next/navigation";
import Button from "../Buttons/Button/Button";
import Login from "../BaseModal/Auth/Login/Login";
import Register from "../BaseModal/Auth/Register/Register";
import BaseModal from "../BaseModal/BaseModal";

function Navbar() {
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState<Boolean | false>(false);
  const [activeModal, setActiveModal] = useState<"login" | "register" | null>(
    null,
  );
  const NAV_LIST = [
    { img: "/icons/stars.svg", title: "browse courses" },
    { img: "/icons/book.svg", title: "enrolled courses" },
  ];
  const visibleNavItems = loggedIn
    ? NAV_LIST
    : NAV_LIST.filter((item) => item.title === "browse courses");
  useEffect(() => {
    const user = checkUser();
    setLoggedIn(user);
  }, [pathname]);
  // localStorage.setItem("user", "true");
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
          {visibleNavItems.map((list) => (
            <div
              key={list.title}
              className={styles.list}
              style={loggedIn ? { maxWidth: "100%" } : { maxWidth: "240px" }}
            >
              <Image
                width={26}
                height={26}
                alt={list.title}
                src={list.img}
                style={{ flexShrink: "0" }}
              />
              <p>{list.title}</p>
            </div>
          ))}
          {loggedIn ? (
            <User />
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
                onClick={() => setActiveModal("login")}
              />
              <Button
                title="sign up"
                margin="0px"
                height="60px"
                width="125px"
                onClick={() => setActiveModal("register")}
              />
            </div>
          )}
        </div>
      </header>
      <hr className={styles.hr} />
      {activeModal && (
        <BaseModal
          title={activeModal === "login" ? "welcome back" : "Create Account"}
          open={true}
          onClose={() => setActiveModal(null)}
          text={
            activeModal === "login"
              ? "Log in to continue your learning"
              : "Join and start learning today"
          }
        >
          {activeModal === "login" ? (
            <Login goToRegister={() => setActiveModal("register")} />
          ) : (
            <Register goToLogin={() => setActiveModal("login")} />
          )}
        </BaseModal>
      )}
    </>
  );
}

export default Navbar;
