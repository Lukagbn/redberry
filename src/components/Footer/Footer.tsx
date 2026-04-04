import React from "react";
import styles from "./Footer.module.scss";
import layout from "@/app/layout.module.scss";
import Logo from "../Icons/Logo/Logo";
import Image from "next/image";

type List = {
  title: string;
  img?: string;
};
type FooterNav = "Explore" | "Account" | "Contact";

function Footer() {
  const FOOTER_ICONS = [
    { img: "/icons/facebook.svg" },
    { img: "/icons/twitter.svg" },
    { img: "/icons/instagram.svg" },
    { img: "/icons/linkedin.svg" },
    { img: "/icons/youtube.svg" },
  ];
  const FOOTER_NAV: Record<FooterNav, List[]> = {
    Explore: [{ title: "Enrolled Courses" }, { title: "Browse Courses" }],
    Account: [{ title: "My Profile" }],
    Contact: [
      { title: "contact@company.com", img: "/icons/email.svg" },
      { title: "(+995) 555 111 222", img: "/icons/phone.svg" },
      { title: "Aghmashenebeli St.115", img: "/icons/mark.svg" },
    ],
  };
  return (
    <>
      <hr className={styles.hr} />
      <footer className={`${styles.footer} ${layout.container}`}>
        <div className={styles.footerWrapper}>
          <div className={styles.bootcamp}>
            <div className={styles.logoWrapper}>
              <Logo
                width="45px"
                height="45px"
                iconWidth="18.40px"
                borderRadius={"10px"}
              />
              <h3>Bootcamp</h3>
            </div>
            <p>
              Your learning journey starts here! Browse courses to get started.
            </p>
            <div className={styles.iconWrapper}>
              {FOOTER_ICONS.map((icon, index) => (
                <img
                  key={index}
                  src={icon.img}
                  // width={19}
                  // height={19}
                  alt="icon"
                />
              ))}
            </div>
          </div>
          <div className={styles.categories}>
            {Object.entries(FOOTER_NAV).map(([category, items]) => (
              <div className={styles.category} key={category}>
                <h4>{category}</h4>
                <ul className={styles[category as keyof typeof styles]}>
                  {items.map((list) => (
                    <li key={list.title}>
                      {list.img && <img src={list.img} alt="icons" />}
                      {list.title}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.rights}>
          <p>Copyright © 2026 Redberry International</p>
          <p>
            All Rights Reserved | <span>Terms and Conditions</span> |{" "}
            <span>Privacy Policy</span>
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
