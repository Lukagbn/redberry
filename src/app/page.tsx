"use client";
import Image from "next/image";
import styles from "./page.module.scss";
import Carousel from "@/components/Carousel/Carousel";
import StartLearning from "@/components/StartLearning/StartLearning";
import ContinueLearning from "@/components/ContinueLearning/ContinueLearning";
import { useAppSelector } from "@/lib/hooks";

export default function Home() {
  const userData = useAppSelector((state) => state.user);
  return (
    <section className={styles.section}>
      <Carousel />
      {userData && <ContinueLearning />}
      <StartLearning />
      {!userData && <ContinueLearning />}
    </section>
  );
}
