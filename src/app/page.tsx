import Image from "next/image";
import styles from "./page.module.css";
import Carousel from "@/components/Carousel/Carousel";

// https://api.redclass.redberryinternship.ge/api/courses/featured

export default function Home() {
  return (
    <div>
      <Carousel />
    </div>
  );
}
