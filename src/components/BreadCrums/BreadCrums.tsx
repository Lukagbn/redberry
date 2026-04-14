"use client";
import Link from "next/link";
import React from "react";
import styles from "./BreadCrums.module.scss";
import ArrowRight from "../Icons/ArrowRight";
import { usePathname } from "next/navigation";
import layout from "@/app/layout.module.scss";

function BreadCrums({ id, category }: { id?: number; category?: string }) {
  const pathname = usePathname();
  function checkPath(pathname: string) {
    switch (pathname) {
      case `/courses/${id}`:
        return (
          <div className={styles.breadCrums}>
            <Link href={"/"}>Home</Link>
            <ArrowRight />
            <Link href={"/courses"}>Browse</Link>
            <ArrowRight />
            <Link className={styles.active} href={`/courses/${id}`}>
              {category}
            </Link>
          </div>
        );
      case `/courses`:
        return (
          <div className={styles.breadCrums}>
            <Link href={"/"}>Home</Link>
            <ArrowRight />
            <Link className={styles.active} href={"/courses"}>
              Browse
            </Link>
          </div>
        );
      default:
        return;
    }
  }
  return (
    <section className={`${styles.section} ${layout.container}`}>
      {checkPath(pathname)}
    </section>
  );
}

export default BreadCrums;
