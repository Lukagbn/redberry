import Image from "next/image";
import styles from "./page.module.css";
import Carousel from "@/components/Carousel/Carousel";
import StartLearning from "@/components/StartLearning/StartLearning";

export default function Home() {
  return (
    <div>
      <Carousel />
      <StartLearning />
    </div>
  );
}
